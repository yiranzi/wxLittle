const { mysql } = require('../qcloud')
const util = require('../utils/util')
// const uuid = require('node-uuid')

// 返回这个用户的所有mt
module.exports = async ctx => {
  let userIdSql = {
    user_id: ctx.query['user_id']
  }
  // 获取
  var job_list = await mysql("job_list").where(userIdSql)
  var mile_tones = await mysql("mile_tones").where(userIdSql)
  
  if (job_list && job_list.length > 0) {
    job_list = job_list.map((job, index) => {
        let mileToneName = mile_tones.find((mileTone, index) => {
          return (mileTone.mt_id === job.mt_id)
        })
        // 设置标题
        job.mileToneName = mileToneName.title
        // 任务持续时间 = 今天的时间 - 任务开始的时间
         // 使用天数来做deadline
        job.jobPastTime = util.getDayDiff(util.getDateDiff(0, job.start_time), util.getDateDiff(0, Date.now()))
        return job
    })
  }
  ctx.state.data = job_list
}


// module.exports = ctx => {
//   ctx.state.data = {
//     msg: 'Hello World'
//   }
// }