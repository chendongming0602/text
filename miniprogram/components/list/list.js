// components/list/list.js
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
    }
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

  }
})
