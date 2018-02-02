// pages/mt-info/mt-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
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
      return (ele.id === idParam)
    })

    // 设置
    this.setData({
      mileToneNameArr: userData.mileToneNameArr,
      currentSelect: currentSelect
    }, () => { this.checkPos() })
  },

  leftClick: function () {
    this.setData({
      currentSelect: this.data.currentSelect - 1
    })
    this.checkPos()
  },

  rightClick: function () {
    this.setData({
      currentSelect: this.data.currentSelect + 1
    })
    this.checkPos()
  },

  checkPos () {
    console.log('check')
    // 如果l为0
    if (this.data.currentSelect === 0) {
      // 如果r为0
      if (this.data.currentSelect === this.data.mileToneNameArr.length - 1) {
        this.setData({
          hideStatus: 'both'
        })
      } else {
        this.setData({
          hideStatus: 'left'
        })
      }

    } else {
      // 如果r为0
      if (this.data.currentSelect === this.data.mileToneNameArr.length - 1) {
        this.setData({
          hideStatus: 'right'
        })
      } else {
        this.setData({
          hideStatus: 'none'
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取链接
    if (options) {
      this.setData({
        id: options.id
      })
    }
    // 拉取数据
    this.getFromUserData(parseInt(options.id))
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