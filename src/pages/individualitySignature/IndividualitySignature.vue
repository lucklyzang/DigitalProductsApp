<template>
	<div class="content-box">
        <NavBar path="/systemSet" title="个性签名" />
		<div class="content-center">
            <van-field class="uni-input" v-model="signatureContent"  rows="4"
                autosize
                type="textarea"
                maxlength="50"
                show-word-limit
            />
		</div>
        <div class="btn-area">
            <span>取 消</span>
            <span>保 存</span>
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
	import {
	} from '@/api/login.js'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				signatureContent: ''
			}
		},
		onReady() {},
		computed: {
			...mapGetters([
			])
		},
		mounted() {
		},
		methods: {
			...mapMutations([
			])
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





