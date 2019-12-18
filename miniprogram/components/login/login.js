// components/login/login.js
const APP=getApp();
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(e) {
      if (e.detail.rawData) {//同意授权
        wx.showLoading({
          title: '授权中...',
          mask: true
        })
         APP.userLogin().then(res => {//调用全局登录接口
          this.triggerEvent("loginEvent");
          wx.hideLoading()
        }).catch(err => {
         wx.hideLoading();
          this.triggerEvent("loginEvent");
          console.log("登录失败,请重新登录", err)
        });
      } else {
        console.log("拒绝授权")
      }
    },
  }
})
