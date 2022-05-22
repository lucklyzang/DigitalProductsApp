<template>
  <div class="page-box">
    <van-loading type="spinner" v-show="loadingShow"/>
    <van-nav-bar :border="false"
        :placeholder="true"
        :fixed="true"
        z-index="1000"
        :safe-area-inset-top="true"
        @click-left="onClickLeft"
    >
        <template #left>
            <p>
                <img :src="blockchainPng" alt="">
                <span>区块链地址</span>
            </p>
        </template>
    </van-nav-bar>
    <van-pull-refresh
        v-model="isRefresh"
        pulling-text="下拉刷新"
        loosing-text="释放立即刷新"
        success-text="刷新成功"
        @refresh="onRefresh"
    >  
        <div class="content-box">
            <div class="content-top">
                <div class="person-message-box">
                <div class="message-left" @click="toEditPersonPage">
                    <div class="person-picture">
                    <img :src="notLoginPng" v-show="!isLogin" alt="">
                    <img :src="defaultPersonPng" v-show="isLogin && userInfo && !userInfo.hasOwnProperty('avatarUrl') || isLogin && userInfo && userInfo.hasOwnProperty('avatarUrl') && !userInfo.avatarUrl" alt="">
                    <img :src="userInfo && userInfo.avatarUrl" v-show="isLogin && userInfo && userInfo.hasOwnProperty('avatarUrl') && userInfo.avatarUrl" alt="">
                    </div>
                    <div class="person-name">
                        <div class="top">
                            <div v-if="isLogin">{{userInfo && userInfo.nickName}}</div>
                            <div v-else>未登录</div>
                        </div>
                        <div class="bottom">
                            <span v-show="!isLogin">登录后可以查看更多数字藏品</span>
                            <span v-show="userInfo && !userInfo.signTxt && isLogin">TA很神秘,什么都没有留下</span>
                            <span v-show="userInfo && userInfo.signTxt && isLogin">{{userInfo && userInfo.signTxt}}</span>
                        </div>
                    </div>
                </div>
                </div>
                <div class="function-zone">
                    <div class="function-zone-icon-list" v-for="(item,index) in zoneIconList" :key="index" @click="featureSetTopEvent(item)">
                        <img :src="item.icon" alt="">
                        <span>{{item.span}}</span>
                    </div>
                </div>
            </div>
            <div class="content-bottom">
                    <div class="nick-name" v-for="(item,index) in featureSetList" :key="index" @click="featureSetEvent(item)">
                        <div class="left">
                            <img :src="item.iconLeft" alt="">
                            <span>{{item.span}}</span>
                        </div>
                        <div class="right">
                            <div>
                                <img :src="item.iconRight" alt="">
                            </div>
                        </div>
                    </div>
            </div>
            <div class="blockchain-server">
                <p>
                    <img :src="blockchainServePng" alt="">
                    <span>提供技术支持</span>
                </p>
                <p>
                    中国传统文化数字艺术联盟监制
                </p>
            </div>
        </div>
    </van-pull-refresh>  
    <FooterBottom></FooterBottom>  
  </div>
</template>
<script>
    import FooterBottom from '../components/FooterBottom'
    import NavBar from '@/components/NavBar'
    import {
        mapGetters,
        mapMutations
    } from 'vuex'
    import {
        inquareUserInfo,
        appShare
    } from '@/api/products.js'
    import {
        IsPC
    } from '@/common/js/utils'
    export default {
        name: 'Home',
        components: {
            FooterBottom,
            NavBar
        },
        data() {
            return {
                isRefresh: false,
                isDisabled: false,
                timer: null,
                loadingShow: false,
                zoneIconList: [{
                    icon: require("@/common/images/login/my-order.png"),
                    span: '我的订单'
                }, {
                    icon: require("@/common/images/login/collection-record.png"),
                    span: '藏品记录'
                }, {
                    icon: require("@/common/images/login/message.png"),
                    span: '消息'
                }, {
                    icon: require("@/common/images/login/set.png"),
                    span: '设置'
                }],
                featureSetList: [{
                    iconLeft: require("@/common/images/login/account-security.png"),
                    iconRight: require("@/common/images/login/arrow-right.png"),
                    span: '账号与安全'
                }, {
                    iconLeft: require("@/common/images/login/my-service.png"),
                    iconRight: require("@/common/images/login/arrow-right.png"),
                    span: '客服'
                }, {
                    iconLeft: require("@/common/images/login/about.png"),
                    iconRight: require("@/common/images/login/arrow-right.png"),
                    span: '关于'
                }, {
                    iconLeft: require("@/common/images/login/my-share.png"),
                    iconRight: require("@/common/images/login/arrow-right.png"),
                    span: '分享'
                }],
                defaultPersonPng: require("@/common/images/home/default-person.jpg"),
                notLoginPng: require("@/common/images/login/not-login.png"),
                blockchainPng: require("@/common/images/home/blockchain.png"),
                blockchainServePng: require("@/common/images/home/blockchain-service.png")
            }
        },

        mounted() {
            // 控制设备物理返回按键
            if (!IsPC()) {
                pushHistory();
                this.gotoURL(() => {
                    pushHistory();
					this.$router.push({
						path: '/myInfo'
					})
                })
            };
            if (this.isLogin) {
                if (!this.userInfo) {
                    this.queryuserInfo()
                }
            }
        },

        beforeDestroy() {
            console.log(this.timer);
            if(this.timer) { 
                clearTimeout(this.timer)
            };
            console.log(this.timer);
        },

        // created(){
        //     document.body.addEventListener('touchmove', this.eventListenerHandle, {
        //         passive: false
        //     })
        // },

        //页面离开销毁监听事件
        // destroyed(){
        //     document.body.removeEventListener('touchmove',this.eventListenerHandle,{
        //         passive: false
        //     })
        // },

        watch: {},

        computed: {
            ...mapGetters([
                'userInfo',
                'isLogin'
            ])
        },

        beforeRouteEnter(to, from, next) {
            next()
        },

        beforeRouteLeave(to, from, next) {
            next()
        },

        methods: {
            ...mapMutations([
                'storeUserInfo',
                'changeIsEnterLoginPageSource'
            ]),

            eventListenerHandle(e){
                if(e._isScroller) return;
                e.preventDefault()
            },

            juddgeIspc() {
                return IsPC()
            },

            toEditPersonPage() {
                if (!this.isLogin) {
                    this.changeIsEnterLoginPageSource('/myInfo');
                    this.$router.push({
                        path: '/login'
                    })
                }
            },

            toSetPage() {},

            //我的页面下拉刷新事件
            onRefresh () {
                if (!this.isLogin) { this.isRefresh = false; return };
                this.queryuserInfo()
            },

            // 上部区域功能事件
            featureSetTopEvent(item) {
                if (!this.isLogin) {
                    this.changeIsEnterLoginPageSource('/myInfo');
                    this.$router.push({
                        path: '/login'
                    });
                    return
                };
                if (item.span === '我的订单') {
                    this.$router.push({
                        path: 'myOrderForm'
                    })
                } else if (item.span === '藏品记录') {
                    this.$router.push({
                        path: 'collectionRecords'
                    })
                } else if (item.span === '设置') {
                    this.$router.push({
                        path: 'systemSet'
                    })
                } else if (item.span === '消息') {
                    this.$router.push({
                        path: 'systemMessage'
                    })
                }
            },

            //区块链点击事件
            onClickLeft () {
                 if (!this.isLogin) {
                    this.changeIsEnterLoginPageSource('/myInfo');
                    this.$router.push({
                        path: '/login'
                    });
                    return
                };
                this.$router.push({path: '/blockchainAddress'})
            },

            // 下部区域功能事件
            featureSetEvent(item) {
                if (!this.isLogin) {
                    this.changeIsEnterLoginPageSource('/myInfo');
                    this.$router.push({
                        path: '/login'
                    });
                    return
                };
                if (item.span === '账号与安全') {
                    this.$router.push({
                        path: 'accountSecurity'
                    })
                } else if (item.span === '关于') {
                     this.$router.push({
                        path: 'aboutUs'
                    })
                } else if (item.span == '分享') {
                    if(this.isDisabled) return;
                    this.isDisabled = !this.isDisabled;
                    this.timer = setTimeout(() => {this.isDisabled = !this.isDisabled;},3000);
                    this.myShareEvent()
                }
            },

            // 查询用户信息
            queryuserInfo() {
                inquareUserInfo().then((res) => {
                        this.isRefresh = false;
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
                        this.isRefresh = false;
                        this.$toast({
                            message: `${err.message}`,
                            position: 'bottom'
                        })
                    })
            },

            // App分享
            appShareEvent() {
                return new Promise((resolve,rejrect) => {
                    this.loadingShow = true;
                    appShare().then((res) => {
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

            async myShareEvent () {
                let shareUrl = await this.appShareEvent();
                window.android.setShareUrl(`${shareUrl}`)
            }
        }
    }
</script>
<style lang='less' scoped>
    @import "../common/stylus/variable.less";
    @import "../common/stylus/mixin.less";
    @import "../common/stylus/modifyUi.less";
    .page-box {
        .content-wrapper();
        background: @color-background;
        /deep/ .van-nav-bar {
            background: @color-background;
            .van-icon-arrow-left {
                color: #fff !important;
                font-size: 24px !important
            };
            .van-nav-bar__left {
                p {
                    padding: 1px 8px;
                    background: rgba(81, 81, 81, 0.54);
                    border-radius: 20px;
                    display: flex;
                    flex-flow: row nowrap;
                    box-sizing: border-box;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 20px;
                        height: 22px;
                        margin-right: 4px
                    };
                    span {
                        color: #f0c596;
                        font-size: 10px
                    }
                }
            }
        };
        /deep/ .van-pull-refresh {
            flex: 1;
            display: flex;
            .van-pull-refresh__track {
                flex: 1;
                height: auto;
            }
        };
        .content-box {
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            .content-top {
                height: auto;
                font-size: 14px;
                background: @color-background;
                .person-message-box {
                    width: 92%;
                    margin: 0 auto;
                    height: 120px;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    .message-left {
                        flex: 1;
                        padding-left: 6px;
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: center;
                        .person-picture {
                            width: 70px;
                            height: 70px;
                            border-radius: 50%;
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%
                            }
                        }
                        ;
                        .person-name {
                            color: #fff;
                            height: 80px;
                            margin-left: 10px;
                            font-size: 20px;
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            width: 0;
                            .top {
                                >div {
                                    .no-wrap()
                                }
                            }
                            ;
                            .bottom {
                                font-size: 12px;
                                display: flex;
                                flex-flow: row nowrap;
                                margin-top: 4px;
                                color: #989898;
                                span {
                                    display: inline-block;
                                    height: 26px;
                                    text-align: center;
                                    line-height: 26px;
                                    width: 100%;
                                    text-align: left;
                                    .no-wrap()
                                }
                            }
                        }
                    }
                }
                ;
                .function-zone {
                    width: 92%;
                    margin: 0 auto;
                    height: 75px;
                    background: @color-block;
                    border-radius: 15px;
                    display: flex;
                    flex-flow: row wrap;
                    .function-zone-icon-list {
                        flex: 1;
                        height: 75px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        img {
                            width: 30px;
                        };
                        span {
                            font-size: 12px;
                            color: #989898;
                            margin-top: 10px;
                        }
                    }
                }
            };
            .content-bottom {
                font-size: 13px;
                position: relative;
                display: flex;
                flex-direction: column;
                width: 92%;
                margin: 0 auto;
                margin-top: 10px;
                padding: 0 6px 6px 6px;
                box-sizing: border-box;
                .nick-name {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                    height: 46px;
                    padding: 6px;
                    background: @color-block;
                    margin-bottom: 10px;
                    border-radius: 10px;
                    .left {
                        font-size: 16px;
                        color: #FFFFFF;
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: space-between;
                        >span {
                            margin-left: 16px;
                        }
                        ;
                        img {
                            width: 18px;
                            height: 18px
                        }
                    };
                    .right {
                        >div {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            img {
                                width: 8px
                            }
                        }
                    }
                }
            };
            .blockchain-server {
                position: absolute;
                bottom: 10px;
                left: 0;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                >p {
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:nth-child(1) {
                        img {
                            width: 100px
                        };
                        span {
                            margin-left: 8px;
                            margin-top: 1px;
                            font-size: 10px;
                            color: #c2c2c2
                        }
                    };
                    &:nth-child(2) {
                        font-size: 10px;
                        color: #c2c2c2
                    };
                }
            }
        }
    }
</style>