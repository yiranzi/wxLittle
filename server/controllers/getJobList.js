const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

// 返回这个用户的所有mt
module.exports = async ctx => {
  let sql = {
    user_id: 1
  }
  var res = await mysql("mile_tones").where( sql )
  if (!res) {
  }  
  ctx.state.data = res
}


// module.exports = ctx => {
//   ctx.state.data = {
//     msg: 'Hello World'
//   }
// }