const { mysql } = require('../qcloud')
const util = require('../utils/util')
// const uuid = require('node-uuid')

module.exports = async ctx => {
  let userIdSql = {
    user_id: ctx.query['user_id']
  }
  var res = await mysql("user_info").where( userIdSql ).first()
  if (res) {
    // 当前的天数 - 开始的天数
    let appUsedDay = util.getDayDiff(res.start_time)
    res.appUsedDay = appUsedDay
    ctx.state.data = res
  } else {
    ctx.state.data = false
  }
}


// module.exports = ctx => {
//   ctx.state.data = {
//     msg: 'Hello World'
//   }
// }