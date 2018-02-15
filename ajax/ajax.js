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


const getMileToneList = () => {
  util.showBusy('请求中...')
  return new Promise((reslove, reject) => {
    // 拉取数据
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/getMileToneList`,
      login: false,
      success (result) {
        util.showSuccess('请求成功完成')
        reslove(result.data.data)
      },
      fail (error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
        reject (false)
      }
    })
  })
}

const postMileTone = () => {
  util.showBusy('请求中...')
  return new Promise((reslove, reject) => {
    // 拉取数据
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/postNewMileTone`,
      login: false,
      success (result) {
        util.showSuccess('请求成功完成')
        reslove(result.data.data)
      },
      fail (error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
        reject (false)
      }
    })
  })
}

const getJobList = () => {
  util.showBusy('请求中...')
  return new Promise((reslove, reject) => {
    // 拉取数据
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/getJobList`,
      login: false,
      success (result) {
        util.showSuccess('请求成功完成')
        reslove(result.data.data)
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
      util.showBusy('请求中...')
      return new Promise((reslove, reject) => {
        // 拉取数据
        var that = this
        qcloud.request({
          url: `${config.service.host}/weapp/postNewJob`,
          login: false,
          success(result) {
            util.showSuccess('请求成功完成')
            reslove(result.data.data)
          },
          fail(error) {
            util.showModel('请求失败', error);
            console.log('request fail', error);
            reject(false)
          }
        })
      })
    })
}

const finishTodayJob = obj => {
  // 调用登录接口
  util.showBusy('请求中...')
  return new Promise((reslove, reject) => {
    // 拉取数据
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/postFinishJob`,
      login: false,
      success(result) {
        util.showSuccess('请求成功完成')
        reslove(result.data.data)
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
        reject(false)
      }
    })
  })
}


module.exports = { testCgi, postNewJob, finishTodayJob, getUserInfo, getMileToneList, postMileTone, getJobList }
