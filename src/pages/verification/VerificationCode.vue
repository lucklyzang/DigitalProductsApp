<template>
	<div class="content-box">
        <NavBar path="/" />
		<div class="content-top">
			<span>请输入验证码</span>
			<span>已发送到手机号 {{phoneNumber}}</span>
			<span v-show="showCountDownTime">
				<van-count-down :time="time" format="ss" @finish="countDownEnd" />
				<span>s后重新发送</span>
			</span>
		</div>
		<div class="content-center">
			<div>
                <van-field class="uni-input" v-model="codeOne" @input="inputEventOne" maxlength="1" type="number"/>
			</div>
			<div>
				<van-field class="uni-input" v-model="codeTwo" @input="inputEventTwo" maxlength="1" type="number"/>
			</div>
			<div>
				<van-field class="uni-input" v-model="codeThree" @input="inputEventThree" maxlength="1" type="number"/>
			</div>
			<div>
				<van-field class="uni-input" v-model="codeFour" @input="inputEventFour" maxlength="1" type="number"/>
			</div>
			<div>
				<van-field class="uni-input" v-model="codeFive" @input="inputEventFive" maxlength="1" type="number"/>
			</div>
			<div>
				<van-field class="uni-input" v-model="codeSix" @input="inputEventSix" maxlength="1" type="number"/>
			</div>
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
		phoneAuthCodeLogin
	} from '@/api/login.js'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				time: 60000,
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
			])
		},
		mounted() {
			this.phoneNumber = this.$route.params.phoneNumber
		},
		methods: {
			...mapMutations([
				'changeToken',
				'changeIsLogin'
			]),

			// 输入框变化事件
			inputEventOne (event) {},
			inputEventTwo (event) {},
			inputEventThree (event) {},
			inputEventFour (event) {},
			inputEventFive (event) {},
			inputEventSix (event) {
				if (!this.codeSix) {return};
				if (this.codeOne && this.codeTwo && this.codeThree && this.codeFour && this.codeFive) {
					let code = `${this.codeOne}${this.codeTwo}${this.codeThree}${this.codeFour}${this.codeFive}${this.codeSix}`
					this.phoneCodeLogin(code)
				}
			},

			// 手机验证码登录
			phoneCodeLogin (code) {
				phoneAuthCodeLogin({
					mobile: this.phoneNumber,
  					password: code
				}).then((res) => {
					if (res && res.data.code == 0) {
						this.changeToken(res.data.token);
						this.changeIsLogin(true);
						this.$router.push({name:'home'})
					} else {
						this.$dialog.alert({
							message: `${res.data.msg}`,
							closeOnPopstate: true
						}).then(() => {
						})
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
	.content-box {
		.content-wrapper();
        background: @color-background;
        /deep/ .van-nav-bar {
            .van-icon {
                color: #fff !important;
                font-size: 24px !important
            }
        };
		.content-top {
			height: 200px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			span {
				&:nth-child(1) {
					font-size: 30px;
					color: #FFFFFF
				};
				&:nth-child(2) {
					margin: 10px 0;
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
						color: #ab7a90;
					};
					/deep/ .van-count-down {
						font-size: 12px;
						color: #ab7a90
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
                .bottom-border-1px(#ffffff);
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
		}
	}
</style>





