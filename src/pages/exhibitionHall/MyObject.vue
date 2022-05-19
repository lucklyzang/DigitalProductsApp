<template>
	<div class="content-box">
        <van-loading type="spinner" v-show="loadingShow"/>
        <div class="my-hall">
            <div class="my-hall-content">
                <img :src="notLoginPng" alt="">
                <div class="hall-tit">
                    <span>我的展馆</span>
                    <span>NO.0000039586</span>
                </div>
                <div class="hall-wraper">
                    <div class="create-hall" @click="createHallEvent" v-show="queryHallMessage && queryHallMessage.type == -1">
                        <span>创建展览</span>
                        <p>
                            <van-icon name="arrow" size="10" color="#f2c898"/>
                        </p>
                    </div>
                    <div class="create-hall enter-hall" @click="enterHallEvent" v-show="queryHallMessage && queryHallMessage.type != -1">
                        <span>进入展馆</span>
                         <p>
                            <van-icon name="arrow" size="10" color="#f2c898"/>
                        </p>
                    </div>
                    <div class="create-hall edit-hall" @click="createHallEvent" v-show="queryHallMessage && queryHallMessage.type != -1">
                        <span>编辑展馆</span>
                         <p>
                            <van-icon name="arrow" size="10" color="#f2c898"/>
                        </p>
                    </div>
                </div>    
            </div>
        </div>
        <div class="my-object" ref="myObject"
            @touchstart="touchstartHandle"
            @touchmove="touchmoveHandle"
        >
            <van-loading type="spinner" v-show="loadingShow"/>
            <van-empty :description="descriptionContent" v-show="emptyShow" />
            <div class="object-tit">我的藏品</div>
            <div class="object-list-box">
                <div class="object-list" v-for="(item,index) in orderList" :key="index">
                    <div class="img-show" v-lazy-container="{ selector: 'img' }" :style="{background: 'url(' + imgBorderImg+ ') no-repeat center center' }">
						<img :data-src="item.collectionUrl">
					</div>
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
        <FooterBottom></FooterBottom>   
	</div>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import {queryObjectRecord,queryHallMessage} from '@/api/products.js'
    import FooterBottom from '@/components/FooterBottom'
	export default {
        name: 'MyObject',
		components: {
            FooterBottom
		},
		data() {
			return {
                isShowLoadFail: false,
                myObjectOffsetTop: '',
				emptyShow: false,
                moveInfo: {
                    startY: 0,
                    y: 0
                },
                loadingShow: false,
				descriptionContent: '暂无藏品',
                orderList: [],
                hallBothPng: require("@/common/images/home/hall-both.png"),
                blockchainPng: require("@/common/images/home/hall-chain.png"),
                notLoginPng: require("@/common/images/login/not-login.png"),
                imgBorderImg: require("@/common/images/home/img-border.png")
			}
		},
		onReady() {},
		computed: {
			...mapGetters([
                'userInfo',
                'isLogin',
                'queryHallMessage'
			])
		},
		mounted() {
            this.myObjectOffsetTop = this.$refs.myObject.offsetTop;
            // 查询藏品记录
			this.queryCollectionRecords();
            // 查询展馆信息
            this.queryHallMessageEvent()
		},
		methods: {
			...mapMutations([
                'changeQueryHallMessage'
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

            // 查询展馆信息
            queryHallMessageEvent () {
                queryHallMessage().then((res) => {
					if (res && res.data.code == 0) {
                        this.changeQueryHallMessage(res.data.data)
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

            // 创建展馆事件
            createHallEvent () {
                this.$router.push({path: '/createHall'})
            },
            // 进入我的展馆
            enterHallEvent () {
                this.$router.push({path: '/myObjectDetails'})
            },

            // 滑动开始
            touchstartHandle(e) {
                this.moveInfo.startY = e.targetTouches[0].pageY;
                this.moveInfo.y = this.$refs.myObject.offsetTop;
            },
            
            // 滑动中
            touchmoveHandle(e) {
                let moveY = e.targetTouches[0].pageY - this.moveInfo.startY;
                //上滑
                if (moveY < 0) {
                    if (this.$refs.myObject.offsetTop <= 0) {
                        this.$refs.myObject.style.top = 0 + 'px'
                        this.moveInfo.y = this.$refs.myObject.offsetTop;
                        this.moveInfo.startY = e.targetTouches[0].pageY;
                        return
                    }
                    if (this.$refs.myObject.offsetTop > 0) {
                        this.$refs.myObject.style.top = this.moveInfo.y - Math.abs(moveY) + 'px'
                    }
                } else {
                    if (this.$refs.myObject.offsetTop >= this.myObjectOffsetTop) {
                        this.$refs.myObject.style.top = this.myObjectOffsetTop + 'px';
                        this.moveInfo.y = this.$refs.myObject.offsetTop;
                        this.moveInfo.startY = e.targetTouches[0].pageY;
                        return
                    }
                    if (this.$refs.myObject.offsetTop < this.myObjectOffsetTop) {
                        this.$refs.myObject.style.top = this.moveInfo.y + moveY + 'px'
                    }    
                };
                e.preventDefault()
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
                            font-size: 18px;
                            margin-bottom: 6px
                        };
                        &:last-child {
                            color: rgb(156, 154, 154);
                            font-size: 14px
                        }
                    }
                };
                .hall-wraper {
                    position: absolute;
                    width: 100%;
                    height: 80px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .create-hall {
                        border: 2px solid #fff;
                        width: 160px;
                        height: 35px;
                        padding: 0 10px 0 30px;
                        box-sizing: border-box;
                        border-radius: 20px;
                        background-image: linear-gradient(to right, #faddbf, #e7bc91);
                        color: #fff;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        >span {
                            font-size: 14px;
                            z-index: 1
                        };
                        >p {
                            width: 35px;
                            height: 18px;
                            border-radius: 10px;
                            display: flex;
                            background: #fff;
                            flex-flow: row nowrap;
                            justify-content: center;
                            align-items: center;
                            /deep/ .van-icon {
                        
                            }
                        }
                    };
                    .edit-hall {
                        margin-top: 10px
                    }
                }    
            }
        };
        .my-object {
            width: 100%;
            position: fixed;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            padding: 20px 20px 50px 20px;
            box-sizing: border-box;
            top: 200px;
            left: 0;
            background: #373737;
            display: flex;
            height: 100vh;
            overflow: auto;
            z-index: 100;
            flex-direction: column;
            .object-tit {
                text-align: center;
                height: 50px;
                line-height: 50px;
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
                    margin-right: 10%;
                    margin-bottom: 5%;
                    &:nth-child(even) {
                        margin-right: 0
                    }
                }
                .object-list {
                    width: 45%;
                    border-radius: 10px;
                    padding-bottom: 10px;
                    box-sizing: border-box;
                    .img-show {
                        position: relative;
                        width: 100%;
                        padding: 6px;
                        border-radius: 10px;
                        box-sizing: border-box;
                        > img {
                            border-radius: 6px;
                            width: 100%;
                        }
                    };
                    >p {
                        width: 100%;
                        padding: 0 6px;
                        box-sizing: border-box;
                    }
                    .author {
                        font-size: 12px;
                        color: #fff;
                        margin: 8px 0;
                        .no-wrap()
                    };
                    .chain {
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: center;
                        height: 28px;
                        margin-top: 12px;
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: center;
                        position: relative;
                        .blockchain-img {
                            width: 26px;
                            height: 28px;
                            position: absolute;
                            top: 1px;
                            left: 0;
                            img {
                                width: 26px;
                                height: 28px
                            }
                        };
                        .blockchain-chain {
                            display: inline-block;
                            padding: 0 6px 0 12px;
                            flex: 1;
                            border-radius: 10px;
                            font-size: 10px;
                            box-sizing: border-box;
                            height: 16px;
                            line-height: 16px;
                            margin-left: 8px;
                            background-image: linear-gradient(to right, #fbd2a5, #f1c593);
                            color: #9f7c0f;
                            .no-wrap()
                        }
                    }
                    .publisher {
                        font-size: 11px;
                        color: #cecbcb;
                        .no-wrap()
                    }
                }
            }
        }
	}
</style>





