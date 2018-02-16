const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

// 返回这个用户的所有mt
module.exports = async ctx => {
  let userIdSql = {
    user_id: ctx.query['user_id']
  }
  let mileToneList = await mysql("mile_tones").where( userIdSql )
  let xlistWithTodayJob
  if (mileToneList && mileToneList.length > 0) {
    listWithTodayJob = mileToneList.map(async (mt, index) => {
      let findSql = {
        mt_id: mt.mt_id
      }
      // 设置今日
      let jobList =  await mysql("job_list").where( findSql )
      let todayJobList = []
      if (jobList && jobList.length > 0) {
        todayJobList = jobList.filter((job, index) => {
          return (job.evaluate === '')
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
      return mt
    })
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