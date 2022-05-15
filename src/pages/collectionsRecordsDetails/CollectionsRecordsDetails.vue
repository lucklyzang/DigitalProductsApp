<template>
	<div class="page-box">
        <NavBar path="/collectionRecords" title="藏品详情"/>
        <!-- <van-loading type="spinner" v-show="loadingShow"/> -->
        <div class="content" id="top-content">
            <div class="content-top">
                <div class="collection-exhibition">
                    <div class="loading-img-wrapper">
                        <img :src="imgLoadingGif" v-show="loadingImgGifShow || threeDimensionalShow" class="loading-img">
                    </div>
                    <div class="abbr-img">
                        <img :src="collectionRecordDetails.path" v-show="!loadingImgGifShow">
                    </div>
                    <!-- <div class="three-dimensional-img" v-show="!loadingImgGifShow">
                        <model-obj  :controlsOptions="{enableRotate:false,enableZoom:false}" 
                            :rotation="rotation"
                            @on-error="threeDimensionalError" 
                            @on-load="threeDimensionalLoaded"
                            @on-progress="threeDimensionProgress" 
                            src="static/models/testTwo.obj" 
                            :width="180" :height="230" 
                            :backgroundAlpha="1" 
                            backgroundColor="#020416">
                        </model-obj>
                    </div> -->
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
                        <div class="number-content">
                            <span class="blockchain-img">
                                <img :src="blockchainPng" alt="">
                            </span>
                            <span class="blockchain-chain">{{collectionRecordDetails.chain}}</span>
                        </div>    
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
        <div class="content-bottom" v-show="false">
            <div>
                <van-icon name="award" />
                <span>炫耀</span>
            </div>
            <div  @click="donationFriendEvent">
                <van-icon name="printer" />
                <span>转增</span>
            </div>
            <div @click="useObjectImgEvent">
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
	import {queryObjectRecordDetails,useObjectImg} from '@/api/products.js'
    import {
        ModelObj
    } from "vue-3d-model";
	export default {
        name: 'CollectionsRecordsDetails',
		components: {
            NavBar,
            ModelObj
		},

		data() {
			return {
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                loadingShow: false,
                loadingImgGifShow: false,
                threeDimensionalShow: false,
                collectionRecordDetails: {},
                isCountDownShow: true,
                imgLoadingGif: require("../../../static/img/img-loading.gif"),
                blockchainPng: require("@/common/images/home/blockchain.png"),
                sharePng: require("@/common/images/login/my-share.png"),
                boothPng: require("@/common/images/home/booth.png"),
                detailsTitleWrappper: require("@/common/images/home/details-title-wrapper.png"),
                  lights: [
                    {
                        type: 'HemisphereLight',
                        position: { x: 0, y: 1, z: 0 },
                        skyColor: 0xffffff,
                        groundColor: 0xFF0000, // 此代码为灯光后颜色
                        intensity: 1,
                    },
                    {
                        type: 'DirectionalLight',
                        position: { x: 1, y: 1, z: 1 },
                        color: 0xffffff,
                        intensity: 0.8
                    },
                    {
                        type: 'DirectionalLight',
                        position: { x: -1, y: 1, z: 1 },
                        color: 0xffffff,
                        intensity: 0.8
                    },
                    {
                        type: 'DirectionalLight',
                        position: { x: 1, y: 1, z: -1 },
                        color: 0xffffff,
                        intensity: 0.8
                    },
                    {
                        type: 'DirectionalLight',
                        position: { x: -1, y: 1, z: -1 },
                        color: 0xffffff,
                        intensity: 0.8
                    },
                    {
                        type: 'DirectionalLight',
                        position: { x: 0, y: -1, z: 0 },
                        color: 0xffffff,
                        intensity: 0.8
                    }
                ]
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
            this.toTop();
            this.queryCollectionDetails()
		},

		methods: {
			...mapMutations([
                'changeDonationProductDetails'
			]),

            rotate () {
                this.rotation.y += 0.01;
                requestAnimationFrame(this.rotate)
            },

            //让页面滚动到顶部
            toTop() {
                document.querySelector('#top-content').scrollIntoView(true)
            },

            //3d模型加载完成事件
            threeDimensionalLoaded () {
                this.threeDimensionalShow = false;
                this.rotate()
            },

            //3d模型加载过程
            threeDimensionProgress () {
            },

            //3d模型加载失败
            threeDimensionalError () {
                this.threeDimensionalShow = false;
                this.$toast({
                    message: '3D模型加载失败!',
                    position: 'bottom'
                })
            },

            // 查询藏品详情
            queryCollectionDetails () {
                this.loadingImgGifShow = true;
                queryObjectRecordDetails(this.collectionId.id).then((res) => {
                    this.loadingImgGifShow = false;
                    if (res && res.data.code == 0) {
                        this.collectionRecordDetails = res.data.data;
                        this.changeDonationProductDetails(res.data.data);
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
            },

            //查询下载图片地址
            queryObjectImgInfo () {
                return new Promise((resolve,rejrect) => {
                    this.loadingShow = true;
                    useObjectImg(this.collectionId.id).then((res) => {
                        console.log('图片地址',res);
                        this.loadingShow = false;
                        if (res && res.data.code == 0) {
                            resolve(res.data.url)
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

            // 使用图片
            async useObjectImgEvent () {
                // let imgUrl = await this.queryObjectImgInfo();
                let dataUrl = 'http://fidesum-1256093638.cos.ap-beijing.myqcloud.com/nft/20220426/da69239006614fbba310ed2423cecd80.jpg';
                this.getUrlBase64(dataUrl).then((base64) => {
                    let a = document.createElement("a");
                    a.style.display = "none";
                    a.download = 'img';
                    a.href = base64;
                    document.body.appendChild(a);
                    a.click();
                })
            },

            getUrlBase64(url) {
                return new Promise((resolve) => {
                    let canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");
                    let img = new Image();
                    img.setAttribute("crossOrigin", "anonymous"); //允许跨域
                    img.src = url;
                    img.onload = function () {
                        canvas.height = 300;
                        canvas.width = 300;
                        ctx.drawImage(img, 0, 0, 300, 300);
                        let dataURL = canvas.toDataURL("image/png");
                        canvas = null;
                        resolve(dataURL);
                    }
                });
            },    

            // 转增好友藏品
            donationFriendEvent () {
                 this.$router.push({
                    path: '/donationFriend'
                })
            }
		}
	}
</script>

<style lang="less" scoped>
	@import "~@/common/stylus/variable.less";
    @import "~@/common/stylus/mixin.less";
    @import "~@/common/stylus/modifyUi.less";
    @keyframes product-animation{
        0% {
            transform: rotateY(15deg)
        }
        50% {
            transform: rotateY(-15deg)
        }
        100% {
            transform: rotateY(15deg)
        }
    };
	.page-box {
		.content-wrapper();
        background: @color-background;
        /deep/ .van-nav-bar {
            .van-icon {
                color: #fff !important;
                font-size: 18px !important
            };
            .van-nav-bar__title {
                color: #fff !important;
                font-size: 16px !important
            }
        };
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-bottom: 80px;
            box-sizing: border-box;
            .content-top {
                .collection-exhibition {
                    width: 80%;
                    // perspective: 400px;
                    // perspective-origin: 50% 50%;
                    // transform-style: preserve-3d;
                    margin: 0 auto;
                    position: relative;
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    justify-content: center;
                    height: 50vh;
                    img {
                        pointer-events: none;
                        width: 100%
                    };
                    .abbr-img {
                        width: 250px;
                        margin-top: 60px;
                        // animation-name: product-animation;
                        // animation-duration: 14s;
                        // animation-iteration-count: infinite;
                    };
                    .three-dimensional-img {
                        margin-top: 60px;
                    };
                    .loading-img-wrapper {
                        position: absolute;
                        width: 100px;
                        height: 100px;
                        top: 50%;
                        transform: translateY(-50%);
                        .loading-img {
                            width: 100px;
                        }
                    };    
                    .loading-img {
                        width: 100px;
                    };
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
                    height: 80px;
                    margin: 0 auto;
                    margin-top: 20px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    .title {
                        width: 80%;
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
                        box-sizing: border-box;
                        height: 25px;
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: center;
                        align-items: center;
                        display: flex;
                        flex-flow: row nowrap;
                        .number-content {
                            position: relative;
                            .blockchain-img {
                                width: 30px;
                                position: absolute;
                                left: 0;
                                top: -6px;
                                img {
                                    width: 100%;
                                }
                            };
                            .blockchain-chain {
                                display: inline-block;
                                max-width: 200px;
                                padding: 0 16px;
                                border-radius: 10px;
                                margin-left: 17px;
                                font-size: 10px;
                                box-sizing: border-box;
                                line-height: 22px;
                                background-image: linear-gradient(to right, #9b45e0, #6c2ba0);
                                color: black;
                                .no-wrap()
                            }
                        }    
                    };
                    >img {
                        position: absolute;
                        top: 0;
                        left: 0%;
                        width: 100%
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
                font-size: 13px;
                align-items: center;
                >span {
                    margin-left: 4px
                }
            }
		}
	}
</style>

