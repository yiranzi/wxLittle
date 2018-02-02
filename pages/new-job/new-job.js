// pages/new-job/new-job.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mtId: 0,
    randomMissionArr: [],
    level: '0.5',
    currentMission: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.mtId)
    // 获取链接
    if (options) {
      this.setData({
        mtId: options.mtId
      })
    }
    // 设置level

    // 拉取数据
    let jobHistory = this.getFromRandomMission(this.data.level)
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
    console.log(data)
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