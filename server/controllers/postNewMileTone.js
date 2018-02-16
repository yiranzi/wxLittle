const { mysql } = require('../qcloud')
// const uuid = require('node-uuid')

module.exports = async ctx => {
  let {user_id, title, desc} = ctx.request.body

  let mt_id
  let start_time = Date.now()
  const origin_exp = 0
  var findlast = await mysql("mile_tones").where({id: mysql("mile_tones").max('id')}).first()
  if (!findlast) {
    mt_id = 0
  } else {
    mt_id = findlast.mt_id + 1
  }

  var mtInfo = {
    user_id: user_id,
    mt_id: mt_id,
    title: title,
    desc: desc,
    exp: origin_exp,
    start_time: start_time
  }
  let res = await mysql("mile_tones").insert(mtInfo)
  ctx.state.data = mtInfo
}


// module.exports = ctx => {
//   ctx.state.data = {
//     msg: 'Hello World'
//   }
// }