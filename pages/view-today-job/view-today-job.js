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
        job_id: options.job_id
      })
    }
    // 拉取数据 并设置
    this.getFromJobHistory(parseInt(options.job_id))
  },

  // 更新数据
  getFromJobHistory: function (job_id) {
    ajax.getJobList().then((jobList) => {
      if (jobList && jobList.length > 0) {
        let canFinishJob = jobList.filter((job, index) => {
          return (job.evaluate === '')
        })
        canFinishJob.sort((jobA, jobB) => {
          if (jobA.mt_id < jobB.mt_id) {
            return -1
          } else if (jobA.mt_id > jobB.mt_id) {
            return 1
          } else {
            if (jobA.job_id < jobB.job_id) {
              return -1
            } else if (jobA.job_id > jobB.job_id) {
              return 1
            }
          }
        })
        this.setData({
          jobArray: canFinishJob,
        })
        if (job_id) {
          let findIndex = canFinishJob.findIndex((job, index) => {
            return (job.job_id === job_id)
          })
          this.setData({
            currentSelect: findIndex,
          })
        } else {
          if (this.data.currentSelect > canFinishJob.length - 1 && this.data.currentSelect!== 0) {
            this.setData({
              currentSelect: canFinishJob.length - 1,
            }, () => {this.selectComponent('#arrowSelector').checkPos()})
          } else {
            this.selectComponent('#arrowSelector').checkPos()
          }
        }
      }
    })
  },

  selectChange: function (e) {
    this.setData({
      currentSelect: this.data.currentSelect + e.detail.currentSelect
    }, () => {e.detail.callBack()})
  },

  finishClick: function () {
    this.selectComponent('#evaluate').showDialog(getApp().dialogData['job'])
  },

  problemClick: function () {

  },

  clickButton: function () {
    util.showSuccess('完成任务')
  },

  finishEvaluate: function (e) {
    let obj = this.data.jobArray[this.data.currentSelect]
    let newObj = {
      job_id: Number(obj.job_id),
      mt_id: Number(obj.mt_id),
      evaluate: e.detail.myEvaluate,
      grade: Number(e.detail.score),
      realCostTime: Number(e.detail.realCostTime),
    }
    ajax.finishTodayJob(newObj).then((res) => {
      this.getFromJobHistory()
      // 刷新数据 // 弹出领取奖励的弹框
      if(res) {
        this.selectComponent('#reward').show(res)
      }
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