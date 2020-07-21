// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabCount:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[
      {
        name:"最新",
        url:"https://minis-resources-1254468731.cos.ap-guangzhou.myqcloud.com/text/tab/new.png",
        urlNo:"https://minis-resources-1254468731.cos.ap-guangzhou.myqcloud.com/text/tab/newNo.png"
      },
      {
        name:"最热",
        url:"https://minis-resources-1254468731.cos.ap-guangzhou.myqcloud.com/text/tab/fire.png",
        urlNo:"https://minis-resources-1254468731.cos.ap-guangzhou.myqcloud.com/text/tab/fireNo.png"
      }
    ],
    count:1
  },
  attached(){
    this.setData({
      count: this.data.tabCount
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tabEvent(e){
      let { index } = e.currentTarget.dataset
      this.setData({
        count:index
      },()=>{
        this.triggerEvent("tabIdex",index)
      })
    }
  }
})
