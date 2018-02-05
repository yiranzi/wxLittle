// pages/view-today-job/view-today-job.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSelect: 0,
    jobArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取链接
    if (options) {
      this.setData({
        jobId: options.jobId
      })
    }
    // 拉取数据 并设置
    this.getFromJobHistory(parseInt(options.jobId))
  },

  getFromJobHistory: function (jobId) {
    console.log('test' + jobId)
    let data = getApp().userData.jobHistory
    let findIndex = data.findIndex((job, index) => {
      return (job.jobId === jobId)
    })
    this.setData({
      currentSelect: findIndex,
      jobArray: data,
    })
  },

  selectChange: function (e) {
    this.setData({
      currentSelect: e.detail.currentSelect
    })
  },

  finishClick: function () {

  },

  problemClick: function () {

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