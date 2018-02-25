const { mysql } = require('../qcloud')
const util = require('../utils/util')
// const uuid = require('node-uuid')

// 返回这个用户的所有mt
module.exports = async ctx => {
  let userIdSql = {
    user_id: ctx.query['user_id']
  }
  let mileToneList = await mysql("mile_tones").where( userIdSql )
  let xlistWithTodayJob
  if (mileToneList && mileToneList.length > 0) {
    let listWithTodayJob = []
    for(let index = 0; index< mileToneList.length; index++) {
      let mt = mileToneList[index]
        let findSql = {
          mt_id: mt.mt_id
        }
        // 设置今日
        let jobList =  await mysql("job_list").where( findSql )
        let todayJobList = []
        if (jobList && jobList.length > 0) {
          todayJobList = jobList.filter((job, index) => {
            if (job.evaluate === '') {
              // 任务持续时间 = 今天的时间 - 任务开始的时间
              job.doingTime = util.getDateDiff(job.start_time, Date.now())
              return true
            }          
          })
        }
        mt.todayJob = todayJobList
  
        // 设置战利品列表
        let findMtEquip = {
          mt_id: mt.mt_id
        }
        let equipList = await mysql("equip_list").where( findMtEquip )
        if (equipList && equipList.length > 0) {
          let equipInfo = await mysql("equip_info")
          let equipWithInfo = equipList.map((equip, index) => {
            // id 和 index下表
            return equipInfo[equip.equip_id - 1]
          })
          mt.equipList = equipWithInfo
        }
        // 设置时间
        let usedDay = await util.getUsedDay(userIdSql)
        // fromLastUsed：距离上次的使用时间 = 使用app天数 - 最后一次天数。
        let fromLastUsed = 0
        let buffDay = 0
        if (mt.last_day) {
          fromLastUsed = usedDay - mt.last_day
          // 计算buffday
          
          // 看看今天距离上次使用差几天
          // mt.
          if (fromLastUsed === 0) {
            // 当天
            buffDay = mt.last_day - 1
            if (buffDay < 0) {
              buffDay = 0
            }
          } else if (fromLastUsed === 1) {
            // 新的一天
            buffDay = mt.last_day
          } else if (fromLastUsed > 1){
              // 48+
            buffDay = 0
          }
        }
        mt.buffDay = buffDay
        listWithTodayJob.push(mt) 
    }
    await Promise.all(listWithTodayJob).then((res) => {
      ctx.state.data = res
    })
  } else {
    ctx.state.data = false
  }
}


// module.exports = ctx => {
//   ctx.state.data = {
//     msg: 'Hello World'
//   }
// }