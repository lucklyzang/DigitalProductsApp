<template>
	<div class="content-box">
		<NavBar path="/myOrderForm" title="订单详情"/>
		<div class="content-top">
            <img :src="orderFormDetails.status == 1 ? accountPaidPng : canceledPng " alt="">
			<span>{{orderFormDetails.status == 1 ? '已支付' : '已取消'}}</span>
		</div>
		<div class="content-center">
			<div class="top">
				<div class="img-show">
					<img :src="orderFormDetails.imgPath">
				</div>
				<div class="span-show">
					<span>{{orderFormDetails.name}}</span>
					<p>
                        {{orderFormDetails.pubName}}
                    </p>
				</div>
			</div>
			<div class="bottom">
				<div>
					<span>订单金额</span>
					<span>{{orderFormDetails.price}}元</span>
				</div>
				<div>
					<span>交易数量</span>
					<span>1</span>
				</div>
				<div>
					<span>创建时间</span>
					<span>{{orderFormDetails.createTime}}</span>
				</div>
			</div>
		</div>
		<van-loading type="spinner" v-show="loadingShow"/>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import NavBar from '@/components/NavBar'
	import {queryOrderDetails} from '@/api/products.js'
	export default {
		components: {
            NavBar
		},
		data() {
			return {
				loadingShow: false,
				orderFormDetails: {},
				accountPaidPng: require("@/common/images/home/account-paid.png"),
				canceledPng: require("@/common/images/home/canceled.png")
			}
		},
		onReady() {},
		computed: {
			...mapGetters([
				'orderId'
			])
		},
		mounted() {
			// 控制设备物理返回按键
            if (!IsPC()) {
                pushHistory();
                this.gotoURL(() => {
                pushHistory();
                    this.$router.push({
                        path: '/myOrderForm'
                    })
                })
            };
			this.inquareOrderDetails(this.orderId)
		},
		methods: {
			...mapMutations([
			]),
			// 查询订单详情
            inquareOrderDetails(id) {
                this.loadingShow = true;
                queryOrderDetails(id).then((res) => {
                    this.loadingShow = false;
                    if (res && res.data.code == 0) {
                       this.orderFormDetails = res.data.data
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
				background: @color-block;
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
					justify-content: space-between;
					margin-left: 20px;
					flex: 1;
					width: 0;
					> span {
						.no-wrap();
						font-size: 17px;
						color: #FFFFFF
					};
                    p {
                        .no-wrap();
						font-size: 12px;
						color: #686868;
                    }
				}
			};
			.bottom {
				width: 94%;
				margin: 0 auto;
				margin-top: 30px;
                padding: 0 10px;
				border-radius: 10px;
				background: @color-block;
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




