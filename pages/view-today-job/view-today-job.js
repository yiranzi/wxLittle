// pages/view-today-job/view-today-job.js

var ajax = require('../../ajax/ajax');
var util = require('../../utils/util');
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

  // 更新数据
  getFromJobHistory: function (jobId) {
    let data = getApp().userData.jobHistory
    console.log('getFromJobHistory')
    console.log(data)
    let newData = data.filter((job, index) => {
      return (job.evaluate === '')
    })
    newData.sort((jobA, jobB) => {
      if (jobA.mtId < jobB.mtId) {
        return -1
      } else if (jobA.mtId > jobB.mtId) {
        return 1
      } else {
        if (jobA.jobId < jobB.jobId) {
          return -1
        } else if (jobA.jobId > jobB.jobId) {
          return 1
        }
      }
    })
    this.setData({
      jobArray: newData,
    })
    if (jobId) {
      let findIndex = newData.findIndex((job, index) => {
        return (job.jobId === jobId)
      })
      this.setData({
        currentSelect: findIndex,
      })
    } else {
      if (this.data.currentSelect > newData.length - 1 && this.data.currentSelect!== 0) {
        this.setData({
          currentSelect: newData.length - 1,
        }, () => {this.selectComponent('#arrowSelector').checkPos()})
      } else {
        this.selectComponent('#arrowSelector').checkPos()
      }
    }
  },

  selectChange: function (e) {
    console.log(e)
    this.setData({
      currentSelect: this.data.currentSelect + e.detail.currentSelect
    }, () => {e.detail.callBack()})
  },

  finishClick: function () {
    this.selectComponent('#evaluate').showDialog(getApp().dialogData['job'])
  },

  problemClick: function () {

  },

  finishEvaluate: function (e) {
    let obj = this.data.jobArray[this.data.currentSelect]
    let newObj = {
      jobId: Number(obj.jobId),
      mtId: Number(obj.mtId),
      evaluate: e.detail.myEvaluate,
      grade: e.detail.score
    }
    ajax.finishTodayJob(newObj).then(() => {
      util.showSuccess('完成任务')
      this.getFromJobHistory()
    })
    // 上报。分数。上报我的自我评价
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