const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

module.exports = async ctx => {
  // var id = uuid.v1()
  // 增
  var userinfo = {
    name: 'baby',
    gold: 1000,
    exp: 100
  }
  let res = await mysql("userinfo").insert(userinfo)
  // 增
  // var book = {
  //   id: id,
  //   name: "冰与火之歌",
  //   price: 88
  // }
  // await mysql("Book").insert(book)
  // // 查
  // var res = await mysql("Book").where({ id }).first()
  // // 改
  // await mysql("Book").update({ price: 66 }).where({ id })
  // // 删
  // await mysql("Book").del().where({ id })

  ctx.state.data = "OK"
}


// module.exports = ctx => {
//   ctx.state.data = {
//     msg: 'Hello World'
//   }
// }