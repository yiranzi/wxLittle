var http = require('http')
var cheerio = require('cheerio')

let stockArr = ['000001','399006']
let stockArr2 = ['159915','399006']
const titles = ['date','start','max','min','end','value','percent','volume','obv']
let baseUrl = 'http://quotes.money.163.com/trade/lsjysj_zhishu_'
let baseUrl2 = 'http://quotes.money.163.com/fund/jzzs_'
let tail = '.html'
 
function initCheerio(html) {
    let data = []
    // html = '<div><table><tbody><tr><td>1</td><td>2</td></tr>tr><td>3</td><td>4</td></tr></tbody><table/></div>'
    var $ = cheerio.load(html)
    var chapter = $('.inner_box tbody tr').each(function(item) {
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
            obj[titles[item]] = Number(calcValue)
            // console.log(obj[titles[item]])
        })
        data.push(obj)
    })
    return data
}

function findMax (data, type) {
    // 传入一个元素。返回这个元素的每天的属性值，最大的一天的项
    // 假设他有这个值
    let maxIndex = 0
    let minIndex = 0
    data.forEach((item, index) => {
        if (Number(item[type]) > Number(data[maxIndex][type])) {
            maxIndex = index 
        }
        if (Number(item[type]) < Number(data[minIndex][type])) { minIndex = index }
    })
    return {
        max: data[maxIndex],
        min: data[minIndex]
    }
}

function outPutInfo (obj, titles) {
    console.log(obj)
    titles.forEach((item, index) => {
        let str = `${item} is ${obj[item]}`
    })
}



function getStockData (url) {
    console.log('enter')
    return new Promise((resolve, reject) => {
        http.get(url, function(req, res) {
            var html='';  
            req.on('data',function(data){  
                html+=data;  
            });  
            req.on('end',function(){  
                // 1拉取数据
                resolve(initCheerio(html))
                // 2找出最大小数值
            });  
        });
    })
}
module.exports = async ctx => {
    // 获得股票id
    let {stock_id} = ctx.request.body
    var url = baseUrl + stock_id + tail
    // 2 拉取股票数据
    let stockData = await getStockData(url)
    let endValue = findMax(stockData, 'end')
    endValue.stockId = stock_id
    endValue.today = stockData[0]
    ctx.state.data = endValue
}
 