<template>
	<div class="page-box">
        <van-loading type="spinner" v-show="loadingShow"/>
        <van-overlay :show="overlayShow" />
        <van-nav-bar left-arrow :border="false"
            :placeholder="true"
            :fixed="true"
            z-index="1000"
            :safe-area-inset-top="true"
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
            <template #right>
                <img :src="sharePng" alt="">
            </template>
        </van-nav-bar>
        <div class="content">
            <div class="content-top">
                <div class="collection-exhibition">
                    <img :src="imgLoadingGif" v-show="loadingImgGifShow">
                    <img :src="productsDetails.imgPath" v-show="!loadingImgGifShow">
                </div>
                <div class="booth">
                    <img :src="boothPng" alt="">
                </div>
                <div class="synopsis">
                    <div class="title">
                        <span>
                            {{productsDetails.name}}
                        </span>
                    </div>
                    <div class="number">
                        <div class="left">
                            <span>限量</span>
                            <span>{{productsDetails.quantity}} 份</span>
                        </div>
                        <div class="right">
                            <span>剩余</span>
                            <span>{{productsDetails.surplus}} 份</span>
                        </div>
                    </div>
                    <img :src="detailsTitleWrappper" alt="">
                </div>
            </div>
            <div class="content-middle">
                <div class="framer" @click="toWorkRoomEvent">
                    <div>
                        <img :src="productsDetails.avatar">
                    </div>
                    <div>
                        <span>{{productsDetails.creator}}</span>
                        <span>{{productsDetails.publisher}}</span>
                    </div>
                </div>
                <!-- <div class="focus-box">
                    <span>关注</span>
                </div> -->
            </div>
            <div class="collection-story-box">
                <div class="img-box" v-lazy-container="{ selector: 'img' }">
                    <img :data-src="item" v-for="(item) in productsDetails.describe" :key="item">
                </div>
                <div class="publisher-title">
                    <span>发行方 : {{productsDetails.publisher}}</span>
                </div>
            </div>
            <div class="purchase-information">
                <div class="information-title">
                    <span>购买须知</span>
                </div>
                <div class="issure-title">
                    <p>
                        数字藏品为虚拟数字商品，而非实物，仅限实名认证为年满14周岁的中国大陆用户购买。数字藏品的版权有发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，不支持退换。本商品源文件不支持本地下载。请勿对数字藏品进行炒作、场外交易、欺诈，或以上任何其他非法方式进行使用。
                    </p>
                </div>
            </div>
            <div class="blockchain-server">
                <img :src="blockchainServePng" alt="">
                <span>提供技术支持</span>
            </div>
        </div>
        <div class="content-bottom" @click="purchaseEvent">
			<div>
				<span>¥ {{productsDetails.price}}</span>
			</div>
			<div :class="{'sellStyle': !isCountDownShow,'purchaseStyle': productsDetails.status == 1}">
				<span>{{isCountDownShow ? '即将开售' : productsDetails.status == 1  ||  productsDetails.status == 0 ? '购买' : '已售罄'}}</span>
				<van-count-down v-show="isCountDownShow" :time="Number(productsDetails.seckillTime)- new Date().getTime()" format="DD:HH:mm:ss" @finish="countDownEvent"/>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import {inquareProductDetails,purchaseCommodity,inquareUserInfo,productionShare} from '@/api/products.js'
	export default {
        name: 'DigitalCollectionDetails',
		components: {
		},

		data() {
			return {
                isShowContent: false,
                loadingImgGifShow: false,
                loadingShow: false,
                overlayShow: false,
                productsDetails: {},
                isCountDownShow: true,
                imgLoadingGif: require("../../../static/img/img-loading.gif"),
                digitalCollectioUrl: require("@/common/images/home/default-person.jpg"),
                sharePng: require("@/common/images/login/my-share.png"),
                boothPng: require("@/common/images/home/booth.png"),
                detailsTitleWrappper: require("@/common/images/home/details-title-wrapper.png"),
                blockchainServePng: require("@/common/images/home/blockchain-service.png")
			}
		},

		onReady() {},
		computed: {
			...mapGetters([
                'productsId',
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
                        path: '/home'
                    })
                })
            };
            this.queryProductDetails()
		},

		methods: {
			...mapMutations([
                'changeOrderId',
                'changeIsPaying',
                'storeUserInfo'
			]),

            // 查询作品详情
            queryProductDetails () {
                return new Promise((resolve,rejrect) => {
                    this.loadingImgGifShow = true;
                    inquareProductDetails(this.productsId).then((res) => {
                        this.loadingImgGifShow = false;
                        if (res && res.data.code == 0) {
                            this.productsDetails = res.data.data;
                            this.isShowContent = true;
                            resolve();
                            if (this.isLogin) {
                                if (!this.userInfo) {
                                    this.queryuserInfo()
                                }
                            };
                        } else {
                             this.$toast({
                                message: `${res.data.msg}`,
                                position: 'bottom'
                            })
                        }
                    })
                    .catch((err) => {
                        this.loadingImgGifShow = false;
                         this.$toast({
                            message: `${err.message}`,
                            position: 'bottom'
                        })
                    })
                })    
            },

            // 购买商品
            async purchaseEvent () {
                //未开售
                if (this.isCountDownShow) {
                    return
                };
                //已售罄
                if (this.productsDetails.status == 2) {
                    return
                };
                // 未登录
                if (!this.isLogin) {
                    this.$router.push({
                        path: '/login'
                    });
                    return
                };
                // 未认证
                if (this.userInfo.realFlag != 1) {
                    this.$router.push({
                        path: '/realNameAuthentication'
                    });
                    return
                };
                await this.queryProductDetails();
                if (this.productsDetails.status == 2) {
                    return
                };
                this.buyCommodity()
            },

            // 查询用户信息
            queryuserInfo() {
                inquareUserInfo().then((res) => {
                        if (res && res.data.code == 0) {
                            this.storeUserInfo(res.data.data);
                        } else {
                            this.$toast({
                                message: `${res.data.msg}`,
                                position: 'bottom'
						    })
                        }
                    })
                    .catch((err) => {
                         this.$toast({
                            message: `${err.message}`,
                            position: 'bottom'
                        })
                    })
            },

            // 购买商品
            buyCommodity () {
                this.loadingShow = true;
                this.overlayShow = true; 
                purchaseCommodity(this.productsId).then((res) => {
                    this.loadingShow = false;
                    this.overlayShow = false; 
                    if (res && res.data.code == 0) {
                        this.changeOrderId(res.data.data.orderId);
                        this.changeIsPaying(false);
                        this.$router.push({path: 'orderFormToPaid'})
                    } else {
                        this.$toast({
                            message: `${res.data.msg}`,
                            position: 'bottom'
                        })
                    }
                })
                .catch((err) => {
                    this.loadingShow = false;
                    this.overlayShow = false;
                    this.$toast({
                        message: `${err.message}`,
                        position: 'bottom'
                    }) 
                })
            },

            // 作品分享
            productionShareEvent() {
                return new Promise((resolve,rejrect) => {
                    this.loadingShow = true;
                    productionShare(this.productsId).then((res) => {
                        this.loadingShow = false;
                        if (res && res.data.code == 0) {
                            resolve(res.data.data)
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
                })
            },

            // 倒计时结束事件
            countDownEvent () {
                this.isCountDownShow = false
            },

			toWorkRoomEvent() {
                return;
                this.$router.push({path: 'workRoom'})
            },

            onClickLeft () {
                this.$router.push({path: 'home'})
            },

            async onClickRight () {
                let shareUrl = await this.productionShareEvent();
                window.android.setShareUrl(`${shareUrl}`)
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
        background: @color-background;
        /deep/ .van-nav-bar {
            background: @color-background;
            .van-icon-arrow-left {
                color: #fff !important;
                font-size: 18px !important
            };
            .van-nav-bar__right {
                img {
                    width: 22px;
                    height: 22px
                }
            }
        };
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-bottom: 80px;
            box-sizing: border-box;
            .content-top {
                padding-top: 10px;
                box-sizing: border-box;
                .collection-exhibition {
                    width: 80%;
                    margin: 0 auto;
                    position: relative;
                    img {
                        pointer-events: none;
                        width: 100%
                    }
                };
                .booth {
                    width: 80%;
                    margin: 0 auto;
                    margin-top: 20px;
                    img {
                        width: 100%
                    }
                };
                .synopsis {
                    width: 80%;
                    display: flex;
                    margin: 0 auto;
                    margin-top: 20px;
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
                        width: 80%;
                        font-size: 14px;
                        margin-top: 16px;
                        display: flex;
                        height: 40px;
                        flex-flow: row nowrap;
                        justify-content: center;
                        align-items: center;
                        .left {
                            height: 40px;
                            line-height: 40px;
                            font-size: 0;
                            display: flex;
                            margin-right: 10px;
                            flex-flow: row nowrap;
                            align-items: center;
                            justify-content: center;
                            >span {
                                font-size: 14px;
                                display: inline-block;
                                height: 20px;
                                line-height: 20px;
                                &:first-child {
                                    background: #febd42;
                                    color: black;
                                    padding: 1px 4px 1px 4px;
                                    border-top-left-radius: 2px;
                                    border-bottom-left-radius: 2px;
                                };
                                &:last-child {
                                    background: #3e3a51;
                                    color: #ffbc41;
                                    padding: 1px 4px 1px 4px;
                                    border-top-right-radius: 2px;
                                    border-bottom-right-radius: 2px
                                }
                            }
                        }
                        .right {
                            height: 40px;
                            line-height: 40px;
                            font-size: 0;
                            display: flex;
                            flex-flow: row nowrap;
                            align-items: center;
                            justify-content: center;
                            >span {
                                font-size: 14px;
                                display: inline-block;
                                height: 20px;
                                line-height: 20px;
                                &:first-child {
                                    background: #343434;
                                    color: #6d6d6d;
                                    padding: 1px 4px 1px 4px;
                                    border-top-left-radius: 2px;
                                    border-bottom-left-radius: 2px;
                                };
                                &:last-child {
                                    background: #3e3a51;
                                    color: #ffbc41;
                                    padding: 1px 4px 1px 4px;
                                    border-top-right-radius: 2px;
                                    border-bottom-right-radius: 2px
                                }
                            }
                        }
                    };
                    img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%
                    }
                }
		    };
            .collection-story-box {
                width: 94%;
                margin: 0 auto;
                margin-top: 10px;
                padding: 8px;
                box-sizing: border-box;
                background: @color-block;
                border-radius: 14px;
                .img-box {
                    width: 100%;
                    margin: 0 auto;
                    img {
                        pointer-events: none;
                        width: 100%;
                        vertical-align: bottom;
                        margin-top: -1px;
                        &:first-child {
                            margin-top: 0
                        }
                    }
                };
                .publisher-title {
                    padding-left: 10px;
                    font-size: 14px;
                    color: #fff;
                    width: 100%;
                    margin-top: 14px;
                    box-sizing: border-box;
                    span {
                        display: inline-block;
                        width: 100%;
                        .no-wrap()
                    }
                }
            };
            .content-middle {
                width: 94%;
                margin: 0 auto;
                background: @color-block;
                padding: 8px 10px;
                margin-top: 20px;
                box-sizing: border-box;
                border-radius: 14px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                .framer {
                    display: flex;
                    flex-flow: row nowrap;
                    flex: 1;
                    > div {
                        &:first-child {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            margin-right: 10px;
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%
                            }
                        };
                        &:last-child {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            flex: 1;
                            width: 0;
                            span {
                                color: #FFFFFF;
                                .no-wrap();
                                &:first-child {
                                    font-size: 17px;
                                    margin-bottom: 4px;
                                };
                                &:last-child {
                                    font-size: 14px;
                                    color: #686866;
                                }
                            }
                        }
                    }
                };
                .focus-box {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 50px;
                    text-align: center;
                    margin-left: 10px;
                    span {
                        display: inline-block;
                        font-size: 12px;
                        height: 20px;
                        line-height: 20px;
                        background: #febd42;
                        border-radius: 20px
                    }
                }
            };
            .purchase-information {
                width: 94%;
                margin: 0 auto;
                margin-top: 10px;
                padding: 8px 18px;;
                box-sizing: border-box;
                background: @color-block;
                border-radius: 14px;
                .information-title {
                    span {
                        color: #fff;
                        font-size: 13px
                    }
                };
                .issure-title {
                    margin-top: 14px;
                    line-height: 20px;
                    p {
                        font-size: 13px;
                        color: #686868;
                        text-align: justify
                    }
                }	
            };
            .blockchain-server {
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 100px
                };
                span {
                    margin-left: 8px;
                    font-size: 10px;
                    color: #c2c2c2;
                    margin-top: 1px;
                }
            }
        };
		.content-bottom {
            background: #00020f;
			height: 80px;
			width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
			margin-top: 10px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;
			> div {
				&:first-child {
					font-size: 18px;
					height: 50px;
					line-height: 50px;
					color: #FFFFFF
				};
				&:last-child {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
                    font-size: 14px;
					align-items: center;
					background: #272833;
					width: 140px;
					padding: 8px 0;
					box-sizing: border-box;
					height: 50px;
					border-radius: 26px;
					color: #FFFFFF;
                    /deep/ .van-count-down {
                        color: #FFFFFF;
                    }
				}
			}
            .sellStyle {
                justify-content: center !important;
                font-size: 18px !important
            };
            .purchaseStyle {
                background: #bd68ff !important
            }
		}
	}
</style>

