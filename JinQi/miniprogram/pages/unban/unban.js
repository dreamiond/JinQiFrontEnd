// pages/unban/unban.js
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
  setStocks: function (result, i, holderName){
    if(i == 7){ //回掉函数异步执行，第7次循环不一定最后完成，需要判读
      console.log(result)
      let tmp = []
      for (let i = 0; i < result.length; ++i){
        if(result[i][5] == holderName)
        tmp.push({
          ts_code:result[i][0], //TS代码
          ann_date:result[i][1], //公告日期
          float_date:result[i][2], //解禁日期
          float_share:result[i][3], //流通股份
          float_ratio:result[i][4], //流通股份占总股本比率
          share_type:result[i][6] //股份类型
        })
      }
      this.setData({
        stocks: tmp
      })
    }
  },
  stockSearch: function (e) {
    let holderName = e.detail.value.inputText
    var that = this
    let nowDate = new Date()
    let result = []
    for(let i = 1; i < 8; ++i){
      let thisDate = this.dateHelper(new Date(nowDate.getTime() - i * 24 * 60 * 60 * 1000))
      wx.request({
        url: 'https://api.waditu.com',
        data: {
          "api_name":"share_float",
          "token":"661e37a653b9d21d2c287d17946bd65b72354666de7d4b5d3e4997fa",
          "params":{"ann_date":thisDate},
          "fields":""
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success: res => {
          let tmp = res.data.data.items
          for (let j = 0; j < tmp.length; ++j){
            result.push(tmp[j])
          }
          that.setStocks(result, i, holderName) //wx.request回掉函数异步调用，需要在内部保存数据
        }
      })
    }
  }
})