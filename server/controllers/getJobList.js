const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

// 返回这个用户的所有mt
module.exports = async ctx => {
  let userIdSql = {
    user_id: 1
  }
  var res = await mysql("job_list").where(userIdSql)
  if (!res) {
  }
  console.log(res)
  ctx.state.data = res
}


// module.exports = ctx => {
//   ctx.state.data = {
//     msg: 'Hello World'
//   }
// }