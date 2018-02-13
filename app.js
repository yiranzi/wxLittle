//app.js
//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    // qcloud代码
    qcloud.setLoginUrl(config.service.loginUrl)

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
  dialogData: {
    'job': '可真是艰险的冒险，让我看看你的成果'
  },

  originData: {
    mt : {
      userId: '',
      mtId: 0,
      title: '',
      desc: '',
      exp: 0,
      todayJob: [

      ],
      startTime: 0,
      equip: [

      ],
      item: [

      ],
    },
    job: {
      mtId: 0,
      jobId: 0,
      title: '',
      desc: '',
      goal: '',
      level: 0,
      startTime: 0,
      endTime: 0,
      grade: 0,
      problem: '',
      evaluate: '',
    },
    reward: {
      exp: 1000,
      gold: 100,
      equip: [],
    },
    equip: {
      name: '',
      desc: '',
      power: '',
      icon: '',
      id: 0,
      belong: 0,
    }
  },
  randomData: {
    equip: [
      {
        id: 0,
        name: '分院帽',
        desc: '一个年岁很高，话更多的帽子，哦，他是活的！',
        power: '开启《探险历史》功能',
        icon: '../../src/img/icon_1.png'
      },
      {
        id: 1,
        name: '草帽',
        desc: '看起来像路飞的那顶草帽',
        power: '让你能够开启更多地《异世界之门》',
        icon: '../../src/img/icon_1.png'
      }
    ]
  },
  userData: {
    userInfo: [
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
        mtId: 8,
        title: '你好冒险者，我为了遇见你而存在',
        desc: '我是kara，我在这里等你很久了，我是你的伙伴。你现在所处的世界属于《打卡之神》，是掌管众多异世界入口的大神。在这些异世界里面，藏着你关于未来的众多梦想，而我将和你一起去开启，坚持，实现他们，准备好了吗？回到《打卡之神》次元，查看我们今天的任务吧！',
        exp: 0,
        todayJob: [
          {
            mtId: 8,
            jobId: 101,
            title: '打开一扇你自己的次元大门',
            desc: '这里是众多异世界的入口，他的作用就是让你建立，查看，前往各个异世界。点击《开启新世界的大门》，就能够让你和新的异世界产生异次元连接。你在里面可以历练，完成任务，并获得成长。当你完成1万小时的历险后，你就可以挑战那个世界的远古大神，成为异世界新的主宰了！',
            goal: '开启新的，属于你自己的，异次元大门',
            level: 1,
            startTime: 1517881674933,
            endTime: 0,
            grade: 0,
            problem: '',
            evaluate: '',
          }
        ],
        startTime: 1517881674933,
        equip: [

        ],
        item: [

        ],
      },
    ],
    jobHistory: [
      {
        mtId: 8,
        jobId: 101,
        title: '打开一扇你自己的次元大门',
        desc: '这里是众多异世界的入口，他的作用就是让你建立，查看，前往各个异世界。点击《开启新世界的大门》，就能够让你和新的异世界产生异次元连接。你在里面可以历练，完成任务，并获得成长。当你完成1万小时的历险后，你就可以挑战那个世界的远古大神，成为异世界新的主宰了！',
        goal: '开启新的，属于你自己的，异次元大门',
        level: 1,
        startTime: 1517881674933,
        endTime: 0,
        grade: 0,
        problem: '',
        evaluate: '',
      }
    ],
    randomMission: [
      {
        level: 0.5,
        missionList: [
          {
            title: '',
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
