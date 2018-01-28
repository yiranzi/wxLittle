// pages/main/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newMtName: '',
    day: 1,
    mileToneNameArr: [
      {
        index: 0,
        title: '好好写代码1'
      },
      {
        index: 1,
        title: 'hello world!'
      }
    ]
  },
  newMtClick: function (event) {
    let arr = []
    let obj = {}
    obj.title = this.data.newMtName
    obj.index = this.data.mileToneNameArr.length
    arr = this.data.mileToneNameArr
    arr.push(obj)
    this.setData({
      mileToneNameArr: arr,
      newMtName: ''
    })
  },k
  inputCbf: function (event) {
    this.setData({
      newMtName: event.detail.value
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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