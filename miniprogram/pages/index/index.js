//index.js
const APP = getApp()
//var music = wx.createInnerAudioContext();//背景音乐
Page({
  data: {
    tabCount:0,//选择的tab
    tabIf:[false,false],
    isPower: false,//是否授权了
    checking:false,//是否在审核状态
    isAllShow:false,//等回调结束再显示
  },
  tabIdex(e){//tab事件
    this.setData({
      tabCount:e.detail,
      [`tabIf[${e.detail}]`]:true
    });

  },
  frameEvent(){//打开收藏提示框
    this.selectComponent('#frame').showEvent()
  },
  loginEvent(){//通过授权
    this.setData({
      isPower:true,
    });
  },
  onLoad: function() {
    this.setData({
      [`tabIf[${this.data.tabCount}]`]: true
    });

    if (APP.isCallback) {
      this.setData({
        isPower: APP.userInfo.isPower,
        checking: global.checking,
        isAllShow:true
      });
    } else {
      APP.checkLoginReadyCallback = res => {
        this.setData({
          isPower: APP.userInfo.isPower,
          checking: global.checking,
          isAllShow: true
        });
      };
    }
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // music.stop();
    // music.pause();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "",
      imageUrl: "https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/text/new/top.png",
      path: '/pages/index/index'
    };
  }
})
