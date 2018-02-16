const { mysql } = require('../qcloud')

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
  ctx.state.data = mtInfo
}