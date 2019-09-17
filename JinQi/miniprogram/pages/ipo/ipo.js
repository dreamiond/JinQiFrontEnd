// pages/ipo/ipo.js
Page({
  data: {
    stocks:[]
  },

  dateHelper: function (date) {
    // 2019/9/17 -> 20190917
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if(month<10){
      month = "0"+month
    }
    if(day<10){
      day = "0"+day
    }
    return year+month+day
  },
  setStocks: function (result){
    let tmp = []
    for (let i = 0; i < result.length; ++i){
      tmp.push({
        ts_code:result[i][0], //TS股票代码
        sub_code:result[i][1], //申购代码
        name:result[i][2], //名称
        ipo_date:result[i][3], //上网发行日期
        issue_date:result[i][4], //上市日期
        amount:result[i][5], //发行总量(万股)
        market_amount:result[i][6], //上网发行总量(万股)
        price:result[i][7], //发行价格
        pe:result[i][8], //市盈率
        limit_amount:result[i][9], //个人申购上限(万股)
        funds:result[i][10], //募集资金(亿元)
        ballot:result[i][11] //中签率
      })
    }
    this.setData({
      stocks: tmp
    })
  },
  onLoad: function (options) {
    var that = this
    let nowDate = new Date()
    let startDate = new Date(nowDate.getTime()-30*24*60*60*1000)
    let endDate = new Date(nowDate.getTime()-1*24*60*60*1000)
    wx.request({
      url: 'https://api.waditu.com',
      data: {
        "api_name":"new_share",
        "token":"661e37a653b9d21d2c287d17946bd65b72354666de7d4b5d3e4997fa",
        "params":{"start_date":this.dateHelper(startDate),"end_date":this.dateHelper(endDate)},
        "fields":""
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success:res=> {
        let result = res.data.data.items
        that.setStocks(result)
      }
    })
  }
})