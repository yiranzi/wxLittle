var util = require('../../utils/util');

Component({
  properties: {
    sureContent: {
      type: String,
      value: '确认',
    },
    cancelContent: {
      type: String,
      value: '取消',
    },
    defaultContent: {
      type: String,
      value: '今天任务是否完成了？',
    },
    contentA: {
      type: String,
      value: '默认内容1',
    },
  },
  data: {
    // 这里是一些组件内部数据
    showContent: '', // 这是组件的内容文案
    isShow: false,
    currentSelect: -1,
    arrContent: ['我完成的非常出色','我完成的一般一般','我完成的很勉强'],
    myEvaluate: '',
  },
  methods: {
    // 这里是一个自定义方法
    sureClick: function () {
      this.triggerEvent('sureEvent', {})
    },
    cancelClick: function () {
      // 关闭 并 重置
      this.setData({
        isShow: false,
        currentSelect: -1,
      })
    },
    defaultClick: function () {
    },
    finishEvaluate: function () {
      if (this.data.currentSelect === -1) {
        util.showModel('你的完成度没选择', '选择一个完成度然后再确认')
      } else if (this.data.myEvaluate === '') {
        util.showModel('你的任务评价没填写', '填写上再确认')
      } else {
        this.triggerEvent('finishEvaluate', {
          score: this.data.currentSelect,
          myEvaluate: this.data.myEvaluate
        })
        this.cancelClick()
      }
    },
    chooseScore: function (e) {
      let id = e.currentTarget.id
      this.setData({
        currentSelect: id
      })
    },
    inputCbf: function (e) {
      this.setData({
        myEvaluate: e.detail.value
      })
    },
    /*
     * 公有方法
     */

    //展示弹框
    showDialog(content) {
      let showContent = content ? content : this.properties.defaultContent
      this.setData({
        isShow: true,
        showContent: showContent
      })
    },
  }
})