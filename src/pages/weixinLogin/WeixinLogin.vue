<template>
  <div class="content-box">
		<NavBar path="/" />
		<div class="content-top">
			<span>登录某某</span>
			<span>发现有趣</span>
		</div>
		<div class="content-middle">
			<div class="tip-info">
        		<van-icon name="checked" size="15" color="#bc8c51"/>
				<span>已阅读并同意</span>
				<span>《用户协议》</span>
				<span>和</span>
				<span>《隐私协议》</span>
			</div>
			<div class="send-auth-box" @click="weixinLogin">
				<van-icon name="chat-o" size="30" color="#18c618"/>
				<span>微信快速登录</span>
			</div>
		</div>
		<div class="content-bottom">
			<div>
				<span>
					其它登录方式
				</span>
			</div>
			<div @click="otherAuthEvent">
				<img :src="weixinPng">
			</div>
		</div>
	</div>
</template>

<script>
import {logIn} from '@/api/login.js'
import { mapGetters, mapMutations } from 'vuex'
import Loading from '@/components/Loading'
import NavBar from '@/components/NavBar'
import { setStore, getStore, IsPC, scanCode } from '@/common/js/utils'
export default {
  name: 'Login',
  components: {
    Loading,
	NavBar
  },
  data () {
    return {
      loadingspan: '登录中,请稍候···',
      showLoadingHint: false,
      weixinPng :require("@/common/images/login/weixin.png")
    }
  },

  watch: {
  },

  computed: {
    ...mapGetters([
    ])
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
	//其它方式登录
	otherAuthEvent () {
		this.$router.push({path:'/home'})
	},
    // 验证码
    weixinLogin () {
      this.$router.push({path:'/verificationCode'})
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/stylus/variable.less";
@import "~@/common/stylus/mixin.less";
@import "~@/common/stylus/modifyUi.less";
   .content-box {
    .content-wrapper();
	/deep/ .van-nav-bar {
		.van-icon {
			color: #fff !important;
			font-size: 24px !important
		}
	};
    background: #252525;
		.content-top {
			height: 40vh;
			line-height: 40vh;
			width: 80%;
			margin: 0 auto;
			span {
				font-size: 26px;
				font-weight: bold;
				&:first-child {
					color: #FFFFFF;
					margin-right: 20px;
				};
				&:last-child {
					color: #747474
				}
			}
		};
		.content-middle {
			width: 80%;
			margin: 0 auto;
			.send-auth-box {
				height: 50px;
				border-radius: 30px;
				font-size: 18px;
				background: #ffba3a;
				margin: 30px 0;
				text-align: center;
				line-height: 50px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: center;
				align-items: center;
				/deep/ .van-icon {
					margin-right: 8px
				}
			};
			.tip-info {
				font-size: 12px;
				text-align: center;
				.van-icon {
					margin-right: 6px
				};
				span {
					&:nth-child(2) {
						color: #646464
					};
					&:nth-child(3) {
						color: #dbdbdb
					};
					&:nth-child(4) {
						color: #646464
					};
					&:nth-child(5) {
						color: #dbdbdb
					};
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
					color: #757575;
					margin-bottom: 20px
				};
				&:last-child {
					width: 44px;
					height: 44px;
					border-radius: 50%;
					img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
			}
		}
  }
</style>
