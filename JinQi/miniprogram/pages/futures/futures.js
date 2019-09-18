// pages/futures/futures.js
//测试TSCODE: Y2008.DCE
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
          pre_close:result[i][2], //昨收盘价：
          pre_settle:result[i][3], //昨结算价：
          open:result[i][4], //开盘价
          high:result[i][5], //最高价
          low:result[i][6], //最低价
          close:result[i][7], //收盘价
          settle:result[i][8], //	结算价
          change1:result[i][9], //涨跌1 收盘价-昨结算价
          change2:result[i][10], //涨跌2 结算价-昨结算价
          vol:result[i][11], //	成交量(手)
          amount:result[i][12], //成交金额(万元)
          oi:result[i][13], //持仓量(手)
          oi_chg:result[i][14], //持仓量变化
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
        "api_name":"fut_daily",
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