const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const getRandomInt =(min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getUserId = (obj) => {
  let name = getApp().globalData.userInfo.nickName
  let user_id
  switch (name) {
    case '依然':
      user_id = 1
      break
    case '我爱我家的小宝宝':
      user_id = 1024
      break
    default:
      user_Id = 2
  }
  console.log(user_id)
  obj['user_id'] = user_id
  return obj
}

const getEnv = () => {
  return false
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

module.exports = { formatTime, showBusy, showSuccess, showModel, getRandomInt, getUserId, getEnv }
