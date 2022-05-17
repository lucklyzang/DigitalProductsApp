<template>
	<div class="content-box">
        <van-nav-bar :border="false"
            :placeholder="true"
            title="选择展品"
            :fixed="true"
            z-index="1000"
            :safe-area-inset-top="true"
            @click-left="onClickLeft"
        >
             <template #left>
                <span>取消</span>
            </template>
        </van-nav-bar>
        <van-loading type="spinner" v-show="loadingShow"/>
        <div class="my-object">
            <van-loading type="spinner" v-show="loadingShow"/>
            <van-empty :description="descriptionContent" v-show="emptyShow" />
            <div class="object-tit">我的藏品</div>
            <div class="object-list-box">
                <div class="object-list" v-for="(item,index) in orderList" :key="index">
                    <div class="img-show" v-lazy-container="{ selector: 'img' }">
						<img :data-src="item.collectionUrl">
					</div>
                    <p class="author">{{item.collectionName}}</p>
                    <p class="chain">
                        <span class="blockchain-img">
                            <img :src="blockchainPng" alt="">
                        </span>
                        <span class="blockchain-chain">{{item.chain ? item.chain : ''}}</span>
                    </p>
                    <p class="publisher">{{item.publisher}}</p>
                </div>
            </div>
        </div>
        <div class="btn-area">
            <span :class="{'spanStyle':!isCanClick}" @click="sureEvent">确定</span>
        </div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import {queryObjectRecord} from '@/api/products.js'
    import FooterBottom from '@/components/FooterBottom'
	export default {
        name: 'MyObject',
		components: {
            FooterBottom
		},
		data() {
			return {
                isCanClick: false,
                isShowLoadFail: false,
				emptyShow: false,
                loadingShow: false,
				descriptionContent: '暂无藏品',
                orderList: [],
                blockchainPng: require("@/common/images/home/blockchain.png"),
                notLoginPng: require("@/common/images/login/not-login.png")
			}
		},
		onReady() {},
		computed: {
			...mapGetters([
                'userInfo',
                'isLogin'
			])
		},
		mounted() {
            // 查询藏品记录
			this.queryCollectionRecords()
		},
		methods: {
			...mapMutations([
			]),
            // 查询藏品记录
			queryCollectionRecords () {
				this.isShowLoadFail = false;
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
        							comId: item.comId,
									chain: item.chain,
									publisher: item.publisher
                                })
                            }
                        }
                    } else {
						this.isShowLoadFail = true;
                        this.$toast({
                            message: `${res.data.msg}`,
                            position: 'bottom'
                        })
                    }
				})
				.catch((err) => {
					this.isShowLoadFail = true;
					this.loadingShow = false;
                    this.emptyShow = false;
					this.$toast({
						message: `${err.message}`,
						position: 'bottom'
					})
				})
			},

            // 确定事件
            sureEvent () {
                if (!this.isCanClick) {
                    return
                };
                this.$router.push({path: '/editNewHall'})
            },

            onClickLeft () {
                this.$router.push({path: '/editNewHall'})
            },
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
            background: @color-background;
            .van-nav-bar__title {
                color: #fff !important
            };
            .van-nav-bar__left {
                width: 60px;
                height: 30px;
                line-height: 30px;
                border-radius: 20px;
                color: #b9b9b9 !important;
                padding: 0 6px 0 0;
                text-align: left;
                font-size: 16px;
                top: 10px;
                left: 8px;
                box-sizing: border-box;
                span {
                    width: 100%;
                    height: 100%
                }
            };
            .van-nav-bar__right {
                width: 60px;
                height: 30px;
                line-height: 30px;
                border-radius: 20px;
                background: #f5f5c4;
                color: black !important;
                padding: 0 6px;
                top: 10px;
                right: 8px;
                box-sizing: border-box;
                span {
                    width: 100%;
                    height: 100%
                }
            }
        };
        .my-object {
            width: 100%;
            flex: 1;
            padding: 15px;
            box-sizing: border-box;
            display: flex;
            overflow: auto;
            z-index: 100;
            flex-direction: column;
            .object-tit {
                color: #fff;
                font-size: 18px
            };
            .object-list-box {
                flex: 1;
                width: 100%;
                margin-top: 10px;
                overflow: auto;
                display: flex;
                flex-flow: row wrap;
                >div {
                    margin-right: 4%;
                    margin-bottom: 4%;
                    &:nth-child(even) {
                        margin-right: 0
                    }
                }
                .object-list {
                    width: 48%;
                    background: #484848;
                    border-radius: 10px;
                    padding-bottom: 10px;
                    box-sizing: border-box;
                    .img-show {
                        width: 100%;
                        >img {
                            border-top-left-radius: 10px;
                            border-top-right-radius: 10px;
                            width: 100%
                        }
                    };
                    >p {
                        width: 100%;
                        padding: 0 6px;
                        box-sizing: border-box;
                    }
                    .author {
                        font-size: 13px;
                        color: #fff;
                        margin-top: 10px;
                        .no-wrap()
                    };
                    .chain {
                        margin: 10px 0;
                        width: 90%;
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: center;
                        height: 26px;
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: center;
                        position: relative;
                        .blockchain-img {
                            width: 26px;
                            position: absolute;
                            top: -1px;
                            left: 8px;
                            img {
                                width: 100%;
                            }
                        };
                        .blockchain-chain {
                            display: inline-block;
                            padding: 0 6px 0 16px;
                            flex: 1;
                            border-radius: 10px;
                            font-size: 10px;
                            box-sizing: border-box;
                            line-height: 18px;
                            margin-left: 17px;
                            background-image: linear-gradient(to right, #9b45e0, #6c2ba0);
                            color: black;
                            .no-wrap()
                        }
                    }
                    .publisher {
                        font-size: 12px;
                        color: rgb(126, 126, 126);
                        .no-wrap()
                    }
                };
            }
        };
        .btn-area {
            display: flex;
			flex-direction: column;
			justify-content: center;
            align-items: center;
            width: 80%;
            margin: 0 auto;
            margin-top: 20px;
            > span {
                display: inline-block;
                width: 100%;
                color: #383737;
                height: 50px;
                font-size: 18px;
                text-align: center;
                font-weight: bold;
                line-height: 50px;
                background: #f5f5c4;
                border-radius: 30px
            };
            .spanStyle {
                background: #696968;
            }
        }
	}
</style>





