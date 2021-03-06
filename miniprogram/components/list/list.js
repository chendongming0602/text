// components/list/list.js
const APP=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name:String,
    isEmpty:{//是否显示为空
      type:Boolean,
      value:false
    },
    list:Array,//数据
    isEmptyList:{//数据为空
      type:Boolean,
      value:true
    },
    count:{
      type:String,
      value:"默认"
    },//判断是哪里来的(给广告)
  },

  /**
   * 组件的初始数据
   */
  data: {
    adShow:APP.adShow
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail(e){
      let { id } = e.currentTarget.dataset
      // console.log(id)
      // wx.showLoading({
      //   title: '努力加载中...',
      //   mask:true
      // })
      wx.navigateTo({
        url: '/pages/details/details?id='+id,
      });
    },
  }
})
