<template>
  <div class="page-box">
    <NavBar :leftArrow="false" />
    <div class="content">
      <van-sticky :offset-top="46">
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
        <div class="object-box" v-show="currentTabIndex === 0">
          <div class="rare-object">
            <img :src="homeBannerPng" alt="">
          </div>
          <div class="object-list" @click="objectDetailEvent" v-for="(item,index) in digitalCollectionList" :key="index">
            <div class="sell-info-area">
              <div class="left">
                <van-icon name="underway" size="14" color="#be68ff" />
                <span>即将开售</span>
                <span>{{item.countdownTime}}</span>
              </div>
            </div>
            <div class="image-area">
              <img :src="item.digitalCollectioUrl">
            </div>
            <div class="message-area">
              <div class="left">
                <div class="name">
                  <span>{{item.digitalCollectionName}}</span>
                  <span>{{item.tagAttributes}}</span>
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
        <div class="sell-date-box" v-show="currentTabIndex === 1">
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
              <span>{{item.digitalCollectioSellDate}}</span>
            </div>
            <div class="same-hour-list" v-for="(innerItem, innerIndex) in item.digitalCollectioContentList" :key="innerIndex">  
              <div class="hour">
                <van-icon name="underway" size="20" color="#ab4eff" />
                <span>{{innerItem.digitalCollectioSellTime}}</span>
              </div>
              <div class="object-details-list" v-for="(lastItem, lastIndex) in innerItem.digitalCollectioContentDetailList" :key="lastIndex">
                <div class="object-details">
                  <div>
                    <img :src="lastItem.digitalCollectioUrl">
                  </div>
                  <div>
                    <div>
                      <span>{{lastItem.digitalCollectionName}}</span>
                    </div>
                    <div>
                      <span>限量</span>
                      <span>{{lastItem.digitalCollectioShare}} 份</span>
                    </div>
                    <div class="">
                      <span>¥</span>
                      <span>{{lastItem.digitalCollectioPrice}}</span>
                    </div>
                  </div>
                </div>
              </div>  
            </div>  
          </div>
        </div>
      </div>
      <div class="name-auth">
        <span>实名认证后才可以购买数字藏品</span>
        <span @click="goAuthNameEvent">去认证</span>
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
    import store from '@/store'
    import {
        mapGetters,
        mapMutations
    } from 'vuex'
    import {
        formatTime,
        setStore,
        getStore,
        removeStore,
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
                noDataShow: false,
                showLoadingHint: false,
                homeBannerPng: require("@/common/images/home/home-banner.png"),
                tabTitlelList: [{
                    name: '数字藏品'
                }, {
                    name: '发售日历'
                }],
                digitalCollectionList: [{
                    countdownTime: '03:06:00',
                    digitalCollectionName: '新疆喀纳斯之秋',
                    digitalCollectioUrl: require("@/common/images/home/default-person.jpg"),
                    digitalCollectioShare: 8000,
                    digitalCollectioAuthor: '乔玲',
                    digitalCollectioAuthorPhoto: require("@/common/images/home/default-person.jpg"),
                    digitalCollectioPrice: '59.90',
                    tagAttributes: '风景画'
                }, {
                    countdownTime: '03:06:00',
                    digitalCollectionName: '新疆喀纳斯之秋',
                    digitalCollectioUrl: require("@/common/images/home/default-person.jpg"),
                    digitalCollectioShare: 8000,
                    digitalCollectioAuthor: '乔玲',
                    digitalCollectioAuthorPhoto: require("@/common/images/home/default-person.jpg"),
                    digitalCollectioPrice: '59.90',
                    tagAttributes: '风景画'
                }],
                digitalCollectionCalendarList: [{
                    digitalCollectioSellDate: '04 月 01 日',
                    digitalCollectioContentList: [{
                        digitalCollectioSellTime: '20:00',
                        digitalCollectioContentDetailList: [{
                            digitalCollectionName: '新疆喀纳斯之秋',
                            digitalCollectioUrl: require("@/common/images/home/default-person.jpg"),
                            digitalCollectioShare: 8000,
                            digitalCollectioPrice: '59.90',
                        }, {
                            digitalCollectionName: '新疆喀纳斯之冬',
                            digitalCollectioUrl: require("@/common/images/home/default-person.jpg"),
                            digitalCollectioShare: 8000,
                            digitalCollectioPrice: '59.90'
                        }]
                    }, {
                        digitalCollectioSellTime: '21:00',
                        digitalCollectioContentDetailList: [{
                            digitalCollectionName: '新疆喀纳斯之秋',
                            digitalCollectioUrl: require("@/common/images/home/default-person.jpg"),
                            digitalCollectioShare: 8000,
                            digitalCollectioPrice: '59.90',
                        }, {
                            digitalCollectionName: '新疆喀纳斯之冬',
                            digitalCollectioUrl: require("@/common/images/home/default-person.jpg"),
                            digitalCollectioShare: 8000,
                            digitalCollectioPrice: '59.90'
                        }]
                    }]
                }, {
                    digitalCollectioSellDate: '04 月 012 日',
                    digitalCollectioContentList: [{
                        digitalCollectioSellTime: '10:00',
                        digitalCollectioContentDetailList: [{
                            digitalCollectionName: '新疆喀纳斯之春',
                            digitalCollectioUrl: require("@/common/images/home/default-person.jpg"),
                            digitalCollectioShare: 8000,
                            digitalCollectioPrice: '59.90',
                        }, {
                            digitalCollectionName: '新疆喀纳斯之夏',
                            digitalCollectioUrl: require("@/common/images/home/default-person.jpg"),
                            digitalCollectioShare: 8000,
                            digitalCollectioPrice: '59.90'
                        }]
                    }, {
                        digitalCollectioSellTime: '18:00',
                        digitalCollectioContentDetailList: [{
                            digitalCollectionName: '新疆喀纳斯之春',
                            digitalCollectioUrl: require("@/common/images/home/default-person.jpg"),
                            digitalCollectioShare: 8000,
                            digitalCollectioPrice: '59.90',
                        }, {
                            digitalCollectionName: '新疆喀纳斯之夏',
                            digitalCollectioUrl: require("@/common/images/home/default-person.jpg"),
                            digitalCollectioShare: 8000,
                            digitalCollectioPrice: '59.90'
                        }]
                    }]
                }],
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
            }
        },

        watch: {},

        computed: {
            ...mapGetters([
                'userInfo'
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
                'changeTitleTxt'
            ]),

            tabSwitchEvent(index) {
                this.currentTabIndex = index;
                console.log(index, this.currentTabIndex)
            },

            // 藏品点点击详情事件
            objectDetailEvent() {
                this.$router.push({
                    path: 'collectionDetails'
                })
            },

            // 实名认证事件
            goAuthNameEvent() {
                this.$router.push({path: '/realNameAuthentication'})
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
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;
            background: @color-background;
            /deep/ .van-sticky {
                z-index: 200;
                .tab-switch {
                    background: @color-background;
                    width: 100%;
                    text-align: center;
                    span {
                        display: inline-block;
                        color: #777575;
                        font-size: 18px;
                        width: 100px;
                        height: 60px;
                        line-height: 60px;
                        text-align: center;
                    }
                    ;
                    .active-tab-style {
                        color: #FFFFFF;
                        font-size: 20px;
                        position: relative;
                        border: none;
                        &:after {
                            content: '';
                            position: absolute;
                            left: 0;
                            transform: translateX(420%);
                            bottom: 6px;
                            width: 10px;
                            height: 3px;
                            background-color: orange;
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
                    .rare-object {
                        height: 90px;
                        border-radius: 10px;
                        margin-bottom: 10px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 10px
                        }
                    };
                    .object-list {
                        border-radius: 10px;
                        position: relative;
                        margin-bottom: 20px;
                        background: #100726;
                        .sell-info-area {
                            position: absolute;
                            top: 10px;
                            left: 4%;
                            width: 92%;
                            display: flex;
                            flex-flow: row nowrap;
                            justify-content: space-between;
                            z-index: 100;
                            color: #333;
                            .left {
                                background: #412f19;
                                color: #be68ff;
                                border-radius: 16px;
                                padding: 4px 10px;
                                height: 20px;
                                line-height: 20px;
                                span {
                                    &:nth-child(2) {
                                        margin: 0 4px
                                    }
                                }
                            }
                            ;
                            .right {
                                background: rgb(59 56 56);
                                border-radius: 16px;
                                padding: 8px 8px;
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
                            height: 350px;
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 10px;
                            }
                        }
                        ;
                        .message-area {
                            padding: 16px 0;
                            width: 92%;
                            margin: 0 auto;
                            display: flex;
                            flex-flow: row nowrap;
                            justify-content: space-between;
                            .left {
                                width: 65%;
                                .name {
                                    font-size: 19px;
                                    color: #FFFFFF;
                                    display: flex;
                                    flex-flow: row nowrap;
                                    justify-content: space-between;
                                    align-items: center;
                                    >span {
                                        display: inline-block;
                                        &:last-child {
                                            padding: 0 4px;
                                            height: 20px;
                                            border: 1px solid #bd69ff;
                                            font-size: 10px;
                                            border-radius: 10px;
                                            text-align: center;
                                            line-height: 20px;
                                            color: #bd69ff
                                        }
                                    }
                                }
                                ;
                                .number {
                                    font-size: 0;
                                    margin: 10px 0;
                                    span {
                                        font-size: 14px;
                                        display: inline-block;
                                        height: 20px;
                                        line-height: 20px;
                                        padding: 1px 4px;
                                        &:first-child {
                                            background: #ffbc41;
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
                                        margin-left: 6px;
                                        font-size: 13px;
                                        color: #686866;
                                        margin-top: 2px;
                                    }
                                }
                            }
                            ;
                            .right {
                                display: flex;
                                flex-direction: column;
                                justify-content: flex-end;
                                align-items: flex-end;
                                width: 35%;
                                span {
                                    font-size: 17px;
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
                            color: #febe42;
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
                                    background: #bd69ff;
                                    border-radius: 20px
                                }
                                ;
                                &:last-child {
                                    padding: 0 8px;
                                    margin-left: 10px;
                                    background: #ffbc41;
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
                            color: #dfdfdf;
                            font-size: 16px;
                        }
                        ;
                        .same-hour-list {
                            .hour {
                                display: flex;
                                flex-flow: row nowrap;
                                justify-content: center;
                                align-items: center;
                                color: #be68ff;
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
                                            height: 90px;
                                            border-radius: 12px;
                                            margin-right: 12px;
                                            img {
                                                width: 100%;
                                                height: 100%;
                                                border-radius: 12px;
                                            }
                                        }
                                        ;
                                        &:last-child {
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: space-around;
                                            padding: 4px 0;
                                            >div {
                                                &:nth-child(1) {
                                                    font-size: 18px;
                                                    color: #FFFFFF
                                                }
                                                ;
                                                &:nth-child(2) {
                                                    font-size: 14px;
                                                    margin: 10px 0;
                                                    span {
                                                        display: inline-block;
                                                        &:first-child {
                                                            background: #ffbc41;
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