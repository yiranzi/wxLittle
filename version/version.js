let versionInfo = {
  '2.1': '0.优化新建里程碑体验。1.增加里程碑描述。2.增加-查看里程碑-点击红色区域可以进入。',
  '2.3': '1.增加了当日任务，新建当日任务和查看当日任务。2.主界面可以新建当日任务，并看到各个里程碑的时间。3.增加弹框组件',
  '2.4': '1.增加了查看当日任务界面',
  '': '1.',
}

let arr = Object.keys(versionInfo)
let dayCode = arr[arr.length - 2]


module.exports = {versionInfo, dayCode}