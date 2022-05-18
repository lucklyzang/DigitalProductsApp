<template>
	<div class="content-box">
         <van-nav-bar left-arrow :border="false"
            :placeholder="true"
            title="风中残影"
            :fixed="true"
            z-index="1000"
            :safe-area-inset-top="true"
            @click-left="onClickLeft"
        >
        </van-nav-bar>
        <van-loading type="spinner" v-show="loadingShow"/>
        <img :src="checkedTemplateImg" alt="">
		<div class="content">
            <div class="content-center">
                <div class="content-left">
                    <div class="title">
                        纪元
                    </div>
                    <div class="introduce">
                        NFT宇宙藏品玩家
                    </div>
                </div>
                <div class="content-right">
                   <div class="exhibition-list" v-for="(item,index) in orderList" :key="index">
                       <div class="exhibits-top" v-lazy-container="{ selector: 'img' }" :style="{background: 'url(' + imgBorderImg+ ') no-repeat center center' }">
                           <img :data-src="item.collectionUrl" alt="">
                       </div>
                       <div class="exhibits-line">
                           <img :src="hallBothPng" alt="">
                       </div>
                       <div class="exhibits-bottom">
                            <p class="chain">
                                <span class="blockchain-img">
                                    <img :src="blockchainPng" alt="">
                                </span>
                                <span class="blockchain-chain">{{item.chain ? item.chain : ''}}</span>
                            </p>
                           <p class="author">{{item.collectionName}}</p>
                            <p class="publisher">{{item.publisher}}</p>
                       </div>
                   </div>
                </div>
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
	import {queryObjectRecord} from '@/api/products.js'
	export default {
        name: 'IndividualitySignature',
		components: {
			NavBar
		},
		data() {
			return {
                orderList: [],
                loadingShow: false,
                hallBothPng: require("@/common/images/home/hall-both.png"),
                blockchainPng: require("@/common/images/home/hall-chain.png"),
                checkedTemplateImg: require("@/common/images/home/theme-one.png"),
                imgBorderImg: require("@/common/images/home/img-border.png")
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
            // 控制设备物理返回按键
            if (!IsPC()) {
                pushHistory();
                this.gotoURL(() => {
                pushHistory();
                    this.$router.push({
                        path: '/myObject'
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
                this.orderList = [];
				queryObjectRecord({page: 1, limit: 20}).then((res) => {
					this.loadingShow = false;
					if (res && res.data.code == 0) {
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
                    } else {
                        this.$toast({
                            message: `${res.data.msg}`,
                            position: 'bottom'
                        })
                    }
				})
				.catch((err) => {
					this.loadingShow = false;
					this.$toast({
						message: `${err.message}`,
						position: 'bottom'
					})
				})
			},

            onClickLeft () {
                this.$router.push({path: '/myObject'})
            }
		}
	}
</script>

<style lang="less" scoped>
	@import "~@/common/stylus/variable.less";
    @import "~@/common/stylus/mixin.less";
    @import "~@/common/stylus/modifyUi.less";
    .content-box::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    };
	.content-box {
		.content-wrapper();
        background: @color-background;
        /deep/ .van-nav-bar {
            background: @color-background;
            .van-nav-bar__title {
                color: #fff !important
            };
            .van-icon-arrow-left {
                color: #fff !important;
                font-size: 18px;
                span {
                    width: 100%;
                    height: 100%
                }
            };
            .van-nav-bar__right {
            }
        };
        overflow-x: scroll;
        > img {
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh
        };
		.content{
            flex: 1;
            position: relative;
            .content-center {
                position: absolute;
                display: flex;
                flex-flow: row nowrap;
                top: 80px;
                left: 40px;
                height: 60vh;
                .content-left {
                    width: 220px;
                    display: flex;
                    height: 60vh;
                    flex-direction: column;
                    margin-right: 20px;
                    .title {
                        color: #fff;
                        font-size: 22px;
                        height: 100px;
                        word-break: break-all;
                        overflow: auto;
                    };
                    .introduce {
                        color: rgb(182, 182, 182);
                        font-size: 14px;
                        word-break: break-all;
                        flex: 1;
                        margin-top: 10px;
                        overflow: auto
                    }
                };
                .content-right {
                    color: #fff;
                    font-size: 22px;
                    height: 60vh;
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    .exhibition-list {
                        width: 140px;
                        box-sizing: border-box;
                        height: 30vh;
                        // margin-bottom: 40px;
                        margin-right: 40px;
                        .exhibits-top {
                            position: relative;
                            width: 100px;
                            padding: 5px;
                            height: 110px;
                            margin: 0 auto;
                            border-radius: 10px;
                            > img {
                                border-radius: 6px;
                                width: 100%;
                                height: 100%
                            }
                        };
                        .exhibits-line {
                            width: 140px;
                            margin-top: 8px;
                            img {
                                width: 140px
                            }
                        };
                        .exhibits-bottom {
                            margin-top: -4px;
                            >p {
                                width: 100%;
                            }
                            .author {
                                font-size: 12px;
                                color: black;
                                margin: 8px 0;
                                .no-wrap()
                            };
                            .chain {
                                display: flex;
                                flex-flow: row nowrap;
                                align-items: center;
                                height: 26px;
                                display: flex;
                                flex-flow: row nowrap;
                                align-items: center;
                                position: relative;
                                .blockchain-img {
                                    width: 24px;
                                    height: 26px;
                                    position: absolute;
                                    top: 1px;
                                    left: 0;
                                    img {
                                        width: 24px;
                                        height: 26px
                                    }
                                };
                                .blockchain-chain {
                                    display: inline-block;
                                    padding: 0 6px 0 12px;
                                    flex: 1;
                                    border-radius: 10px;
                                    font-size: 10px;
                                    box-sizing: border-box;
                                    height: 15px;
                                    line-height: 15px;
                                    margin-left: 14px;
                                    background-image: linear-gradient(to right, #fbd2a5, #f1c593);
                                    color: #9f7c0f;
                                    .no-wrap()
                                }
                            }
                            .publisher {
                                font-size: 11px;
                                color: #9e9d9d;
                                .no-wrap()
                            }
                        }
                    }
                }
            }
		}
	}
</style>





