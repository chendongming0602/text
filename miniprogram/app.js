//app.js
try{
  wx.cloud.init({
    traceUser: true,
    env: 'text1-jpf2z'
  });
}catch(err){
 
}
const ald = require('./utils/ald-stat.js');//配置阿里丁
import { config } from './utils/config.js';
//let { ver } = require('./utils/version.js');//审核关闭需要的东西
App({

  userInfo:{
    isPower:false
  },
  configs:{//审核控制数据

  },
  isCallback:false,
  adShow:false,
  request({ path = '/', method, data }) {
    return new Promise((resolve, reject) => {
      let datas={
        ...data,
        version: config.version
      }
      wx.request({
        url: `${config.apiHost}${path}`,
        method: method || 'GET',
        // header: headers,
        data: datas || {},
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
  getUserPic() {//授权请求
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            this.userInfo.isPower = true;//已经授权
            // console.log(this.userInfo.isPower)
            // resolve()
            ///////////////////////////////////
            // console.log(this.userInfo.isPower)
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            /////////////////////////////////////////////////////////
            this.userLogin().then(resolve);//登录函数
          } else {
            console.log("app: " + "用户暂时未授权")
            resolve()
          };

        }
      });
    })

  },
  userLogin() {//登录请求
    let _this = this
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          let codes = res.code
          wx.getUserInfo({
            success(res) {
              var userInfo = res.userInfo
              // console.log(res)
              _this.request({
                path: "/api/wx/login/wxLogin",
                method: "POST",
                data: {
                  code: codes,
                }
              }).then(res => {
                // console.log("用户信息", res)
                _this.userInfo = {
                  isPower: true,
                  ...res,
                  ...userInfo
                };
                //_this.isCallback = true;//告诉主页登录成功
                try{
                  wx.aldstat.sendOpenid(res.openid);
                }catch(err){
                  console.log("阿拉丁记录用户错误",err)
                }
               
                // wx.setStorage({//缓存token
                //   key: "tokens",
                //   data: res.token
                // });
                resolve();
              })
            },
            fail: reject

          });

        },
        fail: reject
      });
    });
  },
  configE(){//审核判断信息
    return this.request({
      path:"/api/portal/Articles/getMiniConfig",
    }).then(res=>{
      return res
    });
  },
  onLaunch: function () {
    Promise.all([this.getUserPic(), this.configE()]).then((res) => {
      let configs=res[1];
      this.configs = { ...configs };
      console.log("全部调用完成");
      this.isCallback = true;//向首页传递已经判断授权
      if (this.checkLoginReadyCallback) {
        this.checkLoginReadyCallback();
      }
    }).catch((err)=>{//报错给授权
      this.userInfo.isPower = true;//已经授权
      this.isCallback = true;//向首页传递已经判断授权
      if (this.checkLoginReadyCallback) {
        this.checkLoginReadyCallback();
      }
    });
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
