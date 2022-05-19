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
        <van-loading type="spinner" v-show="loadingShow" color="#333" />
        <img :src="checkedTemplateImg" alt="" ref="backgroundImg">
		<div class="content" ref="content">
            <div class="content-center"
                ref="contentCenter"
                @touchstart="touchstartHandle"
                @touchmove="touchmoveHandle"
            >
                <div class="content-left" ref="contentLeft">
                    <div class="title">
                        纪元
                    </div>
                    <div class="introduce">
                        NFT宇宙藏品玩家
                    </div>
                </div>
                <div class="content-right">
                   <div class="exhibition-list" v-for="(item,index) in orderList" :key="index" :ref="'exhibitionList'+ index">
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
                moveInfo: {
                    startX: 0,
                    x: 0,
                    imgX: 0
                },
                myObjectOffsetLeft: '',
                isRenderComplete: false,
                backgroundImgLeft: '',
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
            this.myObjectOffsetLeft = this.$refs.contentCenter.offsetLeft;
            this.backgroundImgLeft = this.$refs.backgroundImg.offsetLeft;
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
        updated() {
            if (this.isRenderComplete) {
                this.calculateContentWidth(this.orderList.length)
            }
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
                            });
                            this.isRenderComplete = true
                        };
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
            },

            // 计算展品总长度
            calculateContentWidth (length) {
                if (length == 0) {return};
                let rightWidth = 0;
                if (length == 1 || length == 2) {
                    rightWidth = this.$refs['exhibitionList0'][0].offsetWidth + 40
                } else {
                    let num = 0;
                    num = Math.ceil(length/2);
                    rightWidth = (this.$refs['exhibitionList0'][0].offsetWidth + 40)*num
                };
                this.$refs.contentCenter.style.width =  this.$refs.contentLeft.offsetWidth + rightWidth + 'px'
            },

            // 滑动开始
            touchstartHandle(e) {
                this.moveInfo.startX = e.targetTouches[0].pageX;
                this.moveInfo.x = this.$refs.contentCenter.offsetLeft;
                this.moveInfo.imgX = this.$refs.backgroundImg.offsetLeft
            },
            
            // 滑动中
            touchmoveHandle(e) {
                console.log(this.$refs.contentCenter.style.left);
                // 滑动距离
                let moveX = e.targetTouches[0].pageX - this.moveInfo.startX;
                //左滑
                if (moveX < 0) {
                    // 展品转动
                    if (this.$refs.contentCenter.offsetLeft <= -(this.$refs.contentCenter.offsetWidth-this.$refs.content.offsetWidth)) {
                        this.$refs.contentCenter.style.left = -(this.$refs.contentCenter.offsetWidth-this.$refs.content.offsetWidth) + 'px';
                        this.moveInfo.startX = e.targetTouches[0].pageX;
                        this.moveInfo.x = this.$refs.contentCenter.offsetLeft;
                        return
                    }
                    if (this.$refs.contentCenter.offsetLeft > -(this.$refs.contentCenter.offsetWidth-this.$refs.content.offsetWidth)) {
                        this.$refs.contentCenter.style.left = -this.moveInfo.x - Math.abs(moveX) + 'px'
                    };
                //     // 背景图转动
                //     if (this.$refs.backgroundImg.offsetLeft <= -500) {
                //         this.$refs.backgroundImg.style.left = -500 + 'px';
                //         this.moveInfo.startX = e.targetTouches[0].pageX;
                //         this.moveInfo.imgX = this.$refs.backgroundImg.offsetLeft
                //         return
                //     }
                //     if (this.$refs.backgroundImg.offsetLeft > -500) {
                //         this.$refs.backgroundImg.style.left = -this.moveInfo.x - (Math.abs(moveX)/2) + 'px';
                //     };
                // } else {
                //  //展品转动
                    if (this.$refs.contentCenter.offsetLeft >= this.myObjectOffsetLeft) {
                        this.$refs.contentCenter.style.left = this.myObjectOffsetLeft + 'px';
                        this.moveInfo.startX = e.targetTouches[0].pageX;
                        this.moveInfo.x = this.$refs.contentCenter.offsetLeft;
                        return
                    }
                    if (this.$refs.contentCenter.offsetLeft < this.myObjectOffsetLeft) {
                        this.$refs.contentCenter.style.right = this.moveInfo.X + moveX + 'px'
                    };
                //     // 背景图转动
                //     if (this.$refs.backgroundImg.offsetLeft >= this.backgroundImgLeft) {
                //         this.$refs.backgroundImg.style.left = this.backgroundImgLeft + 'px';
                //         this.moveInfo.startX = e.targetTouches[0].pageX;
                //         this.moveInfo.imgX = this.$refs.backgroundImg.offsetLeft
                //         return
                //     }
                //     if (this.$refs.backgroundImg.offsetLeft < this.backgroundImgLeft) {
                //         this.$refs.backgroundImg.style.left = this.moveInfo.x + (moveX/2) + 'px';
                //     };   
                };
                // e.preventDefault()
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
            width: 100%;
            .content-center {
                position: absolute;
                display: flex;
                flex-flow: row nowrap;
                top: 15vh;
                left: 0;
                height: 72vh;
                .content-left {
                    width: 220px;
                    display: flex;
                    height: 72vh;
                    padding-left: 40px;
                    box-sizing: border-box;
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
                    height: 72vh;
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    .exhibition-list {
                        width: 140px;
                        box-sizing: border-box;
                        height: 34vh;
                        margin-bottom: 2vh;
                        margin-right: 40px;
                        .exhibits-top {
                            position: relative;
                            // width: 100px;
                            height: 20vh;
                            padding: 5px;
                            // height: 110px;
                            margin: 0 auto;
                            box-sizing: border-box;
                            border-radius: 10px;
                            > img {
                                border-radius: 6px;
                                width: 100%;
                                height: 100%
                            }
                        };
                        .exhibits-line {
                            width: 140px;
                            height: 4vh;
                            margin-top: 8px;
                            img {
                                width: 140px
                            }
                        };
                        .exhibits-bottom {
                            height: 10vh;
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





