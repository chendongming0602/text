//index.js
const APP = getApp()

Page({
  data: {
    tabCount:0,//选择的tab
    tabIf:[false,false]
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
  
  onLoad: function() {
    this.setData({
      [`tabIf[${this.data.tabCount}]`]: true
    })
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
      title: "蜜囍美文",
      imageUrl: "https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/text/new/top.png",
      path: '/pages/index/index'
    };
  }
})
