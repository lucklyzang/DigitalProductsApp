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
                <van-icon name="share-o" size="20" color="#9f9f9f" />
            </template>
        </van-nav-bar>
        <div class="content">
            <div class="content-top">
                <div class="collection-exhibition">
                    <img :src="digitalCollectioUrl">
                </div>
                <div class="synopsis">
                    <div class="title">
                        <span>
                            新疆喀纳斯之秋
                        </span>
                    </div>
                    <div class="number">
                        <div class="left">
                            <span>属性一</span>
                        </div>
                        <div class="right">
                            <span>限量</span>
                            <span>8000 份</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-middle">
                <div class="framer">
                    <div>
                        <img :src="digitalCollectioUrl">
                    </div>
                    <div>
                        <span>乔玲</span>
                        <span>作品2</span>
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
                digitalCollectioUrl: require("@/common/images/home/default-person.jpg")
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

			onClickLeft() {
                this.$router.push({path: 'home'})
            },

            onClickRight() {
                
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
            background: #252525;
            .van-icon-arrow-left {
                color: #fff !important;
                font-size: 24px !important
            }
        };
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #252525;
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
                }
                .synopsis {
                    width: 100%;
                    display: flex;
                    height: 80px;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: center;
                    .title {
                        font-size: 24px;
                        color: #FFFFFF;
                        font-weight: bold;
                    };
                    .number {
                        width: 180px;
                        font-size: 14px;
                        margin-top: 10px;
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: space-between;
                        align-items: center;
                        .left {
                            span {
                                display: inline-block;
                                padding: 0 6px;
                                height: 18px;
                                border: 1px solid #ab4eff;
                                font-size: 10px;
                                border-radius: 10px;
                                text-align: center;
                                line-height: 18px;
                                color: #ab4eff
                            }
                        }
                        .right {
                            font-size: 0;
                            span {
                                font-size: 14px;
                                display: inline-block;
                                &:first-child {
                                    background: orange;
                                    color: black;
                                    padding: 1px 4px 1px 4px;
                                    border-top-left-radius: 2px;
                                    border-bottom-left-radius: 2px;
                                };
                                &:last-child {
                                    background: #646363;
                                    color: #e3cd33;
                                    padding: 1px 4px 1px 4px;
                                    border-top-right-radius: 2px;
                                    border-bottom-right-radius: 2px
                                }
                            }
                        }
                    }
                }
		    };
            .collection-story-box {
                width: 94%;
                margin: 0 auto;
                margin-top: 10px;
                padding: 8px;
                box-sizing: border-box;
                background: #2a1f32;
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
                background: #2a1f32;
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
                                    color: #9c9c9c;
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
                        padding: 0 8px;
                        margin-left: 10px;
                        background: #ffc252;
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
                background: #2a1f32;
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
            background: #252525;
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
					justify-content: center;
					align-items: center;
					background: rgb(47 47 47);
					width: 180px;
					padding: 26px 0;
					box-sizing: border-box;
					height: 50px;
					border-radius: 26px;
					color: #FFFFFF
				}
			}
		}
	}
</style>

