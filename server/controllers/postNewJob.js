const { mysql } = require('../qcloud')
const util = require('../utils/util.js')

module.exports = async ctx => {
  // get from param
  let {user_id, title, desc, mt_id, goal, level} = ctx.request.body

  // init set
  let job_id
  let start_time = Date.now()
  var findlast = await mysql("job_list").where({id: mysql("job_list").max('id')}).first()
  if (!findlast) {
    job_id = 0
  } else {
    job_id = findlast.job_id + 1
  }

  // prepare sql obj
  var mtInfo = {
    user_id: user_id,
    mt_id: mt_id,
    job_id: job_id,
    title: title,
    desc: desc,
    goal: goal,
    level: level,
    start_time: start_time,
    end_time: '',
    grade: 0,
    problem: '',
    evaluate: '',
  }
  let res = await mysql("job_list").insert(mtInfo)

  // reward

  let nowPastinuteToday = ((Date.now() - 1514736000000) % (1000 * 60 * 60 * 24)) / (1000 * 60)

  let perReward = 1
  let reward = {}
  reward.gold = Math.floor(perReward * (24 * 60 - nowPastinuteToday))

 // update userInfo
 let userIdSql = {
  user_id: user_id
}

 var userInfo = await mysql("user_info").where( userIdSql ).first()
 let updateUserInfo = {
   gold: userInfo.gold + reward.gold,
 }
 await mysql("user_info").where( userIdSql ).first().update( updateUserInfo )
  ctx.state.data = reward
}