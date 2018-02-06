var qcloud = require('./wafer2-client-sdk/index');
var util = require('../utils/util');

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

const getUserInfo = (userId) => {
  return new Promise((reslove, reject) => {
    let userList = getApp().userData.userInfo
    if (userList.length > 0) {
      reslove (userList[0])
    } else {
      reject (false)
    }
    // let myUser = userList.find((user, index) => {
    //   return user.userId === userId
    // })
    // reslove(myUser)
  })
}

const finishTodayJob = obj => {
  // 调用登录接口
  return new Promise((reslove, reject) => {
    qcloud.login({
      success(result) {

      },
      fail(error) {
        let {mtId, jobId, myEvaluate, grade} = obj
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
        job.grade = grade
        job.endTime = Date.now()

        // 1 计算奖励值。
        let coastTime = job.endTime- job.startTime
        let kValue = (job.grade + 1) * job.level * (job.level / (coastTime/1000/60/60))
        let reward = Object.assign({}, getApp().originData.reward)
        reward.gold = kValue * reward.gold
        reward.exp = kValue * reward.exp
        let allEquipArr = getApp().randomData.equip.slice()
        let random = util.getRandomInt(0, allEquipArr.length)
        reward.equip = allEquipArr[random]
        res = {
          status: 200,
          result: reward,
        }
        reslove(res)
      }
    })
  })
}


module.exports = { postNewJob, finishTodayJob, getUserInfo }
