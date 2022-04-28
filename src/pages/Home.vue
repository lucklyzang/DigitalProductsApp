<template>
  <div class="page-box">
    <NavBar :leftArrow="false" />
    <div class="content">
    <div class="rare-object">
        <img :src="homeBannerPng" alt="">
    </div>
      <van-sticky :offset-top="12">
        <div class="tab-switch">
          <span v-for="(item,index) in tabTitlelList" :key="index" @click="tabSwitchEvent(index)"
            :class="{'active-tab-style': index === currentTabIndex }"
          >
            {{
              item.name
            }}
          </span>
        </div>
      </van-sticky>
      <div class="switch-content">
        <van-loading type="spinner" v-show="loadingShow"/>
        <van-empty :description="descriptionContent" v-show="emptyShow" />
        <div class="object-box" v-show="currentTabIndex === 0 && !emptyShow">
          <div class="object-list" @click="objectDetailEvent(item,index)" v-for="(item,index) in digitalCollectionList" :key="index">
            <div class="sell-info-area">
              <div class="left" v-show="item.isShowCountDown && item.status == 0">
                <van-icon name="underway" size="14" color="#bd68ff" />
                <span>即将开售</span>
                <van-count-down :time="item.countdownTime" @finish="countDownEvent(index)" format="DD:HH:mm:ss"/>
              </div>
              <div class="left" v-show="!item.isShowCountDown && item.status == 1">
                <van-icon name="underway" size="14" color="#bd68ff" />
                <span>火爆抢购中</span>
              </div>
              <div class="center" v-show="!item.isShowCountDown && item.status == 2">
                <van-icon name="bookmark" size="14" color="#fff" />
                <span>已售罄</span>
              </div>
              <div class="right" v-show="item.isShowCountDown && item.status == 0">
                <van-icon name="bell" size="14" color="#e9ad70"/>
                <span>提醒我</span>
              </div>
            </div>
            <div class="image-area">
              <img :src="item.digitalCollectioUrl">
            </div>
            <div class="message-area">
              <div class="left">
                <div class="name">
                  <span>{{item.digitalCollectionName}}</span>
                  <!-- <p v-show="item.tagAttributes && !item.tagAttributes.some((tagItem) => {return tagItem == null}) && item.tagAttributes.length>0">
                    <span v-for="(innerItem, innerIndex) in item.tagAttributes" :key="innerIndex">{{innerItem}}</span>
                  </p> -->
                </div>
                <div class="number">
                  <span>限量</span>
                  <span>{{item.digitalCollectioShare}}份</span>
                </div>
                <div class="author">
                  <img :src="item.digitalCollectioAuthorPhoto">
                  <span>{{item.digitalCollectioAuthor}}</span>
                </div>
              </div>
              <div class="right">
                <div>
                  <span>¥</span>
                  <span>{{item.digitalCollectioPrice}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sell-date-box" v-show="currentTabIndex === 1 && !emptyShow">
          <div class="sell-title">
            <div class="left">
              <span>近期发售计划</span>
            </div>
            <div class="right">
              <span>已订阅</span>
              <span>分 享</span>
            </div>
          </div>
          <div class="sell-content-list" v-for="(item,index) in digitalCollectionCalendarList" :key="index">
            <div class="month-day">
              <span>{{item.date}}</span>
            </div>
            <div class="same-hour-list" v-for="(innerItem, innerIndex) in item.saleTimeList" :key="innerIndex">  
              <div class="hour">
                <van-icon name="underway" size="20" color="#bd68ff" />
                <span>{{innerItem.time}}</span>
              </div>
              <div class="object-details-list" v-for="(lastItem, lastIndex) in innerItem.commodityList" :key="lastIndex">
                <div class="object-details">
                  <div>
                    <img :src="lastItem.imgPath">
                  </div>
                  <div>
                    <div>
                      <span>{{lastItem.name}}</span>
                    </div>
                    <div>
                      <span>限量</span>
                      <span>{{lastItem.quantity}} 份</span>
                    </div>
                    <div class="">
                      <span>¥</span>
                      <span>{{lastItem.price}}</span>
                    </div>
                  </div>
                </div>
              </div>  
            </div>  
          </div>
        </div>
      </div>
      <div class="name-auth" v-show="userInfo && userInfo.realFlag === 0">
        <span>实名认证后才可以购买数字藏品</span>
        <span @click="goAuthNameEvent">去认证</span>
      </div>
       <div class="name-auth login-hint" v-show="!isLogin">
        <span>去登录,开启新的体验</span>
        <span @click="goLoginEvent">登录</span>
      </div>
    </div>
    <FooterBottom></FooterBottom>  
  </div>
</template>
<script>
    import FooterBottom from '../components/FooterBottom'
    import NavBar from '@/components/NavBar'
    import NoData from '@/components/NoData'
    import Loading from '@/components/Loading'
    import {
        inquareProductList,
        inquareSellCalendar,
        productVisitRecord
    } from '@/api/products.js'
    import store from '@/store'
    import {
        mapGetters,
        mapMutations
    } from 'vuex'
    import {
        IsPC
    } from '@/common/js/utils'
    let windowTimer
    export default {
        name: 'Home',
        components: {
            NoData,
            Loading,
            FooterBottom,
            NavBar
        },
        data() {
            return {
                homeBannerPng: require("@/common/images/home/home-banner.png"),
                emptyShow: false,
                loadingShow: false,
                descriptionContent: '暂无产品',
                tabTitlelList: [{
                    name: '数字藏品'
                }, {
                    name: '发售日历'
                }],
                digitalCollectionList: [],
                digitalCollectionCalendarList: [],
                isEffect: false,
                currentTabIndex: 0,
                animationData: {}
            }
        },

        mounted() {
            // 控制设备物理返回按键
            if (!IsPC()) {
                pushHistory();
                this.gotoURL(() => {})
            };
            // this.$store.dispatch("resetLoginState");
            // window.localStorage.clear();
            //查询藏品列表
            this.queryProductsList()
        },

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
                'changeProductsId'
            ]),

            tabSwitchEvent(index) {
                this.currentTabIndex = index;
                if (index === 0) {
                    this.descriptionContent = '暂无产品';
                    this.queryProductsList();
                } else {
                    this.descriptionContent = '暂无发售计划';
                    this.querySaleCalendar()
                }
            },

            // 查询作品列表
            queryProductsList() {
                this.loadingShow = true;
                this.emptyShow = false;
                this.digitalCollectionList = [];
                inquareProductList().then((res) => {
                        this.loadingShow = false;
                        if (res && res.data.code == 0) {
                            if (res.data.list.length == 0) {
                                this.emptyShow = true;
                            } else {
                                for (let item of res.data.list) {
                                    this.digitalCollectionList.push({
                                        countdownTime: Number(item.seckillTime) - new Date().getTime(),
                                        digitalCollectionName: item.name,
                                        digitalCollectioUrl: item.imgPath,
                                        digitalCollectioShare: item.quantity,
                                        digitalCollectioAuthor: item.publisher,
                                        creator: item.creator,
                                        digitalCollectioAuthorPhoto: item.path,
                                        digitalCollectioPrice: item.price,
                                        tagAttributes: item.tags,
                                        id: item.id,
                                        status: item.status,
                                        isShowCountDown: true
                                    })
                                };
                                console.log(this.digitalCollectionList);
                            }
                        } else {
                            this.$dialog.alert({
                                message: `${res.data.msg}`,
                                closeOnPopstate: true
                            }).then(() => {})
                        }
                    })
                    .catch((err) => {
                        this.loadingShow = false;
                        this.emptyShow = false;
                        this.$dialog.alert({
                            message: `${err.message}`,
                            closeOnPopstate: true
                        }).then(() => {})
                    })
            },

            // 查询发售日历
            querySaleCalendar() {
                this.loadingShow = true;
                this.emptyShow = false;
                this.digitalCollectionCalendarList = [];
                inquareSellCalendar().then((res) => {
                        this.loadingShow = false;
                        if (res && res.data.code == 0) {
                            if (res.data.list.length == 0) {
                                this.emptyShow = true;
                            } else {
                                this.digitalCollectionCalendarList = res.data.list
                            }
                        } else {
                            this.$dialog.alert({
                                message: `${res.data.msg}`,
                                closeOnPopstate: true
                            }).then(() => {})
                        }
                    })
                    .catch((err) => {
                        this.loadingShow = false;
                        this.emptyShow = false;
                        this.$dialog.alert({
                            message: `${err.message}`,
                            closeOnPopstate: true
                        }).then(() => {})
                    })
            },

            //倒计时结束事件
            countDownEvent(index) {
                this.digitalCollectionList[index]['isShowCountDown'] = false
            },

            //作品访问统计
            productsVisitStatistics(id) {
                productVisitRecord(id).then((res) => {
                        this.changeProductsId(id);
                        this.$router.push({
                            name: 'collectionDetails',
                            params: {
                                id
                            }
                        });
                        if (res && res.data.code == 0) {} else {
                            this.$dialog.alert({
                                message: `${res.data.msg}`,
                                closeOnPopstate: true
                            }).then(() => {})
                        }
                    })
                    .catch((err) => {
                        this.$dialog.alert({
                            message: `${err.message}`,
                            closeOnPopstate: true
                        }).then(() => {})
                    })
            },

            // 藏品点击详情事件
            objectDetailEvent(item, index) {
                this.productsVisitStatistics(item.id)
            },

            // 实名认证事件
            goAuthNameEvent() {
                this.$router.push({
                    path: '/realNameAuthentication'
                })
            },

            //去登陆事件
            goLoginEvent() {
                this.$router.push({
                    path: '/login'
                })
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
        /deep/ .tabBar-box {
            .van-nav-bar__placeholder {
                height: 15px !important;
                .van-nav-bar__content {
                    height: 15px !important
                }
            }
        };
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;
            background: @color-background;
            margin-top: -1px;
            .rare-object {
                width: 92%;
                margin: 0 auto;
                border-radius: 10px;
                img {
                    width: 100%;
                    border-radius: 10px
                }
            }
            /deep/ .van-sticky {
                z-index: 2000;
                margin-top: -2px;
                .tab-switch {
                    background: @color-background;
                    width: 100%;
                    margin: 4px 0;
                    text-align: left;
                    span {
                        display: inline-block;
                        color: #777575;
                        font-size: 17px;
                        width: 100px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                    };
                    .active-tab-style {
                        color: #FFFFFF;
                        font-size: 18px;
                        position: relative;
                        border: none;
                        &:after {
                            content: '';
                            position: absolute;
                            left: 0;
                            transform: translateX(420%);
                            bottom: 0;
                            width: 10px;
                            height: 3px;
                            background-image: linear-gradient(to right, #fcbe43, #bf6bfe)
                        }
                    }
                }
            }
            ;
            .switch-content {
                flex: 1;
                width: 92%;
                margin: 0 auto;
                .object-box {
                    .object-list {
                        border-radius: 10px;
                        position: relative;
                        margin-bottom: 20px;
                        background: #100726;
                        padding-top: 10px;
                        box-sizing: border-box;
                        .sell-info-area {
                            position: absolute;
                            top: 20px;
                            left: 4%;
                            width: 92%;
                            display: flex;
                            flex-flow: row nowrap;
                            justify-content: space-between;
                            z-index: 100;
                            color: #333;
                            .left {
                                background: rgba(0, 0, 0, .54);
                                color: #bd68ff;
                                border-radius: 16px;
                                padding: 3px 10px;
                                box-sizing: border-box;
                                display: flex;
                                flex-flow: row nowrap;
                                justify-content: flex-start;
                                align-items: center;
                                span {
                                    &:nth-child(2) {
                                        margin: 0 4px
                                    }
                                }
                                ;
                                /deep/ .van-count-down {
                                    color: #bd68ff;
                                    font-size: 12px
                                }
                            };
                            .center {
                                background:#656565;
                                border-radius: 14px;
                                padding: 6px 10px;
                                box-sizing: border-box;
                                color: #fff;
                                span {
                                    &:nth-child(1) {
                                        margin: 0 4px
                                    }
                                }
                            };
                            .right {
                                background: rgba(0, 0, 0, .54);
                                border-radius: 14px;
                                padding: 6px 10px;
                                box-sizing: border-box;
                                color: #e9ad70;
                                span {
                                    &:nth-child(1) {
                                        margin: 0 4px
                                    }
                                }
                            }
                        }
                        ;
                        .image-area {
                            width: 100%;
                            margin: 0 auto;
                            img {
                                width: 100%;
                                border-radius: 10px;
                            }
                        }
                        ;
                        .message-area {
                            padding: 12px 0;
                            width: 92%;
                            margin: 0 auto;
                            display: flex;
                            flex-flow: row nowrap;
                            justify-content: space-between;
                            .left {
                                width: 70%;
                                .name {
                                    font-size: 19px;
                                    color: #FFFFFF;
                                    display: flex;
                                    flex-flow: row nowrap;
                                    justify-content: flex-start;
                                    align-items: center;
                                    >span {
                                        display: inline-block;
                                        max-width: 120px;
                                        margin-right: 6px;
                                        .no-wrap();
                                    }
                                    >p {
                                        flex: 1;
                                        overflow: auto;
                                        height: 40px;
                                        display: flex;
                                        flex-flow: row nowrap;
                                        align-items: center;
                                        >span {
                                            display: inline-block;
                                            padding: 0 4px;
                                            height: 20px;
                                            border: 1px solid #bd6aff;
                                            font-size: 10px;
                                            border-radius: 10px;
                                            margin-right: 4px;
                                            text-align: center;
                                            line-height: 20px;
                                            color: #bd68ff;
                                            &:last-child {
                                                margin-right: 0
                                            }
                                        }
                                    }
                                }
                                ;
                                .number {
                                    font-size: 0;
                                    margin: 10px 0;
                                    span {
                                        font-size: 13px;
                                        display: inline-block;
                                        height: 20px;
                                        line-height: 20px;
                                        padding: 1px 4px;
                                        &:first-child {
                                            background: #febd42;
                                            color: black;
                                            border-top-left-radius: 2px;
                                            border-bottom-left-radius: 2px;
                                        }
                                        ;
                                        &:last-child {
                                            background: #3e3a51;
                                            color: #ffbc41;
                                            border-top-right-radius: 2px;
                                            border-bottom-right-radius: 2px
                                        }
                                    }
                                }
                                ;
                                .author {
                                    display: flex;
                                    flex-flow: row nowrap;
                                    align-items: center;
                                    img {
                                        width: 20px;
                                        height: 20px;
                                        border-radius: 50%;
                                        vertical-align: top;
                                    }
                                    ;
                                    span {
                                        flex: 1;
                                        margin-left: 6px;
                                        font-size: 13px;
                                        color: #686866;
                                        margin-top: 2px;
                                        .no-wrap()
                                    }
                                }
                            }
                            ;
                            .right {
                                display: flex;
                                flex-direction: column;
                                justify-content: flex-end;
                                align-items: flex-end;
                                width: 30%;
                                span {
                                    font-size: 20px;
                                    color: #FFFFFF;
                                    &:first-child {
                                        margin-right: 4px
                                    }
                                }
                            }
                        }
                    }
                }
                ;
                .sell-date-box {
                    .sell-title {
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                        padding-top: 2px;
                        box-sizing: border-box;
                        .left {
                            color: #ffbc41;
                            font-size: 18px;
                        }
                        ;
                        .right {
                            span {
                                display: inline-block;
                                font-size: 12px;
                                height: 20px;
                                line-height: 20px;
                                &:first-child {
                                    padding: 0 8px;
                                    background: #bd68fe;
                                    border-radius: 20px
                                }
                                ;
                                &:last-child {
                                    padding: 0 8px;
                                    margin-left: 10px;
                                    background: #febd42;
                                    border-radius: 20px
                                }
                            }
                        }
                    }
                    ;
                    .sell-content-list {
                        border-radius: 12px;
                        margin-bottom: 20px;
                        padding: 6px 0 0 0;
                        border-radius: 12px;
                        .month-day {
                            color: #FFFFFF;
                            font-size: 16px;
                        }
                        ;
                        .same-hour-list {
                            .hour {
                                display: flex;
                                flex-flow: row nowrap;
                                justify-content: center;
                                align-items: center;
                                color: #bd68ff;
                                font-size: 16px;
                                height: 30px;
                                margin: 0 auto;
                                width: 90px;
                                background: #000000;
                                border-radius: 20px;
                                span {
                                    margin-left: 4px
                                }
                            }
                            ;
                            .object-details-list {
                                margin: 16px 0;
                                .object-details {
                                    display: flex;
                                    flex-flow: row nowrap;
                                    justify-content: flex-start;
                                    align-items: center;
                                    border-radius: 12px;
                                    height: 130px;
                                    padding-left: 20px;
                                    box-sizing: border-box;
                                    background: @color-block;
                                    >div {
                                        &:first-child {
                                            width: 90px;
                                            border-radius: 12px;
                                            margin-right: 12px;
                                            img {
                                                width: 100%;
                                                border-radius: 12px;
                                            }
                                        }
                                        ;
                                        &:last-child {
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: space-around;
                                            flex: 1;
                                            width: 0;
                                            padding: 4px 0;
                                            >div {
                                                &:nth-child(1) {
                                                    font-size: 18px;
                                                    color: #FFFFFF;
                                                    span {
                                                        display: inline-block;
                                                        width: 100%;
                                                        .no-wrap()
                                                    }
                                                }
                                                ;
                                                &:nth-child(2) {
                                                    font-size: 0;
                                                    margin: 10px 0;
                                                    span {
                                                        font-size: 14px;
                                                        display: inline-block;
                                                        &:first-child {
                                                            background: #febd42;
                                                            color: black;
                                                            padding: 1px 4px 1px 4px;
                                                            border-top-left-radius: 2px;
                                                            border-bottom-left-radius: 2px;
                                                        }
                                                        ;
                                                        &:last-child {
                                                            background: #3e3a51;
                                                            color: #ffbc41;
                                                            padding: 1px 4px 1px 4px;
                                                            border-top-right-radius: 2px;
                                                            border-bottom-right-radius: 2px
                                                        }
                                                    }
                                                }
                                                ;
                                                &:nth-child(3) {
                                                    span {
                                                        font-size: 18px;
                                                        color: #FFFFFF;
                                                        &:first-child {
                                                            margin-right: 4px
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        ;
                    }
                }
            }
            ;
            .name-auth {
                width: 92%;
                left: 4%;
                position: fixed;
                bottom: 60px;
                height: 50px;
                z-index: 300;
                border-radius: 6px;
                background: #ffc252;
                text-align: center;
                padding: 0 10px;
                line-height: 50px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                >span {
                    display: inline-block;
                    &:first-child {
                        font-weight: bold
                    }
                    ;
                    &:last-child {
                        text-align: center;
                        line-height: 36px;
                        height: 36px;
                        width: 80px;
                        box-sizing: border-box;
                        border-radius: 20px;
                        font-size: 14px;
                        background: rgb(40, 40, 40);
                        color: #f3ad2b;
                    }
                }
            }
        }
    }
</style>