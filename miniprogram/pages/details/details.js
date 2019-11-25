// miniprogram/pages/details/details.js
const APP = getApp()
// const WxParse = require('../../utils/wxParse/wxParse.js');//组件解析（卡）
import {rich} from '../../utils/rich.js';//解析富文本
const music = wx.createInnerAudioContext();//背景音乐
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDistance:false,//音乐图标距离
    isMusic:true,//音乐播放
    isList:false,//数据加载完成
    list:{},
    listArr:[],//推荐列表
    adShow: APP.adShow,//广告位显示
    content:""
  },

  musicImg() {//背景音乐的按钮
    if (this._isMusic) return APP.hintShow("背景音乐播放失败！")
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
  detailList(){//数据
    return APP.request({
      path: "/api/portal/articles/read",
      data:{
        id: this.id
      },
      method: "POST"
    }).then(res => {
      let text = res.post_content;
      // WxParse.wxParse("textHtml", 'html', text, this);
      setTimeout(() => {//延时给富文本渲染
        this.setData({ isList: true })
      }, 500);
      let richText = rich(text);//解析完成后的
      this.setData({
        content: richText
      })
      let obj = {};//将不必要的地方去掉，减少data的压力
      for(var key in res){
        if (key !== "post_content")
        obj[key]=res[key]
      };
      this.setData({
        list: obj
      });
      return res
    });
  },
  recommend(){//推荐
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
      try{
        console.log(res[0].more.audio)
        if (!res[0].more.audio){
          APP.hintShow("背景音乐播放失败！");
          this.setData({ isMusic: false });
          this._isMusic = true;
          return
        }
        music.onError((e) => {
          APP.hintShow("背景音乐播放失败！");
          this.setData({ isMusic: false });
          this._isMusic = true;
        });
        if (this._isMusic) return
        music.src = res[0].more.audio;
        music.title = "背景音乐"
        music.play();
        music.onPause(() => {
          music.play();
        });
        // music.onPause(()=>{
        //   console.log("暂停")
        // })
       
      }catch(err){
        APP.hintShow("背景音乐播放失败！");
        this.setData({isMusic:false});
        this._isMusic=true
      }
      wx.hideLoading()
    }).catch(()=>{
      APP.hintShow("数据加载失败！！")
    })
    
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
    music.play();
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
    music.stop();
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
  onShareAppMessage: function (res) {
    let data = this.data.list
    if (!res.target) {//正常分享
      return {
        title: data.post_title,
        imageUrl: data.more.beackimg,
        path: '/pages/details/details?id=' + data.id
      };
    } else {//广场消息分享
      return {
        imageUrl: data.more.beackimg,
        title: data.post_title,
        path: '/pages/details/details?id='+data.id
      };
    }
  }
})