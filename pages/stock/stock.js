var ajax = require('../../ajax/ajax');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInput: '',
    stockIdList: ['501050','510050','510880','510500', '159915', '501029'],
    // stockIdList: ['0501050','0510050','0510880','0510500', '1159915', '0501029'],
    // stockIdList: ['0000001','1159915','0600684'],
    // stockIdList: ['159915'],
    // stockTitles: ['date','start','max','min','end','value','percent','volume','obv'],
    stockTitles: ['date','name','open','close','high','low','price','updown','percent','volume','turnover'],
    stockList: {},
    stockListArr: {},
    stockData: {
      min: {},
      max: {},
      today: {}
    },
  },

  init: function () {
    let {stockIdList} = this.data
    // 一次发起请求。
    let promiseArr = ajax.getStockHistory(stockIdList)

    // let promiseArr = stockIdList.map((item, index) => {
    //   return ajax.getStockHistory(item)
    // })
    let objArr = []
    promiseArr.then(value => {
      // 整理数据
      let stockInfoList = value.data.data
      console.log(stockInfoList)
      for (let stock_id in stockInfoList) {
        let historyJson = stockInfoList[stock_id].history
        for (let valueKey in historyJson) {
          if (valueKey.includes('Percent')) {
            let float = Number((historyJson[valueKey] * 100).toFixed(4))
            historyJson[valueKey] = float + '%'
            console.log(historyJson[valueKey])
          } else if (typeof(historyJson[valueKey]) === 'number') {
            historyJson[valueKey].toFixed(2)
          }
        }
        historyJson.stock_id = stock_id
        objArr.push(historyJson)
      }
      // 保存数据
      this.setData({
        stockListArr: objArr
      })
      console.log(objArr)
    })
  },

  getStockList: function () {
    // 发起请求

    // 把结果。分为最大 最小。并且保存在不同的数据里？
    // 在列表中进行渲染 第一行是标题

    // 首先渲染历史
    // 之后渲染当日和3个月内最低相比差值。用来作为买入标准。
    // 之后渲染当日和3个月内最高相比差值。用来作为卖出标准

    // 然后是用户设定的买入标的。比如是10%。和卖出标的。比如10%。
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.dialog = this.selectComponent("#modalBox");
    // this.alert = this.selectComponent("#alert");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
})