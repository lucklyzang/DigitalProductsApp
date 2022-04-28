<template>
  <div class="page-box">
    <NavBar title="账号与安全" path="myInfo" />
    <!-- 是否注销确认框 -->
    <van-dialog v-model="isShowLogout" :show-cancel-button="true"  :close-on-popstate="false" title="确定注销?"
      @confirm="logoutSureEvent" 
      @cancel="logoutCancelEvent"
    />
    <div class="content-box">
      <div class="content-top">
      	<div class="nick-name">
			<div class="left">
				<span>手机号</span>
			</div>
			<div class="right">
        <span>{{userInfo.mobile}}</span>
        <img :src="arrowRightPng" alt="">
			</div>
		</div>
    <div class="nick-name" @click="realNameAuthenticationEvent">
			<div class="left">
				<span>实名认证</span>
			</div>
			<div class="right">
        <van-icon name="passed" size="18" color="#39ef39" v-show="userInfo.realFlag == 1"/>
        <span>{{userInfo.realFlag == 1 ? '已认证' : '去认证'}}</span>
        <img :src="arrowRightPng" alt="">
			</div>
		</div>
      </div>
      <div class="content-bottom" @click="isShowLogout = true">
        <span>账号注销</span>
      </div>
    </div>
  </div>
</template>
<script>
  import NavBar from '@/components/NavBar'
  import NoData from '@/components/NoData'
  import Loading from '@/components/Loading'
  import {inquareUserInfo} from '@/api/products.js'
  import {cancellatio,logout} from '@/api/login.js'
  import { mapGetters, mapMutations } from 'vuex'
  import {IsPC} from '@/common/js/utils'
  export default {
    name: 'Home',
    components:{
      NoData,
      Loading,
	  NavBar
    },
    data() {
      return {
        loadingShow: false,
        isShowLogout: false,
        defaultPersonPng: require("@/common/images/home/default-person.jpg"),
        arrowRightPng: require("@/common/images/login/arrow-right.png")
      }
    },

    mounted() {
      // 控制设备物理返回按键
      if (!IsPC()) {
        pushHistory();
        this.gotoURL(() => {
          pushHistory();
          this.$router.push({
            path: '/myInfo'
          })
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
        'storeUserInfo',
        'changeIsLogin'
      ]),

      // 弹框确定注销
      logoutSureEvent () {
        this.isShowPaySuccess = false;
        this.cancellationEvent()
      },

      //  弹框取消注销
      logoutCancelEvent () {
        this.isShowPaySuccess = false
      },

      //账号注销事件
      cancellationEvent () {
        cancellatio().then((res) => {
          if (res && res.data.code == 0) {
            this.$toast({
              message: '账号注销成功',
              position: 'bottom'
            });
            this.logoutEvent();
          } else {
            this.$dialog.alert({
              message: `${res.data.msg}`,
              closeOnPopstate: true
            }).then(() => {
            });
          }
        })
        .catch((err) => {
          this.$dialog.alert({
            message: `${err.message}`,
            closeOnPopstate: true
          }).then(() => {
          })
        })
      },

       //退出登录事件
      logoutEvent () {
        this.loadingShow = true;
        logout().then((res) => {
          this.loadingShow = false;
          if (res && res.data.code == 0) {
              this.queryuserInfo();
              this.changeIsLogin(false);
              // 清空store和localStorage
              this.$store.commit('resetFabricState');
              this.$store.commit('resetLoginState');
              window.localStorage.clear()
            } else {
                this.$dialog.alert({
                message: `${res.data.msg}`,
                closeOnPopstate: true
                }).then(() => {
                })
            }
        })
        .catch((err) => {
            this.loadingShow = false;
                this.$dialog.alert({
                message: `${err.message}`,
                closeOnPopstate: true
                }).then(() => {
            })
        })
      },

      // 查询用户信息
      queryuserInfo() {
          inquareUserInfo().then((res) => {
            if (res && res.data.code == 0) {
              this.storeUserInfo(res.data.data);
              this.$router.push({path: '/myInfo'});
            } else {
              this.$dialog.alert({
                message: `${res.data.msg}`,
                closeOnPopstate: true
              }).then(() => {})
            }
        })
        .catch((err) => {
          this.$dialog.alert({
              message: `${err.message}`,
              closeOnPopstate: true
          }).then(() => {})
        })
      },

      //实名认证事件
      realNameAuthenticationEvent () {
          // 未认证
          if (this.userInfo.realFlag != 1) {
            this.$router.push({path: '/realNameAuthentication'})
          } else {
            //已认证
            this.$router.push({path: '/realNameAythenticationCertified'})
          }
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
      background: @color-background;
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
                background: @color-block;
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
                    align-items: center;
                    span {
                       font-size: 14px;
                       color: #514a60;
                       margin: 0 10px;
                    };
                    img {
                      width: 8px
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
            background: @color-block;
            color: #bd68ff;
            font-size: 15px;
        }
    }
  }
</style>
