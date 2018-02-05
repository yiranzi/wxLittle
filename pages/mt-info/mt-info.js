// pages/mt-info/mt-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mileToneNameArr: [],
    currentSelect: -1,
    hideStatus: ''
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
      mileToneNameArr: userData.mileToneNameArr,
      currentSelect: currentSelect
    }, () => {console.log('finish set')})
  },

  selectChange: function (e) {
    this.setData({
      currentSelect: e.detail.currentSelect
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 拉取数据
    this.getFromUserData(parseInt(options.mtId))
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