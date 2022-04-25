<template>
  <div class="content-box">
	  	<NavBar :path="path" />
		<div class="content-top">
			<span>登录某某</span>
			<span>发现有趣</span>
		</div>
		<div class="content-middle">
			<div class="phone-number">
				<van-field class="uni-input" v-model="phoneNumber" @input="inputEvent" type="tel" placeholder="请输入手机号码" />
			</div>
			<div class="send-auth-box" @click="loginToIndex" :class="{'sendAuthBoxStyle': !checked || !phoneNumberUsable}">
				<span>发送短信验证码</span>
			</div>
			<div class="tip-info">
				<van-checkbox v-model="checked">
					<template #icon="props">
						<img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
					</template>
					<template #default>
						<span>已阅读并同意</span>
						<span>《用户协议》</span>
						<span>和</span>
						<span>《隐私协议》</span>
					</template>
				</van-checkbox>
			</div>
		</div>
		<div class="content-bottom">
			<div>
				<span>
					微信登录
				</span>
			</div>
			<div @click="weixinAuthEvent">
				<img :src="weixinPng">
			</div>
		</div>
	</div>
</template>

<script>
import {sendPhoneAuthCode} from '@/api/login.js'
import { mapGetters, mapMutations } from 'vuex'
import NavBar from '@/components/NavBar'
import { setStore, getStore, IsPC,} from '@/common/js/utils'
export default {
  name: 'Login',
  components: {
	NavBar
  },
  data () {
    return {
      phoneNumber: '',
	  path: '',
      loadingspan: '登录中,请稍候···',
      showLoadingHint: false,
	  checked: true,
	  phoneNumberUsable: false,
      weixinPng: require("@/common/images/login/weixin-login.png"),
	  activeIcon: require("@/common/images/login/agree-checked.png"),
      inactiveIcon: require("@/common/images/login/agree-default.png")
    }
  },

  watch: {
	  checked (newVal,oldVal) {
		if (!this.checked) {
			this.$toast({
				message: '请阅读并同意协议',
				position: 'bottom'
			})
		}	  
	  }
  },

  computed: {
    ...mapGetters([
    ])
  },

   beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.path = from.path
      })
    },

  mounted () {
    // 控制设备物理返回按键
    if (!IsPC()) {
      let that = this;
      pushHistory()
      that.gotoURL(() => {
        pushHistory();
        this.$router.push({path: '/'});  //输入要返回的上一级路由地址
      });
    };
    // 监控键盘弹起
    let originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.onresize = ()=> {
      let resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if (resizeHeight < originalHeight) {
        return (()=>{
          this.$refs['bgIconWrapper'].style.cssspan='flex:none;height:220px'
        })()
      } else {
        this.$refs['bgIconWrapper'].style.cssspan='flex:1;height:0'
      }
    };
  },

  methods: {
    ...mapMutations([
      'storeUserInfo',
      'changeTitleTxt',
      'changeOverDueWay'
    ]),
    // 输入框值改变事件
    inputEvent (value) {
		let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
		if (!myreg.test(value)) {
			this.phoneNumberUsable = false;
			if (value.length >= 11) {
				this.$toast({
					message: '手机号格式有误,请重新输入!',
					position: 'bottom'
				})
			}	
		} else {
			this.phoneNumberUsable = true;
			if (!this.checked) {
				this.$toast({
					message: '请阅读并同意协议',
					position: 'bottom'
				})
			}	  
		}
    },
	//微信登录
	weixinAuthEvent () {
		this.$router.push({path:'/weixinLogin'})
	},
    // 验证码
    loginToIndex () {
		if (!this.checked || !this.phoneNumberUsable) {
			return
		};
		this.sendCode()
    },

	// 发送验证码
	sendCode () {
		sendPhoneAuthCode(this.phoneNumber).then((res) => {
			if (res && res.data.code == 0) {
				this.$router.push({name:'verificationCode',params: {phoneNumber: this.phoneNumber}})
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
	}
  }
}
</script>
<style lang="less" scoped>
@import "../common/stylus/variable.less";
@import "../common/stylus/mixin.less";
@import "../common/stylus/modifyUi.less";
   .content-box {
    .content-wrapper();
    background: @color-background;
	background: @color-background;
        /deep/ .van-nav-bar {
            .van-icon {
                color: #fff !important;
                font-size: 24px !important
            }
        };
		.content-top {
			height: 35vh;
			line-height: 35vh;
			width: 80%;
			margin: 0 auto;
			span {
				font-size: 26px;
				font-weight: bold;
				&:first-child {
					color: #ebebeb;
					margin-right: 20px;
				};
				&:last-child {
					color: #686868
				}
			}
		};
		.content-middle {
			width: 80%;
			margin: 0 auto;
			.phone-number {
        .bottom-border-1px(#343544,3px);
        /deep/ .uni-input {
					color: #fff;
					height: 50px;
					font-size: 18px;
          background: transparent;
          .van-field__value {
            font-size: 18px
          };
          .van-field__body {
            .van-field__control {
              color: #fff
            }
          }
				}
			};
			.send-auth-box {
				height: 50px;
				border-radius: 30px;
				font-size: 18px;
				background: #ffbd40;
				margin: 30px 0;
				text-align: center;
				line-height: 50px;
				color: #1e1d1c;
			};
			.sendAuthBoxStyle {
				background: #7e7e7e
			};
			.tip-info {
				font-size: 12px;
				text-align: center;
				/deep/ .van-checkbox {
					justify-content: center;
					.van-checkbox__icon {
						img {
							width: 17px;
						}
					};
					.van-checkbox__label {
						>span {
							&:nth-child(1) {
								color: #686868
							};
							&:nth-child(2) {
								color: #FFFFFF
							};
							&:nth-child(3) {
								color: #686868
							};
							&:nth-child(4) {
								color: #FFFFFF
							};
						}
					}
				}
			}
		};		
		.content-bottom {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			>div {
				&:first-child {
					font-size: 12px;
					color: #b2b2b0;
					margin-bottom: 20px
				};
				&:last-child {
					width: 44px;
					border-radius: 50%;
					img {
						width: 100%;
						border-radius: 50%;
					}
				}
			}
		}
  }
</style>
