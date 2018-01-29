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
    ],
    dataFinishArray: [], // 表示进度信息
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
  },
  inputCbf: function (event) {
    this.setData({
      newMtName: event.detail.value
    })
    
  },

  getDataFromServer: function () {
    // 1 设置processdata
    this.setData({
      dataFinishArray: this.staticProcessData
    })
    this.calcProcess()
  },

  clickButton: function (e) {
    let result = this.data.dataFinishArray.find((ele, index) => {
      return ele.id === parseInt(e.currentTarget.id)
    })
    result.info[result.info.length - 1].finish = true
    console.log(result)
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
        } else {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataFromServer()
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