// pages/main/index.js
var version = require('../../version/version');
var ajax = require('../../ajax/ajax');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    day: 0,
    mileToneNameArr: [],
    userInfo: {},
    codeIndex: '',
    isHide: false,
  },

  // staticProcessData: [
  //   {
  //     id: 8,
  //     info: [
  //       {
  //         date: 0,
  //         finish: true
  //       },
  //       {
  //         date: 1,
  //         finish: false
  //       },
  //       {
  //         date: 2,
  //         finish: null
  //       }
  //     ]
  //   },
  //   {
  //     id: 9,
  //     info: [
  //       {
  //         date: 0,
  //         finish: true
  //       },
  //       {
  //         date: 1,
  //         finish: true
  //       },
  //       {
  //         date: 2,
  //         finish: null
  //       }
  //     ]
  //   },
  //   {
  //     id: 10,
  //     info: [
  //       {
  //         date: 0,
  //         finish: true
  //       },
  //       {
  //         date: 1,
  //         finish: false
  //       },
  //       {
  //         date: 2,
  //         finish: null
  //       }
  //     ]
  //   }
  // ],

  // 加载的时候 设置数据
  // getDataFromServer: function () {
  //   // 1 设置processdata
  //   this.setData({
  //     dataFinishArray: this.staticProcessData
  //   })
  //   this.calcProcess()
  // },

  // 新建任务
  clickNewJob: function (e) {
    let url = `/pages/new-job/new-job?mt_id=${e.currentTarget.id}`
    wx.navigateTo({
      url: url
    })
  },

  // 查看任务
  viewJob: function (e) {
    let url = `/pages/view-today-job/view-today-job?job_id=${e.currentTarget.id}`
    wx.navigateTo({
      url: url
    })
  },
  // 点击签到按钮
  // clickButton: function (e) {
  //   // 设置当前
  //   let resultIndex = this.data.dataFinishArray.findIndex((ele, index) => {
  //     return ele.id === parseInt(e.currentTarget.id)
  //   })
  //   this.setData({
  //     currentSelect: resultIndex
  //   })
  //   // 打开弹出
  //   this.dialog.showDialog()
  // },

  //set
  // setResult: function (bool) {
  //   let result = this.data.dataFinishArray[this.data.currentSelect]
  //   result.info[result.info.length - 1].finish = bool
  //   this.calcProcess()
  // },

  introduceTips () {
    ajax.testCgi()
    let {codeIndex} = this.data
    this.alert.showDialog(`依然的大冒险 更新公告${codeIndex}号：  ${version.versionInfo[codeIndex]}`)
  },

  // 引用组件事件上报
  // cancelEvent: function () {
  //   this.setResult(false)
  //   this.dialog.hideDialog()
  // },
  //
  // sureEvent: function () {
  //   this.setResult(true)
  //   this.dialog.hideDialog()
  // },

  // 更新进度数据
  // calcProcess: function () {
  //   let dataFinishArray = this.data.dataFinishArray
  //   let arr = dataFinishArray.map((infos, index) => {
  //     let totalCount = totalCount = infos.info.length
  //     let finishCount = 0
  //     let unFinishCount = 0
  //     infos.info.forEach((info, index) => {
  //       if(info.finish) {
  //         finishCount++
  //       } else if (info.finish !== null) {
  //         unFinishCount++
  //       }
  //     })
  //     infos.finishCount = finishCount
  //     infos.unFinishCount = unFinishCount
  //     infos.totalCount = totalCount
  //     // 设置当日的结果
  //     if(infos.info[totalCount - 1].finish) {
  //       infos.color = 'green'
  //       infos.status = '已完成'
  //     } else if (infos.info[totalCount - 1].finish === false) {
  //       infos.color = 'red'
  //       infos.status = '未完成'
  //     } else {
  //       infos.color = 'grey'
  //       infos.status = '未打卡'
  //     }
  //     return infos
  //   })
  //   this.setData({
  //     dataFinishArray: arr
  //   })
  // },

  goRouter: function (e) {
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  },

  getMileToneInfo: function () {
    // 获取全局数据
    // var mileToneNameArr = getApp().userData.mileToneNameArr
    ajax.getMileToneList().then ((mileToneNameArr) => {
      if (mileToneNameArr && mileToneNameArr.length > 0) {
        mileToneNameArr.map((mt, index) => {
          let totalLevel = 0
          if (mt.todayJob && mt.todayJob.length > 0) {
            mt.todayJob.forEach((job, index) => {
              totalLevel += Number(job.level)
            })
          }
          mt.totalLevel = totalLevel
          return mt
        })
        // 设置
        this.setData({
          mileToneNameArr: mileToneNameArr
        })
      }
    })
  },



  getUserInfo: function () {
    ajax.getUserInfo().then((res) => {
      let data = res.data.data
      if (data) {
        this.setData({
          userInfo: data,
          day: data.usedDay + 1
        })
      } else {
        // 发起注册请求
        ajax.newUserSign().then((res) => {
          let data = res.data.data
          if (data) {
            this.setData({
              userInfo: data
            })
          }
          getApp().globalInfo.alertInfo.push('你好冒险者，我是kara，我在这里等你很久了。你现在所处的世界属于《打卡之神》他的作用就是让你建立，查看，前往各个异世界。')
          getApp().globalInfo.alertInfo.push('点击《开启新世界的大门》，就能够让你建立新的世界。你在里面可以历练成长。当你完成1万小时的历险后，你就变成那个世界真正的大神了！')
          this.showDialog()
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // ajax.testCgi()
    // 如果没有临时登录信息
    // 则重新获取，并保存到global中
    // 简化处理。直接获取新的。
    getApp().globalCbfFunc.userInfoCbf = this.onLoadGetUrseInfo
  },

  onLoadGetUrseInfo: function () {
    this.getUserInfo()
    this.getMileToneInfo()
    // 设置版本号
    this.setData({
      codeIndex: version.dayCode
    }, this.redict)
  },

  redict() {
    // let a = 'view-today-job'
    let a = ''
    switch (a) {
      case 'view-today-job':
        let url = `/pages/view-today-job/view-today-job?job_id=${101}`
        wx.navigateTo({
          url: url
        })
        break
      default:
    }
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
    if (this.data.isHide) {
      // 如果隐藏 重新刷新数据
      this.getMileToneInfo()
      this.getUserInfo()
      this.setData({
        isHide: false
      })
    }
    this.showDialog()
  },

  // alert组件
  showDialog: function () {
    if (getApp().globalInfo.alertInfo.length > 0) {
      let alertInfo = getApp().globalInfo.alertInfo.shift()
      let that = this
      setTimeout(() => {
        this.alert.showDialog(alertInfo)
      },100)
    }
  },

  alertClickButton: function () {
    this.showDialog()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 这个钩子在主页跳转back的时候会调用。
    // tabbar切换的时候也会调用
    this.setData({
      isHide: true
    })
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