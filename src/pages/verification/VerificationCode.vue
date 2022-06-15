<template>
	<div class="content-box" id="top-content">
        <NavBar path="/login" />
		<div class="content-top">
			<span>请输入验证码</span>
			<span>已发送到手机号 {{phoneNumber}}</span>
			<span v-show="showCountDownTime">
				<van-count-down :time="countdownTime - new Date().getTime()" format="ss" @finish="countDownEnd" />
				<span>s后重新发送</span>
			</span>
		</div>
		<div class="content-center">
			<div>
                <van-field class="uni-input" ref="inputOne" v-model="codeOne" @input="inputEventOne" maxlength="1" type="number"/>
			</div>
			<div>
				<van-field class="uni-input" ref="inputTwo" v-model="codeTwo" @input="inputEventTwo" maxlength="1" type="number"/>
			</div>
			<div>
				<van-field class="uni-input" ref="inputThree" v-model="codeThree" @input="inputEventThree" maxlength="1" type="number"/>
			</div>
			<div>
				<van-field class="uni-input" ref="inputFour" v-model="codeFour" @input="inputEventFour" maxlength="1" type="number"/>
			</div>
			<div>
				<van-field class="uni-input" ref="inputFive" v-model="codeFive" @input="inputEventFive" maxlength="1" type="number"/>
			</div>
			<div>
				<van-field class="uni-input" ref="inputSix" v-model="codeSix" @input="inputEventSix" maxlength="1" type="number"/>
			</div>
		</div>
		<div class="hide-input">
			<van-field v-model="hideInput" autocomplete="one-time-code" @input="hideInputEvent" maxlength="6" type="text"/>
		</div>
	</div>
</template>

<script>
	import NavBar from '@/components/NavBar'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import {
		phoneAuthCodeLogin,
		getAppId
	} from '@/api/login.js'
	 import {
        inquareUserInfo
    } from '@/api/products.js'
	export default {
		name: 'VerificationCode',
		components: {
			NavBar
		},
		data() {
			return {
				hideInput: '',
				getCode: '',
				codeOne: '',
				codeTwo: '',
				codeThree: '',
				codeFour: '',
				codeFive: '',
				codeSix: '',
				phoneNumber: '',
				showCountDownTime: true
			}
		},
		onReady() {},
		computed: {
			...mapGetters([
				'countdownTime',
				'inviteMessage'
			])
		},
		mounted() {
			this.toTop();
			// 控制设备物理返回按键
			if (!IsPC()) {
				pushHistory();
				this.gotoURL(() => {
					pushHistory();
					this.$router.push({
						path: '/login'
					})
				});
			};
			// 提供给原生app调用的方法
			let me = this;
			window['sendMessageAuthenticationCode'] = (val) => {
				me.sendMessageAuthenticationCode(val);
			};
			this.phoneNumber = this.$route.params.phoneNumber;
			this.$refs.inputOne.focus()
		},
		methods: {
			...mapMutations([
				'changeToken',
				'changeIsLogin',
				'changeIsTokenExpired',
				'storeUserInfo',
				'changeAppId'
			]),

			// 获取原生传递的值
			sendMessageAuthenticationCode (val) {
				if (val.length == 6) {
					this.getCode = val;
					this.codeOne = this.getCode[0];
					this.codeTwo = this.getCode[1];
					this.codeThree = this.getCode[2];
					this.codeFour = this.getCode[3];
					this.codeFive =  this.getCode[4];
					this.codeSix =  this.getCode[5]
				}
			},

			//让页面滚动到顶部
			toTop() {
				document.querySelector('#top-content').scrollIntoView(true)
			},

			// 隐藏输入框的值变化事件
			hideInputEvent (value) {
				this.hideInput = value;
				this.codeOne = this.hideInput[0];
				this.codeTwo = this.hideInput[1];
				this.codeThree = this.hideInput[2];
				this.codeFour = this.hideInput[3];
				this.codeFive =  this.hideInput[4];
				this.codeSix =  this.hideInput[5]
			},

			// 输入框变化事件
			inputEventOne (event) {
				if (event) {
					this.$refs.inputOne.blur();
					this.$refs.inputTwo.focus()
				}
			},
			inputEventTwo (event) {
				if (event) {
					this.$refs.inputTwo.blur();
					this.$refs.inputThree.focus()
				}
			},
			inputEventThree (event) {
				if (event) {
					this.$refs.inputThree.blur();
					this.$refs.inputFour.focus()
				}
			},
			inputEventFour (event) {
				if (event) {
					this.$refs.inputFour.blur();
					this.$refs.inputFive.focus()
				}
			},
			inputEventFive (event) {
				if (event) {
					this.$refs.inputFive.blur();
					this.$refs.inputSix.focus()
				}
			},
			inputEventSix (event) {
				if (!this.codeSix) {return};
				this.$refs.inputSix.blur();
				if (this.codeOne && this.codeTwo && this.codeThree && this.codeFour && this.codeFive) {
					let code = `${this.codeOne}${this.codeTwo}${this.codeThree}${this.codeFour}${this.codeFive}${this.codeSix}`
					this.phoneCodeLogin(code)
				}
			},

			// 手机验证码登录
			phoneCodeLogin (code) {
				phoneAuthCodeLogin({
					mobile: this.phoneNumber,
  					password: code,
					inviteType: this.inviteMessage ? this.inviteMessage['inviteType'] : '',
  					inviteId: this.inviteMessage ? this.inviteMessage['inviteId'] : ''
				}).then((res) => {
					if (res && res.data.code == 0) {
						this.changeToken(res.data.token);
						this.queryuserInfo();
						this.changeIsLogin(true);
						this.changeIsTokenExpired(false);
					} else {
						this.codeOne = '';
						this.codeTwo = '';
						this.codeThree = '';
						this.codeFour = '';
						this.codeFive = '';
						this.codeSix = '';
						this.$toast({
                            message: `${res.data.msg}`,
                            position: 'bottom'
                        })
					}
				})
				.catch((err) => {
					this.codeOne = '';
					this.codeTwo = '';
					this.codeThree = '';
					this.codeFour = '';
					this.codeFive = '';
					this.codeSix = '';
					this.$toast({
						message: `${err.message}`,
						position: 'bottom'
					})
				})
			},
			
			// 查询用户信息
            queryuserInfo() {
                inquareUserInfo().then((res) => {
					if (res && res.data.code == 0) {
						this.storeUserInfo(res.data.data);
						this.getAppIdEvent()
					} else {
						this.$toast({
							message: `${res.data.msg}`,
							position: 'bottom'
						})
					}
				})
				.catch((err) => {
					this.$toast({
						message: `${err.message}`,
						position: 'bottom'
					})
				})
            },

			//获取appId
			getAppIdEvent() {
                getAppId().then((res) => {
					if (res && res.data.code == 0) {
						this.changeAppId(res.data.data);
						this.$router.push({name:'home'})
					} else {
						this.$toast({
							message: `${res.data.msg}`,
							position: 'bottom'
						})
					}
				})
				.catch((err) => {
					this.$toast({
						message: `${err.message}`,
						position: 'bottom'
					})
				})
            },


			//倒计时结束事件
			countDownEnd () {
				this.showCountDownTime = false
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "~@/common/stylus/variable.less";
    @import "~@/common/stylus/mixin.less";
    @import "~@/common/stylus/modifyUi.less";
	// 去除自动填充的输入框黄色背景
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-transition-delay: 9999s;
		-webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
	};
	.content-box {
		.content-wrapper();
        background: @color-background;
        /deep/ .van-nav-bar {
            .van-icon {
                color: #fff !important;
                font-size: 18px !important
            }
        };
		.content-top {
			height: 200px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			> span {
				&:nth-child(1) {
					font-size: 30px;
					color: #FFFFFF
				};
				&:nth-child(2) {
					margin: 20px 0 10px 0;
					font-size: 12px;
					color: #686868
				};
				&:nth-child(3) {
					display: flex;
					flex-flow: row nowrap;
					justify-content: center;
					align-items: center;
					>span {
						font-size: 12px;
						color: #a53d3d;
					};
					/deep/ .van-count-down {
						font-size: 12px;
						color: #a53d3d
					}
				}
			}
		};
		.content-center {
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			margin-top: 30px;
			> div {
				width: 40px;
				margin-right: 16px;
                .bottom-border-1px(#6e6e6e,5px);
				&:last-child {
					margin-right: 0;
				};
				/deep/ .uni-input {
					color: #fff;
					height: 50px;
					text-align: center;
					font-size: 18px;
                    background: transparent;
					padding: 0 !important;
                    .van-field__control {
                        color: #fff !important;
                        text-align: center !important
                    };
					.van-cell__value {
						display: flex
					}
				}
			}
		};
		.hide-input {
			width: 1px;
			height: 1px;
			/deep/ .van-cell {
				background: transparent;
				.van-field__control {
					color: transparent !important
				}
			}
		}
	}
</style>





