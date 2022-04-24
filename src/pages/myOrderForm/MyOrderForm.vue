<template>
	<div class="content-box">
		<NavBar path="/myInfo" title="我的订单"/>
		<div class="content-top">
			<van-sticky :offset-top="46">
				<div class="tab-switch" :animation="animationData">
					<span v-for="(item,index) in tabTitlelList" :key="index" @click="tabSwitchEvent(index)"
						:class="{'active-tab-style': index === currentTabIndex }"
					>
						{{
							item.name
						}}
					</span>
				</div>
			</van-sticky>	
		</div>
		<div class="content-bottom">
			<van-loading type="spinner" v-show="loadingShow"/>
        	<van-empty :description="descriptionContent" v-show="emptyShow" />
			<div class="all-order" v-show="currentTabIndex === 0">
				<div class="order-list" @click="orderDetailsEvent(item)" v-for="(item,index) in orderList" :key="index">
					<div class="left">
						<div class="img-show">
							<img :src="item.collectionUrl">
						</div>
						<div class="span-show">
							<span>{{item.collectionName}}</span>
                            <p>
                             {{item.pubName}}
                            </p>
							<span>{{item.collectionPrice}}</span>
						</div>
					</div>
					<div class="right">
						<div>
							<span :class="[item.collectionStatus=='1'?'spanPaiedStyle':item.collectionStatus=='-1'? 'spanCancelStyle':'']">{{payStatusTransfer(item.collectionStatus)}}</span>
						</div>
						<div v-show="item.collectionStatus == '0'">
							<span>
								去付款
							</span>
						</div>
					</div>
				</div>
				<div class="no-more-data">
					<span>没有更多数据</span>
				</div>
			</div>
            <div class="all-order to-pay" v-show="currentTabIndex === 1">
                <div class="order-list" @click="orderDetailsEvent(item)" v-for="(item,index) in orderList" :key="index">
					<div class="left">
						<div class="img-show">
							<img :src="item.collectionUrl">
						</div>
						<div class="span-show">
							<span>{{item.collectionName}}</span>
                            <p>
                              {{item.pubName}}
                            </p>
							<span>{{item.collectionPrice}}</span>
						</div>
					</div>
					<div class="right">
						<div>
							<span :class="[item.collectionStatus=='1'?'spanPaiedStyle':item.collectionStatus=='-1'? 'spanCancelStyle':'']">{{payStatusTransfer(item.collectionStatus)}}</span>
						</div>
						<div v-show="item.collectionStatus == '0'">
							<span>
								去付款
							</span>
						</div>
					</div>
				</div>
				<div class="no-more-data">
					<span>没有更多数据</span>
				</div>
            </div>
            <div class="all-order to-pay" v-show="currentTabIndex === 2">
                <div class="order-list" @click="orderDetailsEvent(item)" v-for="(item,index) in orderList" :key="index">
					<div class="left">
						<div class="img-show">
							<img :src="item.collectionUrl">
						</div>
						<div class="span-show">
							<span>{{item.collectionName}}</span>
                            <p>
                              {{item.pubName}}
                            </p>
							<span>{{item.collectionPrice}}</span>
						</div>
					</div>
					<div class="right">
						<div>
                           <span :class="[item.collectionStatus=='1'?'spanPaiedStyle':item.collectionStatus=='-1'? 'spanCancelStyle':'']">{{payStatusTransfer(item.collectionStatus)}}</span>
						</div>
						<div v-show="item.collectionStatus == '0'">
							<span>
								去付款
							</span>
						</div>
					</div>
				</div>
				<div class="no-more-data">
					<span>没有更多数据</span>
				</div>
            </div>
            <div class="all-order to-pay" v-show="currentTabIndex === 3">
                <div class="order-list" @click="orderDetailsEvent(item)" v-for="(item,index) in orderList" :key="index">
					<div class="left">
						<div class="img-show">
							<img :src="item.collectionUrl">
						</div>
						<div class="span-show">
							<span>{{item.collectionName}}</span>
                            <p>
                              {{item.pubName}}
                            </p>
							<span>{{item.collectionPrice}}</span>
						</div>
					</div>
					<div class="right">
						<div>
                            <span :class="[item.collectionStatus=='1'?'spanPaiedStyle':item.collectionStatus=='-1'? 'spanCancelStyle':'']">{{payStatusTransfer(item.collectionStatus)}}</span>
						</div>
						<div v-show="item.collectionStatus == '0'">
							<span>
								去付款
							</span>
						</div>
					</div>
				</div>
				<div class="no-more-data">
					<span>没有更多数据</span>
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
	import {
		setCache,
		removeAllLocalStorage
	} from '@/common/js/utils'
    import NavBar from '@/components/NavBar'
	import {queryOrderList} from '@/api/products.js'
	export default {
		components: {
            NavBar
		},
		data() {
			return {
				emptyShow: false,
                loadingShow: false,
				descriptionContent: '空空如也',
				tabTitlelList: [
					{name: '全部'},
					{name: '待付款'},
					{name: '已付款'},
					{name: '已取消'}
				],
                orderList: [],
				currentTabIndex: 0,
				animationData: [],
                defaultPersonPng :require("@/common/images/home/default-person.jpg"),
			}
		},
		onReady() {},
		computed: {
			...mapGetters([
			])
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
            };
			this.queryProductsList(0)
		},
		methods: {
			...mapMutations([
				'changeOrderId',
				'changeIsPaying'
			]),

			// tab切换事件
			tabSwitchEvent (index) {
				this.currentTabIndex = index;
				this.queryProductsList(index)	
			},
			
			// 支付状态转换
			payStatusTransfer (index) {
				switch(index) {
					case -1 :
						return '已取消'
						break;
					case 0 :
						return '待支付'
						break;
					case 1 :
						return '已支付'
						break;
				}
			},

			// 查询订单列表
            queryProductsList (index) {
                this.loadingShow = true;
                this.emptyShow = false;
                this.orderList = [];
                queryOrderList().then((res) => {
                    this.loadingShow = false;
                    if (res && res.data.code == 0) {
                        if (res.data.list.length == 0) {
                            this.emptyShow = true;
                        } else {
							this.emptyShow = false;
                            for (let item of res.data.list) {
                                this.orderList.push({
                                    collectionName: item.name,
									collectionUrl: item.imgPath,
									pubName: item.pubName,
									collectionPrice: item.price,
									orderId: item.orderId,
      								orderNo: item.orderNo,
									collectionStatus: item.status,
									extend: item.extend,
									item: item.createTime
                                })
                            };
							if (index != 0) {
								if (index == 1) {
									this.orderList = this.orderList.filter((item) => {return item.collectionStatus == 0});
									if (this.orderList.length == 0) {
										this.emptyShow = true
									} else {
										this.emptyShow = false
									}
								} else if (index == 2) {
									this.orderList = this.orderList.filter((item) => {return item.collectionStatus == 1});
									if (this.orderList.length == 0) {
										this.emptyShow = true
									} else {
										this.emptyShow = false
									}
								} else if (index == 3) {
									this.orderList = this.orderList.filter((item) => {return item.collectionStatus == -1});
									if (this.orderList.length == 0) {
										this.emptyShow = true
									} else {
										this.emptyShow = false
									}
								}
							}
                        }
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
                    this.emptyShow = false;
                    this.$dialog.alert({
                        message: `${err.message}`,
                        closeOnPopstate: true
                    }).then(() => {
                    })
                })
            },

			// 跳转订单详情页面
			orderDetailsEvent (item) {
				this.changeOrderId(item.orderId);
				if (item.collectionStatus != 0 ) {
					this.$router.push({name: 'orderFormDetails',params: {id:item.orderId}})
				} else {
					this.changeIsPaying(false);
					this.$router.push({path: 'orderFormToPaid',params: {id:item.orderId}})
				}
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
			/deep/ .van-sticky {
				z-index: 200;
				.tab-switch {
					background: @color-background;
					width: 100%;
					display: flex;
					flex-flow: row nowrap;
					justify-content: space-between;
					span {
						display: inline-block;
						color: #686868;
						font-size: 14px;
						width: 100px;
						height: 60px;
						line-height: 60px;
						text-align: center;
					};
					.active-tab-style {
						color: #FFFFFF;
						font-size: 16px;
						font-weight: bold;
						position: relative;
						&:after {
						content: '';
						position: absolute;
							bottom: 0;
							left: 50%;
							transform: translateX(-50%);
							width: 16px;
							height: 4px;
							background-image: linear-gradient(to right, #fcbe43 , #bf6bfe);
							border-radius: 2px
						}
					}
				}
			}	
		};
		.content-bottom {
			width: 95%;
			margin: 0 auto;
			margin-top: 16px;
			padding-bottom:40px;
			box-sizing: border-box;
			position: relative;
			.all-order {
				.order-list {
					height: 100px;
					display: flex;
					flex-flow: row nowrap;
					justify-content: space-between;
                    align-items: center;
					padding: 0 10px;
					border-radius: 10px;
					background: @color-block;
                    margin-bottom: 10px;
                    box-sizing: border-box;
					.left {
						display: flex;
						flex-flow: row nowrap;
                        align-items: center;
						flex: 1;
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
                            height: 70px;
							flex-direction: column;
							justify-content: space-between;
							margin-left: 14px;
							flex: 1;
							width: 0;
							>span {
								&:nth-child(1) {
									.no-wrap();
									font-size: 16px;
									color: #FFFFFF
								};
								&:nth-child(3) {
									font-size: 16px;
									color: #FFFFFF
								};
							};
                            p {
                                .no-wrap();
								font-size: 10px;
								color: #8c8c8c;
                            }
						}
					};
					.right {
						display: flex;
                        height: 77px;
						width: 70px;
						flex-direction: column;
						justify-content: space-between;
						>div {
							&:nth-child(1) {
								span {
									display: inline-block;
									margin-left: 4px;
									font-size: 12px;
									color: #fff;
									width: 50px;
									height: 20px;
									text-align: center;
									line-height: 20px;
									background-image: linear-gradient(to right, #f2c45f , #e3921a);
									border-top-right-radius: 10px;
									border-bottom-right-radius: 10px;
								};
								.spanPaiedStyle {
									background-image: linear-gradient(to right, #00d3fe , #0091fd)
								};
								.spanCancelStyle {
									background-image: linear-gradient(to right, #b1b1b1 , #686868)
								}
							};
							&:nth-child(2) {
								width: 70px;
								height: 30px;
								color: black;
								text-align: center;
								line-height: 30px;
								font-size: 14px;
								border-radius: 18px;
								background: linear-gradient(to right, #e6c980, #f7c241);
							};
						}
					}
				};
				.no-more-data {
					position: absolute;
					bottom: 0;
					left: 0;
					height: 40px;
					width: 100%;
					text-align: center;
					line-height: 40px;
					font-size: 14px;
					color: #c0c0c0
				}
			}	
		}
	}
</style>



