<template>
	<div class="content-box">
        <NavBar path="/systemSet" title="修改昵称" />
        <van-loading type="spinner" v-show="loadingShow"/>
		<div class="content-center">
            <van-field class="uni-input" v-model="nicknameContent"  rows="4"
                autosize
                type="textarea"
                maxlength="50"
                show-word-limit
            />
		</div>
        <div class="btn-area">
            <span @click="cancelChangeEvent">取 消</span>
            <span @click="saveChangeEvent">保 存</span>
        </div>
	</div>
</template>

<script>
	import NavBar from '@/components/NavBar'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import {
		setCache,
		removeAllLocalStorage
	} from '@/common/js/utils'
	import {changeNickname,inquareUserInfo} from '@/api/products.js'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				nicknameContent: '',
                loadingShow: false
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
            if (this.isLogin) {
                this.nicknameContent = this.userInfo.nickName
            }
		},
		methods: {
			...mapMutations([
                'storeUserInfo'
			]),
            //保存昵称修改事件
            saveChangeEvent () {
                if (!this.nicknameContent) {
                    this.$toast({
                        message: '昵称不能为空',
                        position: 'bottom'
                    });
                    return
                };
                changeNickname({nickName: this.nicknameContent}).then((res) => {
                    this.loadingShow = false;
                    if (res && res.data.code == 0) {
                        this.$toast({
                            message: '昵称修改成功',
                            position: 'bottom'
                        });
                        this.queryuserInfo()
                    } else {
                        this.$dialog.alert({
                        message: `${res.data.msg}`,
                        closeOnPopstate: true
                        }).then(() => {
                        })
                    }
                })
                .catch((err) => {
                    this.loadingShow = false;
                        this.$dialog.alert({
                        message: `${err.message}`,
                        closeOnPopstate: true
                        }).then(() => {
                    })
                })
            },

            // 查询用户信息
            queryuserInfo () {
                inquareUserInfo().then((res) => {
                    if (res && res.data.code == 0) {
                        this.storeUserInfo(res.data.data);
                         this.$router.push({
                            path: 'systemSet'
                        })
                    } else {
                        this.$dialog.alert({
                            message: `${res.data.msg}`,
                            closeOnPopstate: true
                        }).then(() => {
                        })
                    }
                })
                .catch((err) => {
                    this.$dialog.alert({
                        message: `${err.message}`,
                        closeOnPopstate: true
                    }).then(() => {
                    })
                })
            },
            
            // 昵称修改取消事件
            cancelChangeEvent () {
                this.nicknameContent = '';
                this.$router.push({
                    path: 'systemSet'
                })
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
            .van-icon {
                color: #fff !important;
                font-size: 24px !important
            };
             .van-nav-bar__title {
                color: #fff !important;
                font-size: 18px !important
            }
        };
		.content-center {
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
            width: 94%;
            margin: 0 auto;
			margin-top: 30px;
            border-radius: 4px;
            /deep/ .uni-input {
                margin-bottom: 8px;
                border: 1px solid #2c2c2c;
                border-radius: 10px;
                color: #fff;
                background: @color-block;
                font-size: 18px;
                .van-field__control {
                    color: #fff !important
                }
            }
		};
        .btn-area {
            display: flex;
			flex-flow: row nowrap;
			justify-content: center;
            align-items: center;
            width: 94%;
            margin: 0 auto;
            margin-top: 20px;
            > span {
                display: inline-block;
                width: 90px;
                height: 40px;
                font-size: 16px;
                text-align: center;
                line-height: 40px;
                background: @color-block;
                border-radius: 20px;
                &:first-child {
                    margin-right: 20px;
                    color: #4f4f4f
                };
                &:last-child {
                    color: #ca9b43
                }
            }
        }
	}
</style>





