const { mysql } = require('../qcloud')
const util = require('../utils/util.js')

module.exports = async ctx => {
  let {user_id, job_id, grade, evaluate, mt_id, realCostTime, type} = ctx.request.body

  // get the job info && update job list
  let findJob = {
    job_id: job_id
  }
  let userIdSql = {
    user_id: user_id
  }
  let findMileTone = {
    mt_id: mt_id
  }
  let mileTone = await mysql("mile_tones").where( findMileTone ).first()
  let job =  await mysql("job_list").where( findJob ).first()
  if (job.end_time === '') {
    if (type === 'finish') {
       // 如果还没有数据
      // 0 构造新的数据
      let updateJob = {
        level: realCostTime,
        evaluate: evaluate,
        grade: grade,
        end_time: Date.now()
      }
      await mysql("job_list").where( findJob ).first().update( updateJob )
      job =  await mysql("job_list").where( findJob ).first()
    } else {
      let reward = {}
      let updateJob = {}
      // 增加耗时
      reward.jobPastTime = util.getDayDiff(job.start_time)
      if (type === 'delay') {
        updateJob.problem = evaluate
        reward.gold = 50
      } else {
        // failed 取消任务
        updateJob.evaluate = evaluate
        updateJob.end_time = Date.now() 
        reward.gold = 50
      }
      // update job
      await mysql("job_list").where( findJob ).first().update( updateJob )

       // update mt
      let gold = mileTone.gold + reward.gold
      await mysql("mile_tones").where( findMileTone ).update( {gold: gold} )
  
      // update userInfo
      var userInfo = await mysql("user_info").where( userIdSql ).first()
      let updateUserInfo = {
        gold: userInfo.gold + reward.gold,
      }
      await mysql("user_info").where( userIdSql ).first().update( updateUserInfo )    
      
      // return reward
      ctx.state.data = reward
      return
    } 
  } else {
    ctx.state.data = false
    return
  }
  
  // 1 计算奖励值。
  const baseGold = 100
  const baseExp = 100
  // 使用天数来做deadline
  let jobPastTime = util.getDayDiff(job.start_time)
  let appUsedDay = await util.getUsedDay(userIdSql)
  let buffDay = mileTone.buff_day
  let buffDayUpdate = buffDay
  let lastJobDayUpdate = mileTone.last_day
  if (jobPastTime > 1) {
    // 2天和2天以上。未完成 不能获得对应的奖励。
    ctx.state.data = false
  } else {
    // LastJobDayToToday：距离上次的使用时间。
    let LastJobDayToToday = appUsedDay - mileTone.last_day
    if (LastJobDayToToday === 0) {
      // 当天
      buffDay = mileTone.buff_day - 1
      if (buffDay < 0) {
        buffDay = 0
      }       
    } else if (LastJobDayToToday === 1) {
      // 如果当前天数 - last_day天数 = 1 才是连续
      // 新的一天 才会有昨天的buff
      buffDay = mileTone.buff_day
        // 更新last_day max_last_Time 和buffday
      buffDayUpdate = mileTone.buff_day + 1
      lastJobDayUpdate =  appUsedDay // mileTone.last_day + 1
    } else if (LastJobDayToToday > 1) {
      // 48+
      // 重置和唤醒奖励（可添加）
      buffDay = 2
      buffDayUpdate = 1
      lastJobDayUpdate = appUsedDay
    }
    // 当前距离上次提交作业的间隔天数判定 = 
    // util.getDateDiff(job.start_time, job.end_time)
  }
   
  // 简化模型
  // let kValue = (job.grade + 1) * job.level * (job.level / (jobPastTime/1000/60/60))
  // 范围为 0.7到1.3
  let kValue = (1 - job.grade) * job.level / 3 + job.level
  let reward = {}
  reward.gold = Math.round(kValue * baseGold * (2 - jobPastTime) * (1 + buffDay) / 2 )
  reward.exp = job.level * baseExp
  
  // random equip
  let allEquipArr = await mysql("equip_info")
  console.log(allEquipArr)
  let random = util.getRandomInt(0, allEquipArr.length)
  console.log(random)
  reward.equip = allEquipArr[random]

  //  insert equip
  let getEquipInfo = {}
  getEquipInfo.equip_id = allEquipArr[random].id
  getEquipInfo.mt_id = mt_id
  await mysql("equip_list").insert(getEquipInfo)

  // update miletone exp equip gold
  
  let updateMileTone = {
    gold: mileTone.gold + reward.gold,
    exp: mileTone.exp + reward.exp,
    last_day: lastJobDayUpdate,
    buff_day: buffDayUpdate
  }
  await mysql("mile_tones").where( findMileTone ).update( updateMileTone )

  // update userInfo
  var userInfo = await mysql("user_info").where( userIdSql ).first()
  let updateUserInfo = {
    gold: userInfo.gold + reward.gold,
    exp: userInfo.exp + reward.exp,
  }
  await mysql("user_info").where( userIdSql ).first().update( updateUserInfo )

  // 增加耗时
  reward.jobPastTime = jobPastTime
  // return reward
  ctx.state.data = reward
}