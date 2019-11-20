// pages/index/indexTab1/indexTab1.js
const APP = getApp()
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
    list: [],
    isEmptyList: true,//加载为空了
  },
  attached() {
    this.more = false;//是否是上拉加载
    this.page = 1
    this.newList();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    newList() {
      let data = this.data
      APP.loadShow()
      return APP.request({
        path: "/api/portal/articles/index",
        method: "POST",
        data: {
          page: this.page
        }
      }).then(res => {
        if (res.length < 20) {
          this.setData({ isEmptyList: false })
        }
        this.setData({
          list: this.more ? data.list.concat(res) : res
        });
        wx.hideLoading()
        console.log(res, 111)
      }).catch(err => {
        wx.hideLoading();
        APP.hintShow("请求数据失败!");
      })
    },
    onPullDown(e) {//上拉刷新
      const { stop } = e.detail;
      this.setData({
        isEmptyList: true,
      });
      this.more = false;
      this.page = 1;
      this.newList().then(() => {
        stop()
      });
    },
    onReachBottom(e) {
      const { stop } = e.detail;
      if (!this.data.isEmptyList) return stop();
      this.more = true;
      this.page += 1
      this.newList().then(() => {
        stop()
      });
    }
  }
})
