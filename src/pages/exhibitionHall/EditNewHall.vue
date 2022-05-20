<template>
	<div class="content-box">
        <van-nav-bar left-arrow :border="false"
            :placeholder="true"
            :title="queryHallMessage.type == -1 ? '创建新展览' : '编辑展览'"
            :fixed="true"
            z-index="1000"
            :safe-area-inset-top="true"
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
            <template #right>
                <span>发布</span>
            </template>
        </van-nav-bar>
        <van-dialog v-model="isShowHint" :show-cancel-button="true"  :close-on-popstate="false" title="你确定要离开该页面? 离开之后当前内容无法保存。"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="sureEvent" 
            @cancel="cancelEvent"
        />
		<div class="content-top">
          <div class="left" @click="exhibitionThemeEvent">
              <div class="hall-title">
                {{hallMessage['hallTheme']}}
              </div>
              <div class="hall-introduce">
                <span>{{hallMessage['hallIntroduce'] ? this.hallMessage['hallIntroduce'] : '介绍一下你的展览'}}</span>
                <img :src="editIntroducePng" alt="">
              </div>
          </div>
          <div class="right">
            <img :src="hallPlusPng" alt="" @click="editExhibitsEvent">
            <span>
                {{hallMessage.hallExhibitsList.length}}
            </span>
          </div>
		</div>
        <div class="content-bottom">
            <div @click="chooseHallTemplateEvent">
                <img :src="chooseTemplatePng" alt="">
                <span>选择模板</span>
            </div>
            <div @click="editExhibitsEvent">
                <img :src="editExhibitsPng" alt="">
                <span>编辑展品</span>
            </div>
            <div @click="exhibitionThemeEvent">
                <img :src="editExhibitionThemePng" alt="">
                <span>展览主题</span>
            </div>
        </div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
    import {publishHall,edithHall} from '@/api/products.js'
	export default {
        name: 'CreateHall',
		components: {
		},
		data() {
			return {
				isShowHint: false,
                hallPlusPng: require("@/common/images/hall/hall-plus.png"),
                editIntroducePng: require("@/common/images/hall/edit-introduce.png"),
                chooseTemplatePng: require("@/common/images/hall/choose-template.png"),
                editExhibitsPng: require("@/common/images/hall/edit-exhibits.png"),
                editExhibitionThemePng: require("@/common/images/hall/exhibition-theme.png")
			}
		},
		onReady() {},
		computed: {
			...mapGetters([
                'hallMessage',
                'queryHallMessage'
			])
		},

		mounted() {
            console.log(this.hallMessage);
            // 控制设备物理返回按键
            if (!IsPC()) {
                pushHistory();
                this.gotoURL(() => {
                    pushHistory();
                    this.$router.push({
                        path: '/createHall'
                    })
                })
            }

		},

        beforeRouteLeave(to, from, next) {
            // if (to.path == '/createHall') {
            //     this.isShowHint = true;
            //     next(false)
            // };
            next()
        },
        
		methods: {
			...mapMutations([
                'changeHallMessage'
			]),
            onClickLeft () {
                this.$router.push({path: '/createHall'})
            },
            //发布
            onClickRight () {
                if (this.hallMessage['hallExhibitsList'].length == 0) {
                    this.$toast({
                        message: '请编辑展品',
                        position: 'bottom'
                    });
                    return
                };
                if (!this.hallMessage['hallIntroduce'] ||!this.hallMessage['hallTheme']) {
                    this.$toast({
                        message: '展览主题不能为空',
                        position: 'bottom'
                    });
                    return
                };
                if (!this.hallMessage['hallTemplate']) {
                    this.$toast({
                        message: '请选择模板',
                        position: 'bottom'
                    });
                    return
                };
                let hallMessage = {
                    type: this.hallMessage['hallType'],
                    name: this.hallMessage['hallTheme'],
                    signTxt: this.hallMessage['hallIntroduce'],
                    template: this.hallMessage['hallTemplate'],
                    exhibitDtos: this.hallMessage['hallExhibitsList']
                }
                if(this.queryHallMessage.type == -1) {
                    this.publishHallEvent(hallMessage)
                } else {
                    hallMessage.id = this.queryHallMessage.id;
                    this.edithHallEvent(hallMessage)
                }
            },
            // 选择展览模板事件
            chooseHallTemplateEvent () {
                this.$router.push({path: '/chooseHallTemplate'})
            },
            //编辑展品事件
            editExhibitsEvent () {
                this.$router.push({path: '/chooseExhibits'})
            },
            //展览主题事件
            exhibitionThemeEvent () {
                this.$router.push({path: '/exhibitionTheme'})
            },

            // 发布展馆
            publishHallEvent (data) {
                publishHall(data).then((res) => {
					if (res && res.data.code == 0) {
                        this.$toast({
                            message: '发布成功',
                            position: 'bottom'
                        });
                        this.$router.push({path: '/myObject'})
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

            // 编辑展馆
            edithHallEvent (data) {
                edithHall(data).then((res) => {
					if (res && res.data.code == 0) {
                        this.$toast({
                            message: '发布成功',
                            position: 'bottom'
                        })
                        this.$router.push({path: '/myObject'})
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

            //弹框确定事件
            sureEvent () {
                this.$router.push({
                    path: '/createHall'
                })

            },
            //弹框取消事件
            cancelEvent () {
                
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
            .van-icon-arrow-left {
                color: #fff !important;
                font-size: 18px !important
            };
            .van-nav-bar__title {
                color: #fff !important
            };
            .van-nav-bar__right {
                width: 60px;
                height: 30px;
                line-height: 30px;
                border-radius: 20px;
                background: #f0c796;
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
        /deep/ .van-dialog {
            width: 70%;
            background: #fff;
            .van-dialog__header {
                color: #333;
                padding: 14px;
                font-size: 12px
            };
            .van-dialog__footer {
                .van-button--default {
                    background: #fff;
                };
                .van-dialog__cancel {
                    color: blue;
                    font-weight: bolder
                };
                .van-dialog__confirm {
                    color: blue;
                }
            }
        };
		.content-top {
            width: 90%;
            margin: 0 auto;
			margin-top: 60px;
            flex: 1;
            position: relative;
            display: flex;
            flex-flow: row nowrap;
            .left {
                flex: 1;
                padding-right: 20px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .hall-title {
                    width: 100%;
                    height: 120px;
                    overflow: auto;
                    color: #fff;
                    line-height: 25px;
                    font-size: 22px
                };
                .hall-introduce {
                    width: 100%;
                    line-height: 20px;
                    flex: 1;
                    overflow: auto;
                    color: #adadad;
                    font-size: 12px;
                    >img {
                        width: 14px
                    }
                }
            };
            .right {
                width: 100px;
                height: 140px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                >img {
                    width: 100px;
                };
                >span {
                    width: 100px;
                    display: inline-block;
                    color: #adadad;
                    font-size: 13px;
                    height: 25px;
                    .bottom-border-1px(#adadad,8px) 
                }
            }
		};
        .content-bottom {
            background: #00020f;
			width: 100%;
            height: 100px;
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
			    flex-direction: column;
                justify-content: center;
                font-size: 12px;
                align-items: center;
                >img {
                    width: 50px;
                    height: 50px
                }
                >span {
                    color: #b3b3b3;
                    margin-left: 4px;
                    margin-top: 10px
                }
            }
		}
	}
</style>





