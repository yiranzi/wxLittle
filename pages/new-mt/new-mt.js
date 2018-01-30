// pages/newMileTone/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newMtName: '',
    mileToneNameArr: []
  },

  /**
   * 私有方法
   * @param event
   */

  // 输入框组件回调
  inputCbf: function (event) {
    console.log(event.detail.value)
    this.setData({
      newMtName: event.detail.value
    })
  },

  // 输入完成后确认
  newMtClick: function (event) {
    console.log('click')
    let arr = []
    let obj = {}
    obj.title = this.data.newMtName
    // 获取全局数据
    var userData = getApp().userData
    obj.index = userData.mileToneNameArr.length
    userData.mileToneNameArr.push(obj)
    this.setData({
      newMtName: ''
    })
    this.dialog.showDialog()
  },

  getPopClick: function () {
    this.dialog.hideDialog()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad new')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#modalBox");
    console.log('onReady new')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow new')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide new')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload new')
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