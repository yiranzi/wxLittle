//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },


  globalData: {
    userInfo: null
  },
  globalComponent: {
    alert: {}
  },
  globalInfo: {
    alertInfo: ""
  },
  userData: {
    uesrInfo: [
      {
        name: 'miao',
        gold: 1000,
        exp: 100,
        userId: '18410109'
      },
      {
        name: 'baobao',
        gold: 2000,
        exp: 300,
        userId: '18410108'
      }
    ],
    mileToneNameArr: [
      {
        userId: '18410109',
        id: 8,
        title: '小程序开发——打卡之神',
        desc: '小程序是我的创业项目。是我技术能力的推动器。我要好好坚持下去。',
        todayJob: [
          {
            mtId: 8,
            jobId: 101,
            title: 'haha',
            desc: 'desc',
            goal: 'heihei',
            level: 2,
          }
        ]
      },
      {
        userId: '18410109',
        id: 9,
        title: 'react积累：学习循环构建',
        desc: '为了让学习从开始学，到思考，输出，实践有一个完整的流程，也为了实现我在流程上和在学习新事物上的特殊能力，以react的深入学习，输出为始终，进行尝试',
        todayJob: [
        ]
      }
    ],
    jobHistory: [
      {
        mtId: 8,
        jobId: 101,
        title: 'haha',
        desc: 'desc',
        goal: 'heihei',
        level: 2, // level 就是时间
      }
    ],
    randomMission: [
      {
        level: 0.5,
        missionList: [
          {
            title: '消灭邪恶的守夜人',
            desc: '他们亵渎了国王的荣耀',
            goal: '',
          },
        ]
      }
    ]
  }
})
// 用户信息表
// mt表

// job表。完成的和未完成的。不同的里程碑的，都进去。
