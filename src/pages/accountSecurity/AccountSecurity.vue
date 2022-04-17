<template>
  <div class="page-box">
    <NavBar title="账号与安全" path="myInfo" />
    <div class="content-box">
      <div class="content-top">
      	<div class="nick-name">
			<div class="left">
				<span>手机号</span>
			</div>
			<div class="right">
                <span>12121212112</span>
                <van-icon name="arrow" size="15" color="#6c6c6c" />
			</div>
		</div>
        <div class="nick-name" @click="realNameAuthenticationEvent">
			<div class="left">
				<span>实名认证</span>
			</div>
			<div class="right">
                <van-icon name="passed" size="18" color="#69d844" />
                <span>已认证</span>
                <van-icon name="arrow" size="15" color="#6c6c6c" />
			</div>
		</div>
      </div>
      <div class="content-bottom" @click="cancellationEvent">
        <span>账号注销</span>
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
        versionNumber: '1.8',
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
      },

      //实名认证事件
      realNameAuthenticationEvent () {
          this.$router.push({path: '/realNameAuthentication'})
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
			font-size: 13px;
			position: relative;
			display: flex;
			flex-direction: column;
            width: 92%;
			margin: 0 auto;
			margin-top: 20px;
			padding: 6px;
            box-sizing: border-box;
            .nick-name {
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
                align-items: center;
				height: 46px;
				padding: 6px;
                background: #2a1f32;
                border-radius: 10px;
                margin-bottom: 10px;
				.left {
					font-size: 16px;
					color: #FFFFFF;
					display: flex;
                    flex-flow: row nowrap;
					justify-content: space-between;
                    >span {
                        margin-left: 16px;
                    }
				};
				.right {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    span {
                       font-size: 14px;
                       color: #6c6c6c;
                       margin: 0 6px;
                    }
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
            color: #9533db;
            font-size: 15px;
        }
    }
  }
</style>
