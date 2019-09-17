// pages/daily/daily.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stockName:"",
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
        year:result[i][1].substring(0,4),
        month:result[i][1].substring(4,6),
        day:result[i][1].substring(6,8),
        open:result[i][2], //开盘价
        high:result[i][3], //最高价
        low:result[i][4], //最低价
        close:result[i][5], //收盘价
        pre_close:result[i][6], //昨收价
        change:result[i][7], //涨跌额
        pct_chg:result[i][8], //涨跌幅
        vol:result[i][9], //成交量
        amount:result[i][10] //成交额
      })
    }
    this.setData({
      stocks: tmp
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      let stockId = options.stockId
      let name = options.stockName
      this.setData({stockName:name})
      let nowDate = new Date()
      let startDate = new Date(nowDate.getTime()-15*24*60*60*1000)
      let endDate = new Date(nowDate.getTime()-1*24*60*60*1000)
      wx.request({
        url: 'https://api.waditu.com',
        data: {
          "api_name":"daily",
          "token":"661e37a653b9d21d2c287d17946bd65b72354666de7d4b5d3e4997fa",
          "params":{"ts_code":stockId,"start_date":this.dateHelper(startDate),"end_date":this.dateHelper(endDate)},
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