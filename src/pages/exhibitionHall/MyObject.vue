<template>
	<div class="content-box">
        <van-loading type="spinner" v-show="loadingShow"/>
        <div class="my-hall">
            <div class="my-hall-content">
                <img :src="defaultPersonPng" alt="">
                <div class="hall-tit">
                    <span>我的展馆</span>
                    <span>NO.0000039586</span>
                </div>
                <div class="create-hall">
                    <span>创建展览</span>
                    <van-icon name="arrow" size="10" color="#9c9c9c"/>
                </div>
            </div>
        </div>
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
	</div>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import {queryObjectRecord} from '@/api/products.js'
	export default {
        name: 'MyObject',
		components: {
		},
		data() {
			return {
                isShowLoadFail: false,
				emptyShow: false,
                loadingShow: false,
				descriptionContent: '暂无藏品',
                orderList: [],
                blockchainPng: require("@/common/images/home/blockchain.png"),
                defaultPersonPng: require("@/common/images/home/default-person.jpg")
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
        .my-hall {
            width: 100%;
            height: 200px;
            .my-hall-content {
                width: 100%;
                height: 200px;
                position: relative;
                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 200px;
                    width: 100%
                };
                .hall-tit {
                    margin-left: 15px;
                    display: flex;
                    flex-direction: column;
                    margin-top: 20px;
                    span {
                        z-index: 1;
                        &:first-child {
                            color: #fff;
                            font-size:20px;
                            margin-bottom: 6px
                        };
                        &:last-child {
                            color: rgb(156, 154, 154);
                            font-size: 14px
                        }
                    }
                };
                .create-hall {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    width: 120px;
                    height: 35px;
                    background-image: linear-gradient(to right, rgb(121, 121, 121), rgb(94, 94, 94));
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 8px;
                    >span {
                        font-size: 14px;
                        z-index: 1
                    };
                    /deep/ .van-icon {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        right: 4px;
                    }
                }
            }
        };
        .my-object {
            width: 100%;
            position: fixed;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            padding: 15px;
            box-sizing: border-box;
            top: 200px;
            left: 0;
            background: black;
            display: flex;
            height: 100vh;
            overflow: auto;
            flex-direction: column;
            .object-tit {
                color: #fff;
                font-size: 20px
            };
            .object-list-box {
                flex: 1;
                width: 100%;
                margin-top: 10px;
                overflow: auto;
                display: flex;
                flex-flow: row nowrap;
                >div {
                    margin-left: 6px;
                    margin-bottom: 6px;
                    &:nth-child(even) {
                        margin-left: 0
                    }
                }
                .object-list {
                    height: 270px;
                    background: #252525;
                    border-radius: 10px;
                    padding-bottom: 10px;
                    box-sizing: border-box;
                    >img {
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                        width: 100%
                    };
                    >p {
                        width: 100%;
                        padding: 0 6px;
                        box-sizing: border-box;
                    }
                    .author {
                        font-size: 12px;
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
                        font-size: 11px;
                        color: rgb(126, 126, 126);
                        .no-wrap()
                    }
                }
            }
        }
	}
</style>





