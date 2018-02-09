const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

module.exports = async ctx => {
  let sql = {
    name: 'sun'
  }
  var res = await mysql("userinfo").where( sql ).first()
  ctx.state.data = res
}


// module.exports = ctx => {
//   ctx.state.data = {
//     msg: 'Hello World'
//   }
// }