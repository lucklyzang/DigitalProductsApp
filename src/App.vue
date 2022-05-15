<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
      <keep-alive >
        <router-view v-if="$route.meta.keepAlive" class="child-view"></router-view>
      </keep-alive>
    <!-- </transition> -->
    <!-- <transition :name="transitionName"> -->
      <router-view v-if="!$route.meta.keepAlive" class="child-view" />
    <!-- </transition> -->
  </div>
</template>
<script>
  export default {
    data () {
      return {
        transitionName: ''
      }
    },
    mounted () {
      // if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      //   window.addEventListener('hashchange', () => {
      //       let currentPath = window.location.hash.slice(1)
      //       if (this.$route.path !== currentPath) {
      //           this.$router.push(currentPath);// 主动更改路由界面
      //       }
      //   }, false);
      // }
    },

    methods: {
    },

    watch: {
      '$route' (to, from) {
        if (to.name == 'home' && from.name == 'myInfo') {
          this.transitionName = '';
          return
        };
        if (to.name == 'myInfo' && from.name == 'home') {
          this.transitionName = '';
          return
        };
        if (to.name == 'home' && !from.name) {
          this.transitionName = 'slide-right';
          return
        };
        const toDepth = to.meta.index;
        const fromDepth = from.meta.index;
        if (toDepth > fromDepth) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      }

    }
  };
  //App接口
  window['setAppInfo'] =function (uid,os) {
    window.os=os
    window.uid=uid
  }
  //H5接口
  window.addEventListener('message',function(event){
    let data = event.data
    if(data.os !== undefined){
      window.os=data.os
      window.uid=data.uid
    }
  },false)
</script>
<style lang="less" scoped>
  @import "~@/common/stylus/reset.less";
  @import "~@/common/stylus/variable.less";
  #app {
    font-size: 0;
    position: relative;
    min-height: 100vh;
    width: 100%;
    background: @color-background
  };
  .slide-right-enter {
    position: absolute;
    width: 100%;
    min-height: 100vh;
    transform: translateX(100%);
    background: @color-background
  };
  .slide-right-enter-active {
    transition: all 0.3s;
    position: absolute;
    width: 100%;
    min-height: 100vh;
    background: @color-background;
  };
  .slide-right-leave-active {
    display: none;
    position: absolute;
    width: 100%;
    min-height: 100vh;
    transition: all 0.3s;
    position: absolute;
    background: @color-background;
  };
  .slide-right-leave-to {
    display:none;
    position: absolute;
    width: 100%;
    min-height: 100vh;
    background: @color-background;
    transform: translateX(-100%);
  }


  .slide-left-enter {
    position: absolute;
    width: 100%;
    min-height: 100vh;
    background: @color-background;
    transform: translateX(-100%);
  };
  .slide-left-leave-to {
    display:none;
    width: 100%;
    min-height: 100vh;
    transform: translateX(100%);
    position: absolute;
    background: @color-background
  } 
  .slide-left-enter-active {
    width: 100%;
    min-height: 100vh;
    transition: all 0.3s;
    position: absolute;
    background: @color-background
  }
  .slide-left-leave-active {
    display: none;
    transition: all 0.3s;
    position: absolute;
    width: 100%;
    min-height: 100vh;
    background: @color-background
  }
</style>
