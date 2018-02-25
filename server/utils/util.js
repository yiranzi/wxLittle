const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const getDateDiff = (start, end = Date.now()) => {
  let diff = end - start
  if (diff < 0) {
    diff = -diff
  }
  return Math.floor(diff/ (24 *3600 * 1000))
}

const getDayDiff = (startDay, endDay) => {
  return endDay - startDay
}

const getUsedDay = () => {
  const { mysql } = require('../qcloud')
  mysql("user_info").where( userIdSql ).first().then(res => {
    if (res) {
      let usedDay = this.getDataDiff(res.start_time)
      return usedDay
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
  return true
  // return false
}


module.exports = { formatTime, getRandomInt, getEnv, getUsedDay, getDateDiff, getDayDiff }
