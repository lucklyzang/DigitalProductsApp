<template>
	<div class="content-box">
		<NavBar path="/myOrderForm" title="订单详情"/>
		<div class="content-top">
            <img :src="accountPaidPng" alt="">
			<span>已付款</span>
		</div>
		<div class="content-center">
			<div class="top">
				<div class="img-show">
					<img :src="defaultPersonPng">
				</div>
				<div class="span-show">
					<span>伎乐赋·竖琴赋</span>
					<p>
                        <span>属性一</span>
                        <span>属性一</span>
                        <span>属性一</span>
                        <span>属性一</span>
                        <span>属性一</span>
                    </p>
				</div>
			</div>
			<div class="bottom">
				<div>
					<span>订单金额</span>
					<span>39.90元</span>
				</div>
				<div>
					<span>交易数量</span>
					<span>1</span>
				</div>
				<div>
					<span>创建时间</span>
					<span>2022-04-11 14:03:18</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import NavBar from '@/components/NavBar'
	import {
	} from '@/api/login.js'
	export default {
		components: {
            NavBar
		},
		data() {
			return {
				accountPaidPng: require("@/common/images/home/account-paid.png"),
                defaultPersonPng: require("@/common/images/home/default-person.jpg"),
				canceledPng: require("@/common/images/home/canceled.png"),
				obligationPng: require("@/common/images/home/obligation.png")
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
			])
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
            };
            .van-nav-bar__title {
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
			img {
				width: 100px;
				height: 100px;	
			};
			span {
				&:nth-child(2) {
					font-size: 17px;
					color: #FFFFFF;
					margin-top: 20px;
				};
			}
		};
		.content-center {
			.top {
				width: 94%;
				margin: 0 auto;
				box-sizing: border-box;
				height: 100px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
                align-items: center;
				padding: 0 10px;
				border-radius: 10px;
				background: #100726;
				.img-show {
					width: 70px;
                    height: 70px;
                    border-radius: 6px;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 6px
                    }
				};
				.span-show {
					display: flex;
					flex-direction: column;
                    height: 60px;
					justify-content: flex-start;
					margin-left: 20px;
					flex: 1;
					> span {
						&:nth-child(1) {
							font-size: 17px;
							color: #FFFFFF
						};

					};
                    p {
                        margin-top: 14px;
                        overflow: auto;
                        width: 100%;
                        span {
                            display: inline-block;
                            padding: 0 8px;
                            height: 18px;
                            border: 1px solid #bd69ff;
                            font-size: 10px;
                            border-radius: 10px;
                            box-sizing: border-box;
                            text-align: center;
                            line-height: 18px;
                            color: #bd69ff;
                            margin-right: 4px
                        }
                    }
				}
			};
			.bottom {
				width: 94%;
				margin: 0 auto;
				margin-top: 30px;
                padding: 0 10px;
				border-radius: 10px;
				background: #100726;
                box-sizing: border-box;
				>div {
					display: flex;
					flex-flow: row nowrap;
					justify-content: space-between;
					font-size: 13px;
					color: #FFFFFF;
					line-height: 30px;
                    >span {
                        &:first-child {
                            color: #686868
                        }
                    }
				}
			}
		}
	}
</style>




