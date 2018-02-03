var qcloud = require('./wafer2-client-sdk/index');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const postNewJob = obj => {
  qcloud.request({
    url: 'http://199447.qcloud.la/user',
    success: function (response) {
      console.log(response);
    },
    fail: function (err) {
      console.log(err);
    }
  });
  let {mtId, level, goal, title, desc} = obj
  let res
  let jobHistory = getApp().userData.jobHistory
  // 0 构造新的数据
  let jobId = jobHistory[jobHistory.length - 1].jobId + 1
  let job = {
    mtId: mtId,
    jobId: jobId,
    title: title,
    desc: desc,
    goal: goal,
    level: level,
  }
  // 1 往hisotry添加数据
  jobHistory.push(job)
  // 2 更新mileToneNameArr.推入新的
  let mt = getApp().userData.mileToneNameArr.find((mt ,index) => {
    return (mt.id === mtId)
  })
  if (mt) {
    res = {
      status: 200,
      result: true,
    }
    mt.todayJob.push(job)
  } else {
    res = {
      status: 200,
      result: false,
    }
  }
  return res
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

module.exports = { postNewJob }
