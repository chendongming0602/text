// miniprogram/pages/details/details.js
const APP = getApp()
const WxParse = require('../../utils/wxParse/wxParse.js');
const music = wx.createInnerAudioContext();//背景音乐
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDistance:false,//音乐图标距离
    isMusic:true,//音乐播放
    isList:false,
    list:{},
    listArr:[],//推荐列表
  },

  musicImg() {//背景音乐的按钮
    this.setData({
      isMusic: !this.data.isMusic
    }, () => {
      if (this.data.isMusic) {
        music.play();
      } else {
        music.stop();
      }
    })
  },
  detailList(){
    return APP.request({
      path: "/api/portal/articles/read",
      data:{
        id: this.id
      },
      method: "POST"
    }).then(res => {
      let text = res.post_content;
      this.setData({
        list:res
      })
      WxParse.wxParse("textHtml", 'html', text, this);
      setTimeout(()=>{//延时给富文本渲染
        this.setData({isList:true})
      },1000);
      return res
    });
  },
  recommend(){
    return APP.request({
      path: "/api/portal/articles/index",
      method: "POST",
      data: {
        page: 1
      }
    }).then(res => {
      this.setData({
        listArr: res
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id=options.id;
    APP.loadShow()
    Promise.all([this.detailList(),this.recommend()])
    .then(res=>{
      music.src = res[0].more.audio;
      music.title = "背景音乐"
      music.play();
      music.onPause(() => {
        music.play();
      });
      wx.hideLoading()
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onPageScroll: function (e) {//滚动触发
    if(e.scrollTop>150){
      this.setData({
        isDistance:true
      })
    }else{
      this.setData({
        isDistance: false
      })
    }
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

  }
})