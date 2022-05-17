<template>
	<div class="content-box">
        <van-nav-bar left-arrow :border="false"
            :placeholder="true"
            title="创建新展览"
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
	export default {
        name: 'CreateHall',
		components: {
		},
		data() {
			return {
				
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
                        path: '/createHall'
                    })
                })
            }

		},
		methods: {
			...mapMutations([
			]),
            onClickLeft () {
                this.$router.push({path: '/createHall'})
            },
            onClickRight () {

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





