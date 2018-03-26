let versionInfo = {
  '2.1': '0.优化新建异世界体验。1.增加异世界描述。2.增加-查看异世界-点击红色区域可以进入。',
  '2.3': '1.增加了当日任务，新建当日任务和查看当日任务。2.主界面可以新建当日任务，并看到各个异世界的时间。3.增加弹框组件',
  '2.4': '1.增加了查看当日任务界面',
  '2.5': '1.新增了任务完成。2、新增了任务评价。',
  '2.6': '1.增加添加用户名。2、增加完成任务奖励。',
  '2.7': '1.修改了alert的bug',
  '2.16': '大版本更新！现在你可以试用打卡之神了，你的数据会被保存下来。试用整个流程，提出更多反馈吧！让我们共同加油',
  '2.19': '1.修改了账号系统的bug，现在登录会进行授权了。记得点击右上角开启调试模式才可以使用',
  '2.20': '1.修改了部分样式。里程碑更名为异世界。2.修改了箭头位置。',
  '2.22': '1.提交任务后反馈修改。2.修改等级系统',
  '2.25': '大版本调整。1.首页增加了总经验。2.增加了时间维度。你的任务会有过期。越早完成越多奖励。3.buff机制，连续完成任务会有奖励',
  '2.27': '1.修改时间计算上的bug',
  '2.28': '小更新：1.现在任务过期了需要填写失败原因和放弃',
  '3.5': '1.现在每天早早建立任务，会得到额外金币奖励！越早越多哦！',
  '3.26': '不务正业的我增加了股票模式 啊哈哈哈',
  '2.': '1.',
}

let arr = Object.keys(versionInfo)
let dayCode = arr[arr.length - 2]


module.exports = {versionInfo, dayCode}