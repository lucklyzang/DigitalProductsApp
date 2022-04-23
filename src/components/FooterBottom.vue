<template>
  <div class="tabBar-box">
    <van-tabbar route v-model="active" placeholder  @change="onChange" active-color="#ffbc41" inactive-color="#808188" :border="false" :safe-area-inset-bottom="true">
      <!-- <van-tabbar-item replace to="/home" icon="wap-home">首页</van-tabbar-item> -->
       <van-tabbar-item replace to="/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.homeActive : icon.homeInactive" />
        </template>
      </van-tabbar-item>
       <van-tabbar-item replace to="/myInfo">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? icon.mineActive : icon.mineInactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>  
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'FooterBottom',
  data () {
    return {
      active: 0,
      icon: {
        homeActive: require("@/common/images/home/home-current.png"),
        homeInactive: require("@/common/images/home/home.png"),
        mineActive: require("@/common/images/home/mine-current.png"),
        mineInactive: require("@/common/images/home/mine.png")
      }
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
    background: @color-background;
    .van-tabbar-item {
      background: @color-background;
      .van-tabbar-item__text {
        font-size: 10px !important;
        margin-top: 6px
      }
    } 
  }
}  
</style>