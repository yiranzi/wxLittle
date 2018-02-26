const { mysql } = require('../qcloud')
const util = require('../utils/util')
// const uuid = require('node-uuid')

module.exports = async ctx => {
  let userIdSql = {
    user_id: ctx.query['user_id']
  }
  var res = await mysql("user_info").where( userIdSql ).first()
  if (res) {
    let appUsedDay = util.getDateDiff(res.start_time)
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