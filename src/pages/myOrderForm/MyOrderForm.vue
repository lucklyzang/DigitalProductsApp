<template>
	<div class="content-box">
		<NavBar path="/myInfo" title="我的订单"/>
		<div class="content-top">
			<div class="tab-switch" :animation="animationData">
				<span v-for="(item,index) in tabTitlelList" :key="index" @click="tabSwitchEvent(index)"
					:class="{'active-tab-style': index === currentTabIndex }"
				>
					{{
						 item.name
					}}
				</span>
			</div>
		</div>
		<div class="content-bottom">
			<div class="all-order" v-show="currentTabIndex === 0">
				<div class="order-list" @click="orderDetailsEvent(item)" v-for="(item,index) in orderList" :key="index">
					<div class="left">
						<div class="img-show">
							<img :src="item.collectionUrl">
						</div>
						<div class="span-show">
							<span>{{item.collectionName}}</span>
                            <p>
                             <span v-for="(innerItem,innerIndex) in item.collectionTagsList" :key="innerIndex">{{innerItem}}</span>
                            </p>
							<span>{{item.collectionPrice}}</span>
						</div>
					</div>
					<div class="right">
						<div>
							<span :class="[item.collectionStatus=='已付款'?'spanPaiedStyle':item.collectionStatus=='已取消'? 'spanCancelStyle':'']">{{item.collectionStatus}}</span>
						</div>
						<div v-show="item.collectionStatus == '待付款'">
							<span>
								{{item.collectionOPeration}}
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
                             <span v-for="(innerItem,innerIndex) in item.collectionTagsList" :key="innerIndex">{{innerItem}}</span>
                            </p>
							<span>{{item.collectionPrice}}</span>
						</div>
					</div>
					<div class="right">
						<div>
							<span :class="[item.collectionStatus=='已付款'?'spanPaiedStyle':item.collectionStatus=='已取消'? 'spanCancelStyle':'']">{{item.collectionStatus}}</span>
						</div>
						<div v-show="item.collectionStatus == '待付款'">
							<span>
								{{item.collectionOPeration}}
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
                             <span v-for="(innerItem,innerIndex) in item.collectionTagsList" :key="innerIndex">{{innerItem}}</span>
                            </p>
							<span>{{item.collectionPrice}}</span>
						</div>
					</div>
					<div class="right">
						<div>
                           <span :class="[item.collectionStatus=='已付款'?'spanPaiedStyle':item.collectionStatus=='已取消'? 'spanCancelStyle':'']">{{item.collectionStatus}}</span>
						</div>
						<div v-show="item.collectionStatus == '待付款'">
							<span>
								{{item.collectionOPeration}}
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
                             <span v-for="(innerItem,innerIndex) in item.collectionTagsList" :key="innerIndex">{{innerItem}}</span>
                            </p>
							<span>{{item.collectionPrice}}</span>
						</div>
					</div>
					<div class="right">
						<div>
                            <span :class="[item.collectionStatus=='已付款'?'spanPaiedStyle':item.collectionStatus=='已取消'? 'spanCancelStyle':'']">{{item.collectionStatus}}</span>
						</div>
						<div v-show="item.collectionStatus == '待付款'">
							<span>
								{{item.collectionOPeration}}
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
	import {
	} from '@/api/login.js'
	export default {
		components: {
            NavBar
		},
		data() {
			return {
				tabTitlelList: [
					{name: '全部'},
					{name: '待付款'},
					{name: '已付款'},
					{name: '已取消'}
				],
                orderList: [
                    {
                        collectionName: '吉乐福·舒清富',
                        collectionUrl: require("@/common/images/home/default-person.jpg"),
                        iconName: 'underway-o',
                        collectionPrice: '9.90',
                        collectionTagsList: ['属性一','属性二','属性一','属性二'],
                        collectionStatus: '待付款',
                        collectionOPeration: '去付款'

                    },
                    {
                        collectionName: '吉乐福·舒清富',
                        collectionUrl: require("@/common/images/home/default-person.jpg"),
                        iconName: 'underway-o',
                        collectionPrice: '9.90',
                        collectionTagsList: ['属性一','属性二'],
                        collectionStatus: '已取消',
                        collectionOPeration: '去付款'

                    },
					{
                        collectionName: '吉乐福·舒清富',
                        collectionUrl: require("@/common/images/home/default-person.jpg"),
                        iconName: 'underway-o',
                        collectionPrice: '9.90',
                        collectionTagsList: ['属性一','属性二'],
                        collectionStatus: '已付款',
                        collectionOPeration: '订单详情'

                    }
                ],
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
		},
		methods: {
			...mapMutations([
			]),
			// tab切换事件
			tabSwitchEvent (index) {
				this.currentTabIndex = index;
				console.log(index,this.currentTabIndex)
			},
			// 跳转订单详情页面
			orderDetailsEvent (item) {
				if (item.collectionStatus !== '待付款') {
					this.$router.push({path: 'orderFormDetails'})
				} else {
					this.$router.push({path: 'orderFormToPaid'})
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
			.tab-switch {
				position: sticky;
				top: 50px;
				background: @color-background;
				width: 100%;
				z-index: 200;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				span {
					display: inline-block;
					color: #777575;
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
						width: 26px;
						height: 4px;
						background: #facd7a;
						border-radius: 2px;
					}
				};
			  };
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
							>span {
								&:nth-child(1) {
									font-size: 16px;
									color: #FFFFFF
								};
								&:nth-child(3) {
									font-size: 16px;
									color: #FFFFFF
								};
							};
                            p {
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
									background-image: linear-gradient(to right, #f2c25e , #e4931e);
									border-top-right-radius: 10px;
									border-bottom-right-radius: 10px;
								};
								.spanPaiedStyle {
									background-image: linear-gradient(to right, #00d2ff , #0090ff)
								};
								.spanCancelStyle {
									background-image: linear-gradient(to right, #686868 , #686868)
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



