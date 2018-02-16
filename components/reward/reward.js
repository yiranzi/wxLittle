// components/reward/reward.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    reward: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickButton: function () {
      this.setData({
        isShow: false
      })
      this.triggerEvent('clickButton', {})
    },
    show: function (reward) {
      this.setData({
        isShow: true,
        reward: reward
      })
    }
  }
})
