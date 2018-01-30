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
    content: {
      type: String,
      value: '今天任务是否完成了？',
    },
  },
  data: {
    // 这里是一些组件内部数据
    isShow: false
  },
  methods: {
    // 这里是一个自定义方法
    sureClick: function () { 
      console.log('sure')
      this.triggerEvent('sureEvent', {})
    },
    cancelClick: function () {
      console.log('cancel')
      this.triggerEvent('cancelEvent', {})
    },
    /*
     * 公有方法
     */

    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
  }
})