// pages/newMileTone/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newMtName: '',
    newMtDesc: '',
    mileToneNameArr: []
  },

  /**
   * 私有方法
   * @param event
   */

  // 输入框组件回调
  inputCbf: function (event) {
    if (event.currentTarget.dataset.typeName === 'name') {
      this.setData({
        newMtName: event.detail.value
      })
    } else if (event.currentTarget.dataset.typeName === 'desc') {
      this.setData({
        newMtDesc: event.detail.value
      })
    }
  },

  // 输入完成后确认
  newMtClick: function () {
    // 判断是否有内容
    if (this.data.newMtName && this.data.newMtDesc) {
      this.dialog.showDialog()
    } else if (this.data.newMtName) {
      this.alert.showDialog('里程碑名称为空')
    } else {
      this.alert.showDialog('里程碑描述内容为空')
    }
  },

  // 录入数据
  saveMileTone () {
    // 保存
    let arr = []
    let obj = {}
    obj.title = this.data.newMtName
    obj.desc = this.data.newMtDesc
    // 获取全局数据
    var userData = getApp().userData
    obj.id = userData.mileToneNameArr[userData.mileToneNameArr.length - 1].id + 1
    userData.mileToneNameArr.push(obj)
    this.setData({
      newMtName: '',
      newMtDesc: ''
    })

    // 返回
    wx.navigateBack({
      delta: 1
    })
    // 输入弹窗信息
    // 获取
    var globalInfo = getApp().globalInfo
    // 清空
    globalInfo.alertInfo = ''
    // 添加
    globalInfo.alertInfo = '添加成功！'
  },

  sureEvent: function () {
    this.saveMileTone()
    this.dialog.hideDialog()
  },

  cancelEvent: function () {
    this.dialog.hideDialog()
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
    this.dialog = this.selectComponent("#modalBox");
    this.alert = this.selectComponent("#alert");
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