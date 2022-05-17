<template>
	<div class="content-box">
        <van-nav-bar :border="false"
            :placeholder="true"
            title="选择展厅模板"
            :fixed="true"
            z-index="1000"
            :safe-area-inset-top="true"
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
             <template #left>
                <span>取消</span>
            </template>
            <template #right>
                <span>保存</span>
            </template>
        </van-nav-bar>
		<div class="content-top">
           <img :src="checkedTemplateImg" alt="">
           <span>{{checkedTemplateText}}</span>
		</div>
        <div class="content-bottom">
            <div class="template-text">
                2D
            </div>
            <div class="template-list-wrapper">
                <div class="template-list" :class="{'listStyle': index == currentIndex}" v-for="(item,index) in templateList" :key="index" @click="templateClickEvent(item,index)">
                    <img :src="item.imgPath" alt="">
                </div>
            </div>
        </div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
        name: 'ChooseHallTemplate',
		components: {
		},
		data() {
			return {
                currentIndex: 0,
                checkedTemplateImg: require("@/common/images/login/account-security.png"),
                checkedTemplateText: '默认',
				templateList: [
                    {
                        imgPath: require("@/common/images/login/account-security.png"),
                        text: '默认'
                    }, 
                    {
                        imgPath: require("@/common/images/login/my-service.png"),
                        text: '极简画廊'
                    }, 
                    {
                        imgPath: require("@/common/images/login/about.png"),
                        text: '北国风光'
                    }, 
                    {
                        imgPath: require("@/common/images/login/my-share.png"),
                        text: '江南水乡'
                    }
                ]
			}
		},
		onReady() {},
		computed: {
			...mapGetters([
			])
		},
		mounted() {
            // 控制设备物理返回按键
            if (!IsPC()) {
                pushHistory();
                this.gotoURL(() => {
                    pushHistory();
                    this.$router.push({
                        path: '/editNewHall'
                    })
                })
            }

		},
		methods: {
			...mapMutations([
			]),
            //模板点击事件
            templateClickEvent (item,index) {
                this.currentIndex = index;
                this.checkedTemplateImg = item.imgPath;
                this.checkedTemplateText = item.text
            },
            onClickLeft () {
                this.$router.push({path: '/editNewHall'})
            },
            onClickRight () {

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
        /deep/ .van-nav-bar {
            background: @color-background;
            .van-nav-bar__title {
                color: #fff !important
            };
            .van-nav-bar__left {
                width: 60px;
                height: 30px;
                line-height: 30px;
                border-radius: 20px;
                color: #b9b9b9 !important;
                padding: 0 6px 0 0;
                text-align: left;
                font-size: 16px;
                top: 10px;
                left: 8px;
                box-sizing: border-box;
                span {
                    width: 100%;
                    height: 100%
                }
            };
            .van-nav-bar__right {
                width: 60px;
                height: 30px;
                line-height: 30px;
                border-radius: 20px;
                background: #f5f5c4;
                color: black !important;
                padding: 0 6px;
                top: 10px;
                right: 8px;
                box-sizing: border-box;
                span {
                    width: 100%;
                    height: 100%
                }
            }
        };
		.content-top {
            width: 90%;
            margin: 0 auto;
			margin-top: 20px;
            position: relative;
            img {
                width: 100%
            };
            >span {
                display: inline-block;
                width: 100%;
                text-align: center;
                font-size: 18px;
                color: #fff;
                height: 40px;
                line-height: 40px;
            }
		};
        .content-bottom {
            width: 90%;
            margin: 0 auto;
            margin-top: 10px;
            flex: 1;
            display: flex;
            flex-direction: column;
            .template-text {
                height: 30px;
                line-height: 30px;
                color: #fff;
                font-size: 16px

            };
            .template-list-wrapper {
                display: flex;
                overflow: auto;
                flex-flow: row wrap;
                .template-list {
                    width: 32%;
                    box-sizing: border-box;
                    border-radius: 8px;
                    margin-right: 2%;
                    margin-bottom: 2%;
                    &:nth-child(3n+3) {
                        margin-right: 0
                    };
                    img {
                        width: 100%;
                        border-radius: 8px
                    }
                };
                .listStyle {
                   border: 3px solid#f5f5c4
                }
            }    
        }
	}
</style>





