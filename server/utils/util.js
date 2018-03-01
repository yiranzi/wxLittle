let today = -1
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 计算到目前为止的天数
const getDateDiff = (start, end = Date.now()) => {
  let diff = end - start
  // 不能摸出，负数代表前几天
  // if (diff < 0) {
  //   diff = -diff
  // }
  return Math.floor(diff/ (24 *3600 * 1000))
}

// 任意时刻，相对于originTime 过去了多少天
const getDayDiff = (time) => {
  const origin = 1514736000000
  return getDateDiff(origin,Date.now()) - getDateDiff(origin,time)
}

const getUsedDay = (sql) => {
  let userIdSql = sql
  return new Promise((resolve, reject) => {
    const { mysql } = require('../qcloud')
    if (today === -1) {
      console.log('get from ajax!!!!')
      mysql("user_info").where( userIdSql ).first().then(res => {
        if (res) {
          let usedDay = getDayDiff(0, res.start_time)
          // today = usedDay
          console.log(today)
          resolve (usedDay)
        }
      })
    } else {
      console.log('get from cache!!!!')
      resolve (1000)
    }
  })
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

const getEnv = () => {
  // return true
  return false
}


module.exports = { formatTime, getRandomInt, getEnv, getUsedDay, getDateDiff, getDayDiff, today }
