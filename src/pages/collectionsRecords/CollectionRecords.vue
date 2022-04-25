<template>
	<div class="content-box">
		<NavBar path="/myInfo" title="藏品记录"/>
		<van-loading type="spinner" v-show="loadingShow"/>
        <van-empty :description="descriptionContent" v-show="emptyShow" />
		<div class="content-center" v-show="!emptyShow">
			<div class="all-order">
				<div class="order-list" v-for="(item,index) in orderList" :key="index">
					<div class="left">
						<div class="img-show">
							<img :src="item.collectionUrl">
						</div>
						<div class="span-show">
							<span>{{item.collectionName}}</span>
                            <p v-show="item.collectionTagsList && !item.collectionTagsList.some((tagItem) => {return tagItem == null}) && item.collectionTagsList.length>0">
                             <span 
							 	v-for="(innerItem,innerIndex) in item.collectionTagsList" :key="innerIndex">{{innerItem}}
							 </span>
                            </p>
							<span>{{item.collectionPrice}}</span>
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
    import NavBar from '@/components/NavBar'
	import {queryObjectRecord} from '@/api/products.js'
	export default {
		components: {
            NavBar
		},
		data() {
			return {
				emptyShow: false,
                loadingShow: false,
				descriptionContent: '暂无藏品',
                orderList: [],
				currentTabIndex: 0,
				animationData: [],
                defaultPersonPng :require("@/common/images/home/default-person.jpg")
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
			// 查询藏品记录
			this.queryCollectionRecords()
		},
		methods: {
			...mapMutations([
			]),
			// 查询藏品记录
			queryCollectionRecords () {
				this.loadingShow = true;
                this.emptyShow = false;
                this.orderList = [];
				queryObjectRecord({page: 1, limit: 20}).then((res) => {
					this.loadingShow = false;
					if (res && res.data.code == 0) {
                        if (res.data.page.list.length == 0) {
                            this.emptyShow = true;
                        } else {
                            for (let item of res.data.page.list) {
                                this.orderList.push({
                                    collectionName: item.name,
									collectionUrl: item.path,
									collectionPrice: item.price,
									collectionTagsList: item.tags,
									id: item.id,
        							comId: item.comId
                                })
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
						width: 100%;
						.img-show {
							width: 70px;
							img {
								width: 100%;
							}
						};
						.span-show {
							display: flex;
                            height: 70px;
							flex: 1;
							width: 0;
							flex-direction: column;
							justify-content: space-between;
							margin-left: 14px;
							>span {
								display: inline-block;
								&:nth-child(1) {
									font-size: 16px;
									color: #FFFFFF;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									height: 30px
								};
								&:nth-child(3) {
									font-size: 16px;
									color: #FFFFFF
								};
							};
                            p {
                                overflow: auto;
								margin: 6px 0;
								height: 30px;
                                span {
                                    display: inline-block;
                                    padding: 0 8px;
                                    height: 18px;
                                    border: 1px solid #bd6aff;
                                    font-size: 10px;
                                    border-radius: 10px;
                                    box-sizing: border-box;
                                    text-align: center;
                                    line-height: 18px;
                                    color: #bd68ff;
                                    margin-right: 4px
                                }
                            }
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



