var qcloud = require('./wafer2-client-sdk/index');
var util = require('../utils/util');
var config = require('../config')

const testCgi = () => {
  util.showBusy('请求中...')
  return new Promise((reslove, reject) => {
    // 拉取数据
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/demo`,
      login: false,
      success (result) {
        util.showSuccess('请求成功完成')
        reslove(result)
      },
      fail (error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
        reject (false)
      }
    })
  })
}

const getUserInfo = () => {
  util.showBusy('请求中...')
  return new Promise((reslove, reject) => {
    // 拉取数据
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/userinfo`,
      login: false,
      success (result) {
        util.showSuccess('请求成功完成')
        reslove(result)
      },
      fail (error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
        reject (false)
      }
    })
  })
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
        console.log('calc')
        let coastTime = job.endTime- job.startTime
        // 简化模型
        // let kValue = (job.grade + 1) * job.level * (job.level / (coastTime/1000/60/60))
        let kValue = (job.grade + 1) * job.level * (job.level / 1)
        let reward = Object.assign({}, getApp().originData.reward)
        reward.gold = Math.round(kValue * reward.gold)
        reward.exp = Math.round(kValue * reward.exp)
        let allEquipArr = getApp().randomData.equip.slice()
        let random = util.getRandomInt(0, allEquipArr.length)
        reward.equip = allEquipArr[random]
        // 2 增加到角色身上
        let userInfo = getApp().userData.userInfo[0]
        userInfo.gold += reward.gold
        userInfo.exp += reward.exp
        // 增加里程碑收获
        mileToneNameArr.forEach((mt, index) => {
          if (mt.mtId === mtId) {
            mt.exp += reward.exp
            mt.equip.push(allEquipArr[random])
          }
        })
        res = {
          status: 200,
          result: reward,
        }

        reslove(reward)
      }
    })
  })
}


module.exports = { testCgi, postNewJob, finishTodayJob, getUserInfo }
