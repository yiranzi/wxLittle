const { mysql } = require('../qcloud')
const util = require('../utils/util')
// const uuid = require('node-uuid')

mtFunc = async ctx => {
  
}

module.exports = async ctx => {
  // 一般测试环境下才有效
  if (util.getEnv()) {
    let info = {
      name: '分院帽',
      desc: '一个年岁很高，话更多的帽子，哦，他是活的！',
      power: '开启《探险历史》功能',
      icon: '../../src/img/icon_1.png',
    }
    await mysql("equip_info").insert(info)
  }
  ctx.state.data = "OK"
  return
  const user_id = 1
  let mt_id
  let sql = {
    user_id: user_id
  }
  var findlast = await mysql("mile_tones").where({id: mysql("mile_tones").max('id')}).first()
  if (!findlast) {
    mt_id = 0
  } else {
    mt_id = findlast.mt_id + 1
  }

  var mtInfo = {
    user_id: user_id,
    mt_id: mt_id,
    title: '测试假title',
    desc: '测试假desc',
    exp: 999,
    start_time: '假start_time'
  }
  let res = await mysql("mile_tones").insert(mtInfo)
  ctx.state.data = "OK"

  
  
  // await mysql("Book").del().where({ id })

  
}

  // var id = uuid.v1()
  // 增
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


// module.exports = ctx => {
//   ctx.state.data = {
//     msg: 'Hello World'
//   }
// }