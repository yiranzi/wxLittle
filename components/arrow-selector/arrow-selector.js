// components/arrow-selector/arrow-selector.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultSelect: {
      type: Number,
      value: 0,
    },
    dataArr: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hideStatus: 'both',
    currentSelect: 0,
  },

  ready: function () {
    console.log('ready')
    this.setData({
      currentSelect: this.properties.defaultSelect
    }, () => { this.checkPos() })
    console.log(this.properties)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 这里是一个自定义方法
    clickButton: function (event) {
      let value = 0
      if (event.currentTarget.dataset.pos === 'left') {
        this.setData({
          currentSelect: this.data.currentSelect - 1
        }, () => {this.checkPos()})
      } else {
        this.setData({
          currentSelect: this.data.currentSelect + 1
        }, () => {this.checkPos()})
      }
    },
    // 设置位置
    checkPos () {
      console.log('haha')
      // 如果l为0
      if (this.properties.currentSelect === 0) {
        // 如果r为0
        if (this.properties.currentSelect === this.properties.dataArr.length - 1) {
          this.setData({
            hideStatus: 'both'
          })
        } else {
          this.setData({
            hideStatus: 'left'
          })
        }

      } else {
        // 如果r为0
        if (this.properties.currentSelect === this.properties.dataArr.length - 1) {
          this.setData({
            hideStatus: 'right'
          })
        } else {
          this.setData({
            hideStatus: 'none'
          })
        }
      }
      this.triggerEvent('selectChange',{currentSelect: this.data.currentSelect})
    },
  }
})
