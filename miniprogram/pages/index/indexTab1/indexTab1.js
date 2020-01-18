// pages/index/indexTab1/indexTab1.js
const APP=getApp()
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
    list:[],
    isEmptyList: true,//加载为空了
    newList:[],
    adShow: APP.adShow
  },
  attached(){
    this.more=false;//是否是上拉加载
    this.page=1
    APP.loadShow()
    Promise.all([this.moreList(),this.newList()])
    .then(()=>{
      wx.hideLoading()
    }).catch(err=>{
      wx.hideLoading();
      APP.hintShow("加载数据失败！！")
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
      moreList() {//更多
        let data=this.data
        return APP.request({
          path: "/api/portal/articles/index",
          method:"POST",
          data:{
            page:this.page,
            type:"more"
          }
        }).then(res => {
          if(res.length<20){
            this.setData({ isEmptyList:false})
          }
          this.setData({
            list: this.more ? data.list.concat(res):res
          });
          console.log(res)
        });
    },
    newList(){//最新
      return APP.request({
        path: "/api/portal/articles/index",
        method: "POST",
        data: {
          page:1,
          type:"new"
        }
      }).then(res => {
        this.setData({
          newList: res
        });
      })
    },
    onPullDown(e) {//下拉刷新
      APP.loadShow()
      const { stop } = e.detail;
      this.setData({
        isEmptyList:true,
      });
      this.more = false;
      this.page=1;
      Promise.all([this.moreList(), this.newList()])
        .then(() => {
          wx.hideLoading();
          stop();
        }).catch(err => {
          stop();
          APP.hintShow("刷新失败！！")
        });
    },
    onReachBottom(e){
      const { stop } = e.detail;
      if (!this.data.isEmptyList) return stop();
      APP.loadShow();
      this.more=true;
      this.page+=1 
      this.moreList().then(()=>{
        stop();
        wx.hideLoading()
      }).catch(()=>{
        wx.hideLoading();
        stop();
        APP.hintShow("上拉加载失败！")
      })
    },
    dot() {
      wx.navigateToMiniProgram({
        appId: 'wx1a15fc0525cd4706',
        path: 'pages/index/index',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success(res) {
          console.log("跳转成功")
          // 打开成功
        },
        fail: err => {
          console.log("跳转失败", err)
        }
      })
    },
  }
})
