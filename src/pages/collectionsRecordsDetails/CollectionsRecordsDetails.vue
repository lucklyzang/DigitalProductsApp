<template>
	<div class="page-box">
        <NavBar path="/collectionRecords" title="藏品详情"/>
        <van-loading type="spinner" v-show="loadingShow"/>
        <div class="content">
            <div class="content-top">
                <div class="collection-exhibition">
                    <img :src="collectionRecordDetails.path">
                </div>
                <div class="booth">
                    <img :src="boothPng" alt="">
                </div>
                <div class="synopsis">
                    <div class="title">
                        <span>
                            {{collectionRecordDetails.name}}
                        </span>
                    </div>
                    <div class="number">
                        <img :src="blockchainPng" alt="">
                        <span>{{collectionRecordDetails.chain}}</span>
                    </div>
                    <img :src="detailsTitleWrappper" alt="">
                </div>
            </div>
            <div class="content-middle">
                <div class="collector">
                    <span>收藏者</span>
                    <span>{{collectionRecordDetails.collector}}</span>
                </div>
                <div class="hash-value">
                    <span>商品哈希值</span>
                    <span>{{collectionRecordDetails.hash}}</span>
                </div>
                <div class="framer">
                    <span>创作者</span>
                    <span>{{collectionRecordDetails.creator}}</span>
                </div>
                <div class="generated-time">
                    <span>生成时间</span>
                    <span>{{collectionRecordDetails.createTime}}</span>
                </div>  
            </div>
        </div>
        <div class="content-bottom">
            <div>
                <van-icon name="award" />
                <span>炫耀</span>
            </div>
            <div>
                <van-icon name="printer" />
                <span>转增</span>
            </div>
            <div>
                <van-icon name="good-job" />
                <span>使用</span>
            </div>
            <div>
                <van-icon name="label" />
                <span>证书</span>
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
	import {queryObjectRecordDetails} from '@/api/products.js'
	export default {
		components: {
            NavBar
		},

		data() {
			return {
                loadingShow: false,
                collectionRecordDetails: {},
                isCountDownShow: true,
                blockchainPng: require("@/common/images/home/blockchain.png"),
                sharePng: require("@/common/images/login/my-share.png"),
                boothPng: require("@/common/images/home/booth.png"),
                detailsTitleWrappper: require("@/common/images/home/details-title-wrapper.png")
			}
		},

		onReady() {},
		computed: {
			...mapGetters([
                'collectionId',
                'isLogin',
                'userInfo'
			])
		},

		mounted() {
            // 控制设备物理返回按键
            if (!IsPC()) {
                pushHistory();
                this.gotoURL(() => {
                pushHistory();
                    this.$router.push({
                        path: '/collectionRecords'
                    })
                })
            };
            this.queryCollectionDetails()
		},

		methods: {
			...mapMutations([
			]),

            // 查询藏品详情
            queryCollectionDetails () {
                this.loadingShow = true;
                queryObjectRecordDetails(this.collectionId).then((res) => {
                    this.loadingShow = false;
                    if (res && res.data.code == 0) {
                        this.collectionRecordDetails = res.data.data;
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
	.page-box {
		.content-wrapper();
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
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: @color-background;
            padding-bottom: 80px;
            box-sizing: border-box;
            .content-top {
                padding-top: 10px;
                box-sizing: border-box;
                .collection-exhibition {
                    max-width: 80%;
                    margin: 0 auto;
                    position: relative;
                    img {
                        width: 100%
                    }
                };
                .booth {
                    max-width: 80%;
                    margin: 0 auto;
                    margin-top: 20px;
                    height: 50px;
                    img {
                        width: 100%
                    }
                };
                .synopsis {
                    width: 100%;
                    display: flex;
                    height: 80px;
                    margin-top: 30px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    .title {
                        width: 60%;
                        font-size: 24px;
                        color: #FFFFFF;
                        text-align: center;
                        font-weight: bold;
                        .no-wrap()
                    };
                    .number {
                        width: 60%;
                        font-size: 14px;
                        margin-top: 16px;
                        display: flex;
                        height: 40px;
                        flex-flow: row nowrap;
                        align-items: center;
                        justify-content: center;
                        img {
                            width: 20px
                        };
                        span {
                            display: inline-block;
                            max-width: 200px;
                            padding: 0 20px 0 10px;
                            height: 22px;
                            border: 1px solid #bd6aff;
                            font-size: 10px;
                            border-radius: 10px;
                            box-sizing: border-box;
                            line-height: 22px;
                            color: #bd68ff;
                            .no-wrap()
                        }
                    };
                    >img {
                        position: absolute;
                        top: 0;
                        left: 10%;
                        max-width: 80%;
                        height: 80px
                    }
                }
		    };
            .content-middle {
                width: 94%;
                margin: 0 auto;
                background: @color-block;
                padding: 20px 10px;
                margin-top: 20px;
                box-sizing: border-box;
                border-radius: 14px;
                display: flex;
                flex-flow: column;
                align-items: center;
                > div {
                    display: flex;
                    flex-flow: column;
                    align-items: center;
                    margin-bottom: 30px;
                    &:last-child {
                        margin-bottom: 0
                    };
                    span {
                        display: inline-block;
                        &:first-child {
                            font-size: 10px;
                            color: #8e8e8e;
                            margin-bottom: 10px;
                        };
                        &:last-child {
                            font-size: 16px;
                            color: #FFFFFF
                        }
                    }
                };
                .hash-value {
                    width: 100%;
                    span {
                         &:last-child {
                            width: 60%;
                            .no-wrap();
                            height: 30px;
                            line-height: 30px;
                            font-size: 10px;
                            text-align: center;
                            padding: 0 10px;
                            box-align: border-box;
                            border-radius: 6px;
                            color: black;
                            background-image: linear-gradient(to right, #f2c460 ,#e29119);
                        }
                    }
                }
            }
        };
		.content-bottom {
            background: #00020f;
			width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
            align-items: flex-start;
            padding: 10px;
            box-sizing: border-box;
            color: #fff;
            >div {
                flex: 1;
                height: 50px;
                display: flex;
			    flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                >span {
                    margin-left: 4px
                }
            }
		}
	}
</style>

