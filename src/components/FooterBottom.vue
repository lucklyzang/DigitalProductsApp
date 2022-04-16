<template>
  <div class="tabBar-box">
    <van-tabbar route v-model="active" placeholder  @change="onChange" active-color="orange" inactive-color="#cac8c8" :border="false" :safe-area-inset-bottom="true">
      <van-tabbar-item replace to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item replace to="/myInfo" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>  
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'FooterBottom',
  data () {
    return {
      active: 0
    }
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    ...mapMutations([
    ]),
     onChange(index) {
    }
  }
}

</script>
<style lang='less' scoped>
@import "../common/stylus/variable.less";
@import "../common/stylus/mixin.less";
.tabBar-box {
  /deep/ .van-tabbar {
    background: #252525;
    .van-tabbar-item {
      background: #252525;
      .van-tabbar-item__text {
        font-size: 10px !important;
      }
    } 
  }
}  
</style>