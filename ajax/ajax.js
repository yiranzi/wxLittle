var qcloud = require('./wafer2-client-sdk/index');
var util = require('../util/util');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const postNewJob = obj => {
    // 调用登录接口
    return new Promise((reslove, reject) => {
      qcloud.login({
        success(result) {

        },
        fail(error) {
          let {mtId, level, goal, title, desc} = obj
          let res
          let jobHistory = getApp().userData.jobHistory
          // 0 构造新的数据
          let jobId = jobHistory[jobHistory.length - 1].jobId + 1
          let job1 = Object.assign({}, getApp().originData.job);
          let job = Object.assign(job1, {
            mtId: mtId,
            jobId: jobId,
            title: title,
            desc: desc,
            goal: goal,
            level: level,
            startTime: Date.now()
          });
          // 1 往hisotry添加数据
          jobHistory.push(job)
          // 2 更新mileToneNameArr.推入新的
          let mt = getApp().userData.mileToneNameArr.find((mt ,index) => {
            return (mt.mtId === mtId)
          })
          if (mt) {
            res = {
              status: 200,
              result: true,
            }
            mt.todayJob.push(job)
          } else {
            res = {
              status: 200,
              result: false,
            }
          }
          reslove(res)
        }
      })
    })
}

const finishTodayJob = obj => {
  // 调用登录接口
  return new Promise((reslove, reject) => {
    qcloud.login({
      success(result) {

      },
      fail(error) {
        console.log('start')
        let {mtId, jobId, myEvaluate, score} = obj
        let res
        let mileToneNameArr = getApp().userData.mileToneNameArr
        // 删除掉没有的
        mileToneNameArr.forEach((mt, index) => {
          if (mt.mtId === mtId) {
            if (mt.todayJob.length > 0) {
              mt.todayJob = mt.todayJob.filter((job, index) => {
                return (job.jobId !== jobId)
              })
            }
          }
        })
        let jobHistory = getApp().userData.jobHistory

        let job = jobHistory.find((job, index) => {
          return (job.jobId === jobId)
        })
        // 0 构造新的数据
        job.evaluate = myEvaluate
        job.grade = score
        job.endTime = Date.now()
        res = {
          status: 200,
          result: true,
        }
        reslove(res)
      }
    })
  })
}


module.exports = { postNewJob, finishTodayJob }
