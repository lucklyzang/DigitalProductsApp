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
                把大家看啥就看啥看啥撒就是垃圾
              </div>
              <div class="hall-introduce">
                <span>介绍一下你的展览</span>
                <van-icon name="edit" />
              </div>
          </div>
          <div class="right">
            <van-icon name="add" size="60" color="#929292" @click="editExhibitsEvent" />
            <span>1</span>
          </div>
		</div>
        <div class="content-bottom">
            <div @click="chooseHallTemplateEvent">
                <van-icon name="award" size="30"/>
                <span>选择模板</span>
            </div>
            <div @click="editExhibitsEvent">
                <van-icon name="printer" size="30"/>
                <span>编辑展品</span>
            </div>
            <div @click="exhibitionThemeEvent">
                <van-icon name="good-job" size="30"/>
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
				isShowHint: false
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
            if (to.path == '/createHall') {
                this.isShowHint = true;
                next(false)
            };
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
                if(this.queryHallMessage.type == -1) {
                    this.publishHallEvent()
                } else {
                    this.edithHallEvent()
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
                        })
                        
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
                height: 150px;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .hall-title {
                    width: 100%;
                    height: 130px;
                    overflow: auto;
                    color: #fff;
                    font-size: 22px
                };
                .hall-introduce {
                    color: #adadad;
                    font-size: 13px
                }
            };
            .right {
                width: 100px;
                height: 140px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                /deep/ .van-icon {
                    margin-top: 40px;
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
                >span {
                    margin-left: 4px;
                    margin-top: 10px
                }
            }
		}
	}
</style>





