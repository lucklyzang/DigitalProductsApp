<template>
	<div class="content-box">
        <NavBar path="/" />
		<div class="content-top">
			<span>请输入验证码</span>
			<span>已发送到手机号 134******47</span>
			<span>58s后重新发送</span>
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
		setCache,
		removeAllLocalStorage
	} from '@/common/js/utils'
	import {
	} from '@/api/login.js'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				codeOne: '',
				codeTwo: '',
				codeThree: '',
				codeFour: ''
			}
		},
		onReady() {},
		computed: {
			...mapGetters([
			])
		},
		mounted() {
		},
		methods: {
			...mapMutations([
			]),
			inputEventOne (event) {},
			inputEventTwo (event) {},
			inputEventThree (event) {},
			inputEventFour (event) {}
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
					font-size: 12px;
					color: #ab7a90
				}
			}
		};
		.content-center {
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			margin-top: 30px;
			> div {
				width: 50px;
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
                    .van-field__control {
                        color: #fff !important;
                        text-align: center !important
                    }
				}
			}
		}
	}
</style>





