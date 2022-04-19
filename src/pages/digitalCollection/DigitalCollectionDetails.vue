<template>
	<div class="page-box">
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
                    <img :src="digitalCollectioUrl">
                </div>
                <div class="booth">
                    <img :src="boothPng" alt="">
                </div>
                <div class="synopsis">
                    <div class="title">
                        <span>
                            新疆喀纳斯之秋新疆喀纳斯之秋
                        </span>
                    </div>
                    <div class="number">
                        <div class="left">
                            <span>属性一</span>
                            <span>属性一</span>
                            <span>属性一</span>
                            <span>属性一</span>
                            <span>属性一</span>
                            <span>属性一</span>
                        </div>
                        <div class="right">
                            <span>限量</span>
                            <span>8000 份</span>
                        </div>
                    </div>
                    <img :src="detailsTitleWrappper" alt="">
                </div>
            </div>
            <div class="content-middle">
                <div class="framer" @click="toWorkRoomEvent">
                    <div>
                        <img :src="digitalCollectioUrl">
                    </div>
                    <div>
                        <span>乔玲</span>
                        <span>作品</span>
                    </div>
                </div>
                <div class="focus-box">
                    <span>关注</span>
                </div>
            </div>
            <div class="collection-story-box">
                <div class="img-box">
                    <img :src="digitalCollectioUrl">
                </div>
                <div class="issure-title">
                    <span>发行方: 桃花传媒有限公司</span>
                </div>
            </div>
            <div class="purchase-information">
                <div class="information-title">
                    <span>购买须知:</span>
                </div>
                <div class="issure-title">
                    <p>
                        数字藏品为虚拟数字商品,而非实物,仅限实名认证为年满14周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有。
                    </p>
                </div>
            </div>
        </div>
        <div class="content-bottom">
			<div>
				<span>¥ 59.90</span>
			</div>
			<div>
				<span>即将开售</span>
				<span>03:05:28</span>
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
	import {
	} from '@/api/login.js'
	export default {
		components: {
		},
		data() {
			return {
                digitalCollectioUrl: require("@/common/images/home/default-person.jpg"),
                sharePng: require("@/common/images/login/my-share.png"),
                boothPng: require("@/common/images/home/booth.png"),
                detailsTitleWrappper: require("@/common/images/home/details-title-wrapper.png")
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

			toWorkRoomEvent() {
                this.$router.push({path: 'workRoom'})
            },

            onClickLeft () {
                this.$router.push({path: 'home'})
            },

            onClickRight () {}
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
            background: @color-background;
            .van-icon-arrow-left {
                color: #fff !important;
                font-size: 24px !important
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
            background: @color-background;
            padding-bottom: 80px;
            box-sizing: border-box;
            .content-top {
                .collection-exhibition {
                    height: 450px;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%
                    }
                };
                .booth {
                    width: 92%;
                    margin: 0 auto;
                    margin-top: 20px;
                    height: 50px;
                    img {
                        width: 100%;
                        height: 100%
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
                        justify-content: space-between;
                        align-items: center;
                        .left {
                            width: 50%;
                            height: 40px;
                            overflow: auto;
                            margin-right: 12px;
                            display: flex;
                            flex-flow: row wrap;
                            align-items: center;
                            z-index: 1000;
                            span {
                                display: inline-block;
                                padding: 0 6px;
                                height: 20px;
                                border: 1px solid #be68ff;
                                font-size: 10px;
                                border-radius: 10px;
                                text-align: center;
                                line-height: 20px;
                                margin-right: 4px;
                                margin-bottom: 4px;
                                color: #be68ff;
                                &:nth-child(even) {
                                    margin-right: 0
                                }
                            }
                        }
                        .right {
                            width: 50%;
                            height: 40px;
                            line-height: 40px;
                            font-size: 0;
                            display: flex;
                            flex-flow: row nowrap;
                            align-items: center;
                            justify-content: flex-end;
                            span {
                                font-size: 14px;
                                display: inline-block;
                                height: 20px;
                                line-height: 20px;
                                &:first-child {
                                    background: #ffbc41;
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
                    };
                    img {
                        position: absolute;
                        top: 0;
                        left: 10%;
                        width: 80%;
                        height: 80px
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
                    height: 350px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                };
                .issure-title {
                    padding-left: 10px;
                    font-size: 14px;
                    color: #fff;
                    margin-top: 14px
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
                    > div {
                        &:first-child {
                            width: 45px;
                            height: 45px;
                            border-radius: 50%;
                            margin-right: 10px;
                            img {
                                height: 100%;
                                width: 100%;
                                border-radius: 50%;
                            }
                        };
                        &:last-child {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            span {
                                color: #FFFFFF;
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
                    span {
                        display: inline-block;
                        font-size: 12px;
                        height: 20px;
                        line-height: 20px;
                        padding: 0 10px;
                        margin-left: 10px;
                        background: #ffbc41;
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
                        color: #9c9c9c;
                        text-align: justify
                    }
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
            align-items: flex-start;
            padding: 10px 20px;
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
					background: #282834;
					width: 140px;
					padding: 8px 0;
					box-sizing: border-box;
					height: 50px;
					border-radius: 26px;
					color: #FFFFFF
				}
			}
		}
	}
</style>

