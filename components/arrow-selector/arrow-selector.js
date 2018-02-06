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
    },
    byFather: {
      type: Boolean,
      value: false,
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
    this.setData({
      currentSelect: this.properties.defaultSelect
    }, () => { this.checkPos() })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 这里是一个自定义方法
    clickButton: function (event) {
      if (this.properties.byFather) {
        if (event.currentTarget.dataset.pos === 'left') {
          this.triggerEvent('selectChange',{currentSelect: -1, callBack:this.checkPos.bind(this)})
        } else {
          this.triggerEvent('selectChange',{currentSelect: 1, callBack:this.checkPos.bind(this)})
        }
      } else {
        if (event.currentTarget.dataset.pos === 'left') {
          this.setData({
            currentSelect: this.data.currentSelect - 1
          }, () => {this.checkPos()})
        } else {
          this.setData({
            currentSelect: this.data.currentSelect + 1
          }, () => {this.checkPos()})
        }
      }
    },
    // 设置位置
    checkPos () {
      let current
      if (this.properties.byFather) {
        current = this.properties.defaultSelect
      } else {
        current = this.data.currentSelect
      }
      // 如果l为0
      if (this.properties.dataArr.length <= 0) {
        this.setData({
          hideStatus: 'both'
        })
      } else {
        if (current === 0) {
          // 如果r为0
          if (current === this.properties.dataArr.length - 1) {
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
          if (current === this.properties.dataArr.length - 1) {
            this.setData({
              hideStatus: 'right'
            })
          } else {
            this.setData({
              hideStatus: 'none'
            })
          }
        }
      }

      if (!this.properties.byFather) {
        this.triggerEvent('selectChange',{currentSelect: this.data.currentSelect})
      }
    },
  }
})
