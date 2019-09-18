// pages/shareOption/shareOption.js
//测试TSCODE: 10001677.SH
const EXCHANGE = {
  "CZCE":"郑州商品交易所",
  "SHFE":"上海期货交易所",
  "DCE":"大连商品交易所",
  "SSE":"上海证券交易所"
}
Page({
  data: {
    stocks: []
  },
  dateHelper: function (date) {
    // 2019/9/17 -> 20190917
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (month < 10) {
      month = "0" + month
    }
    if (day < 10) {
      day = "0" + day
    }
    return year + month + day
  },
  setStocks: function (result) {
    let tmp = []
    for(let i = 0; i < result.length; ++i){
      tmp.push(
        {
          trade_date:result[i][1], //交易日期
          exchange:EXCHANGE[result[i][2]], //交易市场
          pre_settle:result[i][3], //昨结算价
          pre_close:result[i][4], //前收盘价
          open:result[i][5], //开盘价
          high:result[i][6], //最高价
          low:result[i][7], //最低价
          close:result[i][8], //收盘价
          settle:result[i][9], //结算价
          vol:result[i][10], //成交量(手)
          amount:result[i][11], //成交金额(万元)
          oi:result[i][12] //持仓量(手)
        }
      )
    }
    this.setData({
      stocks:tmp
    })
  },
  stockSearch: function (e) {
    let tsCode = e.detail.value.inputText
    var that = this
    let nowDate = new Date()
    let result = []
    let startDate = this.dateHelper(new Date(nowDate.getTime() - 8 * 24 * 60 * 60 * 1000))
    let endDate = this.dateHelper(new Date(nowDate.getTime() - 1 * 24 * 60 * 60 * 1000))
    wx.request({
      url: 'https://api.waditu.com',
      data: {
        "api_name":"opt_daily",
        "token":"661e37a653b9d21d2c287d17946bd65b72354666de7d4b5d3e4997fa",
        "params":{"ts_code":tsCode,"start_date":startDate,"end_date":endDate},
        "fields":""
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: res => {
        let result = res.data.data.items
        console.log(result)
        this.setStocks(result)
      }
    })
  }
})