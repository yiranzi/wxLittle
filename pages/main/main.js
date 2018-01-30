// pages/main/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newMtName: '',
    day: 1,
    mileToneNameArr: [],
    dataFinishArray: [], // 表示进度信息
    currentSelect: -1,
    isLeave: false
  },

  staticProcessData: [
    {
      id: 0,
      info: [
        {
          date: 0,
          finish: true
        },
        {
          date: 1,
          finish: false
        },
        {
          date: 2,
          finish: null
        }
      ]
    },
    {
      id: 1,
      info: [
        {
          date: 0,
          finish: true
        },
        {
          date: 1,
          finish: true
        },
        {
          date: 2,
          finish: null
        }
      ]
    },
    {
      id: 2,
      info: [
        {
          date: 0,
          finish: true
        },
        {
          date: 1,
          finish: false
        },
        {
          date: 2,
          finish: null
        }
      ]
    }
  ],

  // 加载的时候 设置数据
  getDataFromServer: function () {
    // 1 设置processdata
    this.setData({
      dataFinishArray: this.staticProcessData
    })
    this.calcProcess()
  },

  // 点击签到按钮
  clickButton: function (e) {
    // 设置当前
    let resultIndex = this.data.dataFinishArray.findIndex((ele, index) => {
      return ele.id === parseInt(e.currentTarget.id)
    })
    this.setData({
      currentSelect: resultIndex
    })
    // 打开弹出
    this.dialog.showDialog()
  },

  //set
  setResult: function (bool) {
    let result = this.data.dataFinishArray[this.data.currentSelect]
    result.info[result.info.length - 1].finish = bool
    this.calcProcess()
  },


  // 引用组件事件上报
  cancelEvent: function () {
    console.log('page get cancelEvent')
    this.setResult(false)
    this.dialog.hideDialog()
  },

  sureEvent: function () {
    console.log('page get sureEvent')
    this.setResult(true)
    this.dialog.hideDialog()
  },

  // 更新进度数据
  calcProcess: function () {
    let dataFinishArray = this.data.dataFinishArray
    let arr = dataFinishArray.map((infos, index) => {
      let totalCount = totalCount = infos.info.length
      let finishCount = 0
      let unFinishCount = 0
      infos.info.forEach((info, index) => {
        if(info.finish) {
          finishCount++
        } else if (info.finish !== null) {
          unFinishCount++
        }
      })
      infos.finishCount = finishCount
      infos.unFinishCount = unFinishCount
      infos.totalCount = totalCount
      console.log(infos.info[totalCount - 1].finish)
      // 设置当日的结果
      if(infos.info[totalCount - 1].finish) {
        infos.color = 'green'
        infos.status = '已完成'
      } else if (infos.info[totalCount - 1].finish === false) {
        infos.color = 'red'
        infos.status = '未完成'
      } else {
        infos.color = 'grey'
        infos.status = '未打卡'
      }
      return infos
    })
    this.setData({
      dataFinishArray: arr
    })
    console.log(arr)
  },

  goRouter: function () {
    console.log('goRouter')
    wx.navigateTo({
      url: '/pages/new-mt/new-mt'
    })
  },

  getFromUserData: function () {
    // 获取全局数据
    var userData = getApp().userData
    // 设置
    this.setData({
      mileToneNameArr: userData.mileToneNameArr
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataFromServer()
    this.getFromUserData()
    console.log('onLoad index')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#modalBox");
    console.log(this.dialog)
    console.log('onReady index')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow index')
    if (this.data.isHide) {
      // 如果隐藏 重新刷新数据
      this.getFromUserData()
      this.setData({
        isHide: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 这个钩子在主页跳转back的时候会调用。
    // tabbar切换的时候也会调用
    console.log('onHide index')
    this.setData({
      isHide: true
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload index')
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