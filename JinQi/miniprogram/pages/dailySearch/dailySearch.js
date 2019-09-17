Page({
  data: {
    stocks: []
  },
  onLoad(){
    console.log(this.data.stocks)
  },
  stockSearch: function(e){
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('stocks').where(_.or([
      {
        Id: db.RegExp({
          regexp: e.detail.value.inputText,
          //从搜索栏中获取的value作为规则进行匹配。
          options: 'i',
          //大小写不区分
        })
      },
      {
        name: db.RegExp({
          regexp: e.detail.value.inputText,
          //从搜索栏中获取的value作为规则进行匹配。
          options: 'i',
          //大小写不区分
        })
      }
    ]))
    .get({
      success: res=>{
        let result = res.data
        let tmp = []
        for(let i = 0; i<result.length; ++i){
          tmp.push({
            stockName:result[i].name,
            stockId: result[i].Id
          })
        }
        this.setData({
          stocks: tmp
        })
      }
    })
  }
})