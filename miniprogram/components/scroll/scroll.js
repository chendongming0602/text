Component({
  options: {
    multipleSlots: true
  },
  behaviors: [],
  properties: {
    more: {
      type: Boolean,
      value: true
    },
    pulldownTop: {
      type: Number,
      value: 0
    },
    intoEle: {
      type: String,
      value: ''
    }
  },
  data: {
    offset: 0
  },
  lifetimes: {
    attached: function () {
      this.onTheTop = true;
      this.touchSpot = {
        startX: 0,
        startY: 0
      };
    },
    moved: function () { },
    detached: function () { }
  },
  pageLifetimes: {
    show: function () { },
    hide: function () { },
    resize: function () { }
  },
  methods: {
    // 触底加载
    bindscrolltolower: function (e) {
      if (!this.data.more || this.lock) return;
      this.lock = true;
      this.triggerEvent('reachbottom', {
        stop: () => {
          this.lock = false;
        }
      }, {});
    },
    bindscrolltoupper: function (e) {
     
      this.onTheTop = true;
    },
    bindscroll: function (e) {
      // console.log(e.detail.scrollTop)
      if (e.detail.scrollTop === 0) {
        this.onTheTop = true;
      } else {
        this.onTheTop = false;
      }
    },
    touchstart(e) {
      if (!this.onTheTop || !e.changedTouches[0]) return;
      const { pageX, pageY } = e.changedTouches[0];
      this.touchSpot.startX = pageX;
      this.touchSpot.startY = pageY;
    },
    touchmove(e) {
      //return//关闭下拉刷新
      if (!this.onTheTop || !e.changedTouches[0]) {
        return;
      } else if (!this.touchSpot.startX) {
        const { pageX, pageY } = e.changedTouches[0];
        this.touchSpot.startX = pageX;
        this.touchSpot.startY = pageY;
        return;
      }
      const { pageX, pageY } = e.changedTouches[0];
      let offset = (pageY - this.touchSpot.startY) / 2;
      this.setData({
        offset: offset > 100 ? 100 : offset
      });
    },
    touchend(e) {
      // return
      if (this.data.offset >= 70) {
        if (this.data.offset < 100) {
          this.setData({
            offset: 100
          });
        }
        // 下拉刷新
        this.triggerEvent('pulldown', {
          stop: () => {
            setTimeout(() => {
              this.setData({
                offset: 0
              });
            }, 600);
          }
        }, {});
      } else {
        this.setData({
          offset: 0
        });
      }
      this.resetTouchSpot();
    },
    resetTouchSpot() {
      this.touchSpot = {
        startX: 0,
        startY: 0
      };
    }
  }
});
