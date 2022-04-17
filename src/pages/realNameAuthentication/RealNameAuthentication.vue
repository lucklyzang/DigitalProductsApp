<template>
  <div class="page-box">
    <NavBar title="实名认证" path="accountSecurity" />
    <div class="content-box">
      <div class="content-top">
        <van-field
            v-model="realNameValue"
            placeholder="真实姓名"
            :border="false"
        />
            <van-field
            v-model="cardValue"
            placeholder="证件号码"
            :border="false"
        />
      </div>
      <div class="content-bottom" @click="cancellationEvent">
        <span>开始认证</span>
      </div>
    </div>
  </div>
</template>
<script>
  import NavBar from '@/components/NavBar'
  import NoData from '@/components/NoData'
  import Loading from '@/components/Loading'
  import store from '@/store'
  import { mapGetters, mapMutations } from 'vuex'
  import { formatTime, setStore, getStore, removeStore, IsPC} from '@/common/js/utils'
  let windowTimer
  export default {
    name: 'Home',
    components:{
      NoData,
      Loading,
	  NavBar
    },
    data() {
      return {
        noDataShow: false,
        showLoadingHint: false,
        realNameValue: '',
        cardValue: '',
        defaultPersonPng :require("@/common/images/home/default-person.jpg"),
      }
    },

    mounted() {
      // 控制设备物理返回按键
      if (!IsPC()) {
        pushHistory();
        this.gotoURL(() => {
        })
      }
    },

    watch: {
    },

    computed:{
      ...mapGetters([
        'userInfo'
      ])
    },

    beforeRouteEnter (to, from, next) {
      next()
    },

    beforeRouteLeave (to, from, next) {
      next()
    },

    methods:{
      ...mapMutations([
        'changeTitleTxt'
      ]),

      juddgeIspc () {
        return IsPC()
      },

      //账号注销事件
      cancellationEvent () {
          this.$router.push({path: '/'})
      }
    }
  }
</script>
<style lang='less' scoped>
  @import "~@/common/stylus/variable.less";
  @import "~@/common/stylus/mixin.less";
  @import "~@/common/stylus/modifyUi.less";
  .page-box {
    .content-wrapper();
     /deep/ .van-nav-bar {
        .van-icon {
            color: #fff !important;
            font-size: 24px !important
        };
        .van-nav-bar__title {
            color: #fff !important;
            font-size: 18px !important
        }
    };
    .content-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      background: #252525;
		.content-top {
			height: 300px;
			position: relative;
			display: flex;
			flex-direction: column;
            width: 92%;
			margin: 0 auto;
			margin-top: 20px;
			padding: 6px;
            box-sizing: border-box;
            /deep/ .van-cell {
                margin-bottom: 8px;
                background: #2a1f32;
                height: 55px;
                border: 1px solid #2c2c2c;
                border-radius: 10px;
                .van-field__control {
                    color: #fff
                }
            }
		};
        .content-bottom {
            width: 92%;
			margin: 0 auto;
			border-radius: 10px;
            box-sizing: border-box;
            padding: 6px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            height: 55px;
            background: #2a1f32;
            color: #cca45b;
            font-size: 15px;
        }
    }
  }
</style>
