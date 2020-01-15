// components/other/other.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dot(){
      wx.navigateToMiniProgram({
        appId: 'wx1a15fc0525cd4706',
        path: 'pages/index/index',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'develop',
        success(res) {
          console.log("跳转成功")
          // 打开成功
        },
        fail:err=>{
          console.log("跳转失败",err)
        }
      })
    },
    closeRed(){
      this.setData({isShow:true})
    }
  }
})
