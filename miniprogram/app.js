//app.js
App({
  config:{
    apiHost:"https://article.silver.yazai.com",

  },
  request({ path = '/', method, data }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.config.apiHost}${path}`,
        method: method || 'GET',
        // header: headers,
        data: data || {},
        success: res => {
          if (res.statusCode===200) {
            resolve(res.data.data)
          } else {
            reject(res)
          }
        },
        fail: reject
      });
    });
  },
  loadShow(text="加载中..."){
    wx.showLoading({
      title: text,
      icon:"none"
    });
  },
  hintShow(text="有个提示~"){
    wx.showToast({
      title: text,
      icon:"none",
      duration:2000
    })
  },
  onLaunch: function () {
    
    // if (!wx.cloud) {
    //   console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    // } else {
    //   wx.cloud.init({
    //     // env 参数说明：
    //     //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
    //     //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
    //     //   如不填则使用默认环境（第一个创建的环境）
    //     // env: 'my-env-id',
    //     traceUser: true,
    //   })
    // }

    this.globalData = {}
  }
})
