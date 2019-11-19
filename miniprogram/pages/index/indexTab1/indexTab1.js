// pages/index/indexTab1/indexTab1.js
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
    onPullDown(e) {//上拉刷新
      const { stop } = e.detail;
      wx.showLoading({
        title: '刷新中....',
      })
      setTimeout(() => {
        stop();
        wx.hideLoading();
      }, 1000);

    },
    onReachBottom(){
      console.log("在家")
    }
  }
})
