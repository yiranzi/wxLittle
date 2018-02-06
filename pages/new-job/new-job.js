// pages/new-job/new-job.js
var ajax = require('../../ajax/ajax');
var util = require('../../util/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mtId: 0,
    randomMissionArr: [],
    level: 0.5,
    currentSelect: 0,
    mileToneNameArr: [],
    currentMission: {},
    goal: '',
  },

  inputCbf: function (e) {
    if(e.currentTarget.dataset.type === 'level') {
      this.setData({
        level: Number(e.detail.value)
      })
    } else {
      this.setData({
        goal: e.detail.value
      })
    }
  },

  newJobButton: function () {
    let {level, goal, mtId} = this.data
    let {title, desc} = this.data.currentMission
    let obj = {
      level: level.toFixed(1),
      goal: goal,
      mtId: mtId,
      title: title,
      desc: desc,
    }
    // 发送请求。生成修改数据
    ajax.postNewJob(obj).then((res) => {
      util.showSuccess('新增当日任务完成！')
    })
  },


  selectChange: function (e) {
    this.setData({
      currentSelect: e.detail.currentSelect
    }, () => {this.getFromUserData(parseInt(this.data.mileToneNameArr[this.data.currentSelect].mtId))})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 设置level

    // 拉取随机数据
    let jobHistory = this.getFromRandomMission(this.data.level)

    // 拉取全部里程碑
    this.getFromUserData(parseInt(options.mtId))
  },

  /**
   * 自定义方法
   */
  getFromUserData: function (idParam) {
    // 获取全局数据
    var userData = getApp().userData

    // 获取对应的未知。
    let currentSelect = userData.mileToneNameArr.findIndex((ele, index) => {
      return (ele.mtId === idParam)
    })

    // 设置
    this.setData({
      mtId: idParam,
      mileToneNameArr: userData.mileToneNameArr,
      currentSelect: currentSelect
    })
  },

  getFromRandomMission: function (level) {
    let dataArr = getApp().userData.randomMission
    let data = dataArr.find((ele, index) => {
      return (ele.level === level)
    })
    // 获得一个随机数，并设置
    this.setData({
      randomMissionArr: data.missionList,
      currentMission: data.missionList[0]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})