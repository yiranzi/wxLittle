var qcloud = require('./wafer2-client-sdk/index');
var util = require('../utils/util');
var config = require('../config')

const testCgi = () => {
  util.showBusy('请求中...')
  return new Promise((reslove, reject) => {
    // 拉取数据
    var that = this
    wx.request({
      url: `${config.service.host}/weapp/getStock`,
      data: {
        stock_id_list: ['159915']
      },
      method: 'post',
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

const getStockHistory = (stock_id_list) => {
  util.showBusy('请求中...')
  return new Promise((reslove, reject) => {
    // 拉取数据
    var that = this
    wx.request({
      url: `${config.service.host}/weapp/getStock`,
      data: {
        stock_id_list: stock_id_list
      },
      method: 'post',
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
      data: util.getUserId({}),
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

const newUserSign = () => {
  util.showBusy('请求中...')
  return new Promise((reslove, reject) => {
    // 拉取数据
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/newUserSign`,
      data: util.getUserId({name: getApp().globalData.userInfo.nickName}),
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
      data: util.getUserId({}),
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

const postMileTone = (data) => {
  util.showBusy('请求中...')
  return new Promise((reslove, reject) => {
    // 拉取数据
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/postNewMileTone`,
      method: 'POST',
      data: util.getUserId(data),
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
      data: util.getUserId({}),
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
    return new Promise((reslove, reject) => {
      util.showBusy('请求中...')
      // 拉取数据
      var that = this
      qcloud.request({
        url: `${config.service.host}/weapp/postNewJob`,
        method: 'POST',
        data: util.getUserId(obj),
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

const finishTodayJob = obj => {
  // 调用登录接口
  util.showBusy('请求中...')
  return new Promise((reslove, reject) => {
    // 拉取数据
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/postFinishJob`,
      method: 'POST',
      data: util.getUserId(obj),
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


module.exports = { testCgi, postNewJob, finishTodayJob, getUserInfo, getMileToneList, postMileTone, getJobList, newUserSign, getStockHistory }
