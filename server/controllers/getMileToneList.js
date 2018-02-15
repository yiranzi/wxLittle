const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

// 返回这个用户的所有mt
module.exports = async ctx => {
  console.log('get mile tone list')
  let sql = {
    user_id: 1
  }
  let mileToneList = await mysql("mile_tones").where( sql )
  let listWithTodayJob
  if (mileToneList && mileToneList.length > 0) {
    listWithTodayJob = mileToneList.map(async (mt, index) => {
      let findSql = {
        mt_id: mt.mt_id
      }
      let jobList =  await mysql("job_list").where( findSql )
      console.log('get')
      let todayJobList = []
      if (jobList && jobList.length > 0) {
        todayJobList = jobList.filter((job, index) => {
          return (job.evaluate === '')
        })
      }
      mt.todayJob = todayJobList
      return mt
    })
    await Promise.all(listWithTodayJob).then((res) => {
      console.log('finish')
      console.log(res)
      ctx.state.data = res
    })
  } else {
    ctx.state.data = res
  }
  console.log('finish')
}


// module.exports = ctx => {
//   ctx.state.data = {
//     msg: 'Hello World'
//   }
// }