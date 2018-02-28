var util = require("../../utils/util")

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
  },
  data: {
    // 这里是一些组件内部数据
    isShow: false,
    content: {title: 'title', desc: 'desc'},
    myInput: ''
  },
  methods: {
    // 这里是一个自定义方法
    postProblem: function () {
      if (this.data.myInput) {
        this.triggerEvent('postProblem', {input: this.data.myInput})
        this.hideDialog()
      } else {
        util.showModel('内容不能为空哦', '填写上你的原因吧！这样有个积累！')
      }
    },
    /*
     * 公有方法
     */
    inputCbf(e) {
      this.setData({
        myInput: e.detail.value
      })
    },

    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow,
        myInput: ''
      })
    },
    //展示弹框
    showDialog(content) {
      console.log(content)
      this.setData({
        isShow: true,
        content: content
      })
    },
  }
})