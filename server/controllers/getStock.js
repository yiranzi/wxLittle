var http = require('http')
var cheerio = require('cheerio')
const { mysql } = require('../qcloud')

// let stockArr = ['000001','399006']
let stockArr = ['501050','510050','510880','510500', '159915', '501029']
const idToCode = {
    '501050': '0501050',
    '510050': '0510050',
    '510880': '0510880',
    '510500': '0510500',
    '159915': '1159915',
    '501029': '0501029',
}
function codeToId (code) {
    let result 
    for (let id in idToCode) {
        if (idToCode[id] === code) {
            return id
        }
    }
}
const idToName = {
    '501050': '50AH',
    '510050': '50ETF',
    '510880': 'H-ETF',
    '510500': '500',
    '159915': 'CYB',
    '501029': 'H-JJ',
}
const dbTitles = ['date','name','open','close','high','low','price','updown','percent','volume','turnover']
// const dbTitles = ['open','high','x','low','','volume','turnover']
const historyValues = ['date','close']
// let baseUrl = 'http://quotes.money.163.com/trade/lsjysj_zhishu_'
let baseUrl = 'http://quotes.money.163.com/fund/jzzs_'
let tail = '.html'

function getUpdateToday(html) {
    // html = '<div><table><tbody><tr><td>1</td><td>2</td></tr>tr><td>3</td><td>4</td></tr></tbody><table/></div>'
    var $ = cheerio.load(html)
    var currentValue = $('.fn_data_trend .fn_data_trend_total h3 big').text()
    var date = $('.fn_data_trend .fn_data_trend_total .fn_data_time').text()
    // data需要修饰
    let obj = {
        close: currentValue,
        date: date
    }
    var todayDate = $('.fn_data_line_1 .fn_data_prop_5 li').children().each(function(item) {
        var li_s = $(this)
        if (dbTitles[item] !== '') {
            obj[dbTitles[item]] = li_s.text()
        }
    })
    return obj
}
 
function getUpdateJsonToday(jsonList) {
    let objResult = {}
    let today = ''
    for (let stock_id_code in jsonList) {
        let json = jsonList[stock_id_code]
        let {volume, high, low, price, open, turnover, percent, update: date, yestclose} = json
        let obj = {
            price,
            date,
            open,
            high,
            low,
            volume,
            turnover,
            percent
        }
        obj.close = price
        let arr = date.split(' ')
        obj.date = arr[0]
        if (today === '') {
            today = arr[0]
            objResult.today = today
        }
        let stock_id = codeToId(stock_id_code)
        objResult[stock_id] = obj
    }
    return objResult
}
 
function initCheerio(html) {
    let data = []
    // html = '<div><table><tbody><tr><td>1</td><td>2</td></tr>tr><td>3</td><td>4</td></tr></tbody><table/></div>'
    var $ = cheerio.load(html)
    var chapter = $('#fn_fund_value_trend .fn_cm_table tbody tr').each(function(item) {
        var trs = $(this)
        let obj = {}
        var tds = trs.children().each(function(item){
            let value = $(this).text()
            let calcValue = ''
            if (value.includes(',')) {
                let arr = value.split(',')
                arr.forEach((item, index) => {
                    calcValue += item
                })  
            }
            calcValue = calcValue || value
            obj[historyValues[item]] = calcValue
            // console.log(obj[titles[item]])
        })
        data.push(obj)
    })
    return data
}

/**
 * 
 * @param {全部的数据} data 
 * @param {需要根据哪个数值查找最大值} type 
 */
function getMaxValue (data, type, mode) {
    // 传入一个元素。返回这个元素的每天的属性值，最大的一天的项
    // 假设他有这个值
    let maxIndex = 0
    let minIndex = 0
    if (mode) {
        data.forEach((item, index) => {
            if (Number(item['high']) > Number(data[maxIndex]['high'])) {
                maxIndex = index
            }
            if (Number(item['low']) < Number(data[minIndex]['low'])) { minIndex = index }
        })
    } else {
        data.forEach((item, index) => {
            if (Number(item[type]) > Number(data[maxIndex][type])) {
                maxIndex = index
            }
            if (Number(item[type]) < Number(data[minIndex][type])) { minIndex = index }
        })
    }
    let maxDayId = 0
    // 查找今日
    data.forEach((dayStockJson, index) => {
        if ( (new Date(dayStockJson.date)).getTime() > (new Date(data[maxDayId].date)).getTime() ) {
            maxDayId = index
        }
    })
    let todayId = maxDayId
    return {
        max: data[maxIndex],
        min: data[minIndex],
        today: data[todayId]
    }
}

function outPutInfo (obj, titles) {
    titles.forEach((item, index) => {
        let str = `${item} is ${obj[item]}`
    })
}



function getStockData (stock_id, type) {
    return new Promise((resolve, reject) => {
        if (type === 'history') {
            let url = baseUrl + stock_id + tail
            http.get(url, function(req, res) {
                var html='';  
                req.on('data',function(data){  
                    html+=data;  
                });  
                req.on('end',function(){  
                    // 1拉取数据
                    resolve(initCheerio(html))
                });  
            });
        } else if (type === 'today') {
            // let callback = '_ntes_quote_callback16591768'
            let callback = '_ntes_quote_callback41158938'
            let arr = stock_id
            let string = ''
            arr.forEach((item, index) => {
                string = string + idToCode[item] + ','
            })
            let url = `http://api.money.126.net/data/feed/${string}money.api?callback=${callback}`
            http.get(url, function(req, res) {
                var html='';  
                req.on('data',function(data){  
                    html+=data;  
                });  
                req.on('end',function(){ 
                    // 处理html数据
                    // 查找（出现的位置
                    let arr = html.split(');') 
                    let stringData = arr[0].slice(html.indexOf('(') + 1)
                    resolve(getUpdateJsonToday(JSON.parse(stringData)))
                });  
            });
        }
    })
}

function dataBeforeInsertFormat (data, stock_id) {
    // 如果没有对应的元素。插入默认值
    let obj = {
        stock_id: stock_id,
        date: data.date,
        open: Number(data.open || data.close),
        close: Number(data.close),
        price: Number(data.price || data.close),
        high: Number(data.high || data.close),
        low: Number(data.low || data.close),
        volume: Number(data.volume || 0),
        turnover: Number(data.turnover || 0),
        name: data.name || idToName[stock_id],
    }
    if (data.updown) {
        // 计算差值
        obj.updown = data.updown
    } else {
        obj.updown = 0
    }
    if (data.percent) {
        // 特殊处理下关于percent 或者直接计算得出
        obj.percent = Number(data.percent)
    } else {
        obj.percent = 0.1
    }
    // 插入
    return (obj)
}

async function saveData (dataInfo, stock_id, type) {
    // 比对数据
    let promiseArr = []
    // dataList 需要是数组。 如果是obj 需要另外处理
    if (type === 'history') {
        let stockIdSql = {
            stock_id: stock_id
        }
        //  拉取表
        let stockHistory = await mysql('stock_history').where( stockIdSql )
        dataInfo.forEach((data, item) => {
            // 每个新数据
            let result = stockHistory.find((stock ,index) => {
            //  比对每个表数据
                return (stock.date === data.date)
            })
            // 如果没有数据
            if (!result) {
                let obj = dataBeforeInsertFormat(data, stock_id)
                try {
                    promiseArr.push(mysql('stock_history').insert(obj))
                    // console.log('insert' + stock_id + result)
                } catch (e) {
                    console.log(e)
                }
            }
        })     
    } else if (type === 'today') {
        // obj
        let daySql = {
          date: dataInfo.today
        }
        let dataInfoJson = Object.assign({}, dataInfo)
        delete dataInfoJson.today
        let stockHistory = await mysql('stock_history').where( daySql )
        for (let stock_id in dataInfoJson) {
            let result = stockHistory.find((item ,index) => {
                return stock_id === item.stock_id
            })
            let obj = dataBeforeInsertFormat(dataInfoJson[stock_id], stock_id)
            // 如果没有查找到 就新建
            if (!result) {
                promiseArr.push(mysql('stock_history').insert(obj))
            } else {
                // update
                promiseArr.push(mysql('stock_history').update(obj).where({stock_id: stock_id, date: daySql.date}))
            }
        }
    }
    await Promise.all(promiseArr)
    console.log('finish')
}

async function makeHistoryData (stock_id) {
    let stockIdSql = {
        stock_id: stock_id
    }
    // 1 拉取历史数据
    let stockHistoryData = await mysql('stock_history').where(stockIdSql)
    // 2 返回历史数据
    let type
    let maxValueInfo
    let result = {}
    const calcMode = 1
    if (calcMode) {
        type = 'close'
        maxValueInfo = getMaxValue(stockHistoryData, type, calcMode)

        if (maxValueInfo.max) {
            result = {
                name: idToName[stock_id],
                stock_id: stock_id,
                today: maxValueInfo.today.close,
                maxValue: maxValueInfo.max['high'],
                maxPercent: (maxValueInfo.today.close - maxValueInfo.max['high'])/maxValueInfo.max.close,
                minValue: maxValueInfo.min['low'],
                minPercent: (maxValueInfo.today.close - maxValueInfo.min['low'])/maxValueInfo.min.close
            }
        }
    } else {
        type = 'close'
        maxValueInfo = getMaxValue(stockHistoryData, type, calcMode)

        result.normalPart = {
            name: idToName[stock_id],
            stock_id: stock_id,
            today: maxValueInfo.today.close,
            maxValue: maxValueInfo.max[type],
            maxPercent: (maxValueInfo.today.close - maxValueInfo.max[type])/maxValueInfo.max.close,
            minValue: maxValueInfo.min[type],
            minPercent: (maxValueInfo.today.close - maxValueInfo.min[type])/maxValueInfo.min.close
        }

        type = 'high'
        maxValueInfo = getMaxValue(stockHistoryData, type)
        result.maxPart = {
            name: idToName[stock_id],
            stock_id: stock_id,
            today: maxValueInfo.max.date,
            maxValue: maxValueInfo.max[type],
            maxPercent: (maxValueInfo.today.close - maxValueInfo.max[type])/maxValueInfo.max.close,
        }
        type = 'low'
        maxValueInfo = getMaxValue(stockHistoryData, type)
        result.minPart = {
            name: idToName[stock_id],
            stock_id: stock_id,
            today: maxValueInfo.min.date,
            minValue: maxValueInfo.min[type],
            minPercent: (maxValueInfo.today.close - maxValueInfo.min[type])/maxValueInfo.min.close
        }
    }
    return result
}

module.exports = async ctx => {
    // 获得股票id
    let {stock_id_list} = ctx.request.body
    let type = 'today'
    let result = {}

    if (type === 'history') {
        for (let i = 0; i < stock_id_list.length; i++) {
            let stock_id = stock_id_list[i]
             // 1 拉取最新的股票数据
            let stockData = await getStockData(stock_id, type)
            // 2 比对并存入数据库
            await saveData(stockData, stock_id, type)
        }
    } else if (type === 'today') {
        // 1 拉取最新的股票数据
        let stockData = await getStockData(stock_id_list, type)
        // 2 比对并存入数据库
        await saveData(stockData, stock_id_list, type)
    }

    for (let i = 0; i < stock_id_list.length; i++) {
        let stock_id = stock_id_list[i]
        // 3 构造历史数据
        let history = await makeHistoryData(stock_id)
       
        // 5 today
        // 从另外一个口。更新获得今日最新的数据。这个可以模拟一下
        result[stock_id] = {
            stockId: stock_id,
            history: history,
            today: undefined
        }
    }
    ctx.state.data = result
}
 