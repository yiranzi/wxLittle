const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

module.exports = async ctx => {
  let userIdSql = {
    user_id: 1
  }
  var res = await mysql("user_info").where( userIdSql ).first()
  ctx.state.data = res
}


// module.exports = ctx => {
//   ctx.state.data = {
//     msg: 'Hello World'
//   }
// }