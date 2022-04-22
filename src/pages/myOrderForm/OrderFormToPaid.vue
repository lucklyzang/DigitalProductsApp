<template>
	<div class="content-box">
		<NavBar path="/myOrderForm" title="待支付"/>
		<div class="content-center">
            <div class="top">
                <span>未完成</span>
                <van-count-down :time="`${(new Date(orderFormDetails.createTime).getTime() + orderFormDetails.expire*60*1000) - new Date().getTime()}`" format="剩余 mm 分 ss 秒" @finish="cocuntDownEvent"/>
            </div>
			<div class="center">
                <van-loading type="spinner" v-show="loadingShow"/>
				<div class="img-show">
					<img :src="orderFormDetails.imgPath">
				</div>
				<div class="span-show">
					<span>{{orderFormDetails.name}}</span>
					<span>¥ {{orderFormDetails.price}}</span>
				</div>
			</div>
            <div class="bottom">
                <div class="pay-methods">
                    <span>
                        支付方式
                    </span>
                </div>
                <div class="pay-methods-choose-list">
                    <van-radio-group v-model="radio" checked-color="#ffbc41">
                        <van-cell-group>
                            <van-cell clickable @click="radio = '1'">
                                <template #default>
                                    <img :src="weixinPayPng" alt="">
                                    <span>微信支付</span>
                                </template>
                                <template #right-icon>
                                    <van-radio name="1" />
                                </template>
                            </van-cell>
                            <van-cell clickable @click="radio = '2'">
                                 <template #default>
                                    <img :src="alipayPayPng" alt="">
                                    <span>支付宝支付</span>
                                </template>
                                <template #right-icon>
                                    <van-radio name="2" />
                                </template>
                            </van-cell>
                            <van-cell clickable @click="radio = '3'">
                                 <template #default>
                                    <img :src="otherPayPng" alt="">
                                    <span>其它支付</span>
                                </template>
                                <template #right-icon>
                                    <van-radio name="3" />
                                </template>
                            </van-cell>
                        </van-cell-group>
                    </van-radio-group>
                </div>
            </div>
            <div class="tooltip">
                <p>
                    本产品为虚拟内容, 购买后不支持退换、转让, 请斟酌确认
                </p>
            </div> 
		</div>
        <div class="content-bottom">
            <div class="btn-left">
                <span>
                    应付 ¥ {{orderFormDetails.price}}
                </span>
            </div>
            <div class="btn-right">
                <span @click="cancellationOfOrder">取消订单</span>
                <span>确认支付</span>
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
	import {queryOrderDetails,cancelOrder,createPaymentOrder} from '@/api/products.js'
	export default {
		components: {
            NavBar
		},
		data() {
			return {
                loadingShow: false,
                time: '',
                orderFormDetails: {},
                weixinPayPng: require("@/common/images/home/weixin-pay.png"),
                alipayPayPng: require("@/common/images/home/alipay-pay.png"),
                otherPayPng: require("@/common/images/home/other-pay.png"),
                radio: "1"
			}
		},
		onReady() {},
		computed: {
			...mapGetters([
                'orderId'
			])
		},
		mounted() {
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
            },

            // 取消订单
            cancellationOfOrder() {
                this.loadingShow = true;
                cancelOrder(this.orderId).then((res) => {
                    this.loadingShow = false;
                    if (res && res.data.code == 0) {
                       this.$toast({
                            message: '订单取消成功',
                            position: 'bottom'
                        })
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

            // 创建支付订单
            createPaymentOrderEvent () {
                createPaymentOrder({}).then((res) => {
                    if (res && res.data.code == 0) {
                        
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

            // 倒计时结束事件
            cocuntDownEvent () {
                
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
		.content-center {
            flex: 1;
            overflow: auto;
            display: flex;
            flex-direction: column;
            .top {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                width: 94%;
				margin: 0 auto;
                margin-top: 10px;
				box-sizing: border-box;
				height: 26px;
                padding: 0 10px;
                color: black;
                font-size: 13px;
                background-image: linear-gradient(to right, #f1c45f ,#e3901a);
                border-radius: 6px
            };
			.center{
				width: 94%;
				margin: 0 auto;
                margin-top: 10px;
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
					justify-content: space-between;
					margin-left: 20px;
					flex: 1;
					> span {
						&:nth-child(1) {
							font-size: 16px;
							color: #FFFFFF
						};
                        &:nth-child(2) {
							font-size: 19px;
							color: #FFFFFF;
                            font-weight: bold;
                            text-align: right
						}
					}
				}
			};
            .bottom {
                width: 94%;
				margin: 0 auto;
                margin-top: 10px;
				display: flex;
				border-radius: 10px;
				background: #100726;
                flex-flow: column;
                .pay-methods {
                    height: 60px;
                    width: 100%;
                    line-height: 60px;
                    color: #686868;
                    font-size: 16px;
                    .bottom-border-1px(#413951);
                    span {
                        margin-left: 10px
                    }
                };
                .pay-methods-choose-list {
                    /deep/ .van-radio-group {
                        .van-cell-group {
                            background: transparent !important;
                            .van-cell {
                                background: transparent !important;
                                height: 55px;
                                .van-cell__value {
                                    color: #fff;
                                    display: flex;
                                    flex-flow: row nowrap;
                                    align-items: center;
                                    img {
                                        width: 22px;
                                        height: 20px;
                                        margin-right: 6px
                                    }
                                }
                            };
                            .van-cell:after {
                                content: none
                            }
                        };
                        .van-hairline--top-bottom:after {
                            content: none
                        }
                    }
                }
            };
            .tooltip {
                width: 100%;
                text-align: center;;
                margin-top: 20px;
                font-size: 10px;
                color: #686868
            }
		};
        .content-bottom{
            width: 94%;
            margin: 0 auto;
            margin-top: 30px;
            padding: 0 10px;
            border-radius: 10px;
            background: #100726;
            box-sizing: border-box;
            display: flex;
            height: 60px;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: #FFFFFF;
            background: #00020f;
            .btn-left {
                >span {
                    display: inline-block;
                    &:first-child {
                        color: #fff;
                        font-size: 20px
                    }
                }    
            };
            .btn-right {
                >span {
                    display: inline-block;
                    &:first-child {
                        color: #686868;
                        width: 90px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        border-radius: 20px;
                        background: #00020f
                    }
                    &:last-child {
                        color: black;
                        width: 90px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        border-radius: 20px;
                        background: #ffbc41;
                        margin-left: 4px
                    }
                }
            } 
        }
	}
</style>




