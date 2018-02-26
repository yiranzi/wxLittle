const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

module.exports = async ctx => {
  let userIdSql = {
    user_id: ctx.query['user_id']
  }
  var res = await mysql("user_info").where( userIdSql ).first()
  if (res) {
    ctx.state.data = false
  } else {
    var newUserInfo = {
      user_id: ctx.query['user_id'],
      name: ctx.query['name'],
      exp: 0,
      gold: 0,
      start_time: Date.now(),
    }
    await mysql("user_info").insert( newUserInfo )
    ctx.state.data = newUserInfo
  }
}


// module.exports = ctx => {
//   ctx.state.data = {
//     msg: 'Hello World'
//   }
// }