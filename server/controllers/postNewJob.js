const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // get from param
  const obj = {
    mt_id: 0,
    title: 'test123',
    desc: 'test desc123',
    goal: 'ggs ddu',
    level: 1,
  }
  const {mt_id, title, desc, goal, level} = obj

  // init set
  let job_id
  let start_time = '2012'
  var findlast = await mysql("job_list").where({id: mysql("job_list").max('id')}).first()
  if (!findlast) {
    job_id = 0
  } else {
    job_id = findlast.job_id + 1
  }

  // prepare sql obj
  var mtInfo = {
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