// pages/new-job/new-job.js
var ajax = require('../../ajax/ajax');
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mt_id: 0,
    randomMissionArr: [],
    level: 0.5,
    currentSelect: 0,
    mileToneNameArr: [],
    currentMission: {},
    goal: '',
    title: '',
    desc: '',

  },

  inputCbf: function (e) {
    switch (e.currentTarget.dataset.type) {
      case 'level':
        this.setData({
          level: e.detail.value
        })
        break;
      case 'title':
        this.setData({
          title: e.detail.value
        })
        break;
      case 'goal':
        this.setData({
          goal: e.detail.value
        })
        break;
      case 'desc':
        this.setData({
          desc: e.detail.value
        })
        break;
    }
  },

  newJobButton: function () {
    // 判断是否有内容
    let {level, goal, mt_id, title, desc} = this.data
    if (!title) {
      util.showModel('名称为空','名称必须填写哦')
      return
    }
    if (!goal) {
      util.showModel('目标为空','目标是你的可量化完成标准，必须填写哦')
      return
    }
    // let {desc} = this.data.currentMission
    level = Number(Number(level).toFixed(1))
    let obj = {
      level: level,
      goal: goal,
      mt_id: mt_id,
      title: title,
      desc: desc,
    }
    this.setData({
      level: level
    })
    // 发送请求。生成修改数据
    ajax.postNewJob(obj).then((res) => {
      util.showSuccess('新增当日任务完成！')
    })
  },


  selectChange: function (e) {
    this.setData({
      currentSelect: e.detail.currentSelect
    }, () => {this.setCurrentSelect(parseInt(this.data.mileToneNameArr[this.data.currentSelect].mt_id))})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 设置level

    // 拉取随机数据
    // let jobHistory = this.getFromRandomMission(this.data.level)

    // 拉取全部异世界
    this.getMileToneNameArr(parseInt(options.mt_id)).then(() => {
      this.setCurrentSelect(options.mt_id)
    })
  },

  /**
   * 自定义方法
   */
  getMileToneNameArr: function (idParam) {
    return new Promise((reslove, reject) => {
      let _idParam = idParam
      ajax.getMileToneList().then ((mileToneNameArr) => {
        this.setData({
          mt_id: _idParam,
          mileToneNameArr: mileToneNameArr
        }, reslove())
      })
    })

  },

  setCurrentSelect: function (idParam) {
    idParam = parseInt(idParam)
    let {mileToneNameArr} = this.data
    let currentSelect = mileToneNameArr.findIndex((ele, index) => {
      return (ele.mt_id === idParam)
    })
    if (currentSelect) {
      this.setData({
        currentSelect: currentSelect,
        mt_id: idParam
      })
    }
  },
  //
  // getFromRandomMission: function (level) {
  //   let dataArr = getApp().userData.randomMission
  //   let data = dataArr.find((ele, index) => {
  //     return (ele.level === level)
  //   })
  //   // 获得一个随机数，并设置
  //   this.setData({
  //     randomMissionArr: data.missionList,
  //     currentMission: data.missionList[0]
  //   })
  // },

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