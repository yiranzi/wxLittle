// components/arrow-selector/arrow-selector.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideStatus: {
      type: String,
      value: 'both',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 这里是一个自定义方法
    clickButton: function (event) {
      console.log(this.properties.hideStatus)
      if (event.currentTarget.dataset.pos === 'left') {
        this.triggerEvent('leftClick', {})
      } else {
        this.triggerEvent('rightClick', {})
      }

    },
  }
})
