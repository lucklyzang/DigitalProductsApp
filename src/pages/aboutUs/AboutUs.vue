<template>
	<div class="content-box">
		<NavBar path="/myInfo" title="关于我们"/>
		<div class="content-top">
            <img :src="defaultPersonPng">
			<span>
               艺真
            </span>
		</div>
		<div class="content-center">
			艺真是通链旗下的数字藏品发行平台,基于公众联盟链-斐德坊区块链。目前主要与大型艺术文创公司、博物馆等机构合作,创作经数字化的特定作品、艺术品和商品使用斐德坊的区块链技术进行唯一标识，形成链上数字资产。包括但不限于数字画作、图片、音乐、视频、3D模型等各种形式。
		</div>
		<div class="content-bottom">
			<span>
                V0.1.0
            </span>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import NavBar from '@/components/NavBar'
	export default {
		name: 'AboutUs',
		components: {
            NavBar
		},
		data() {
			return {
			  defaultPersonPng: require("@/common/images/home/default-person.jpg")
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
                        path: '/myInfo'
                    })
                })
            };
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
                font-size: 18px !important
            };
            .van-nav-bar__title {
                color: #fff !important;
                font-size: 16px !important
            }
        };
		.content-top {
			height: 200px;
			display: flex;
			margin-top: 30px;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			img {
				width: 100px
			};
			>span {
                &:nth-child(2) {
                    font-size: 20px;
                    color: #fff;
                    margin: 20px 0 10px 0;
                }
			}
		};
		.content-center {
			width: 90%;
			margin: 0 auto;
			flex: 1;
			overflow: auto;
			color: #686868;
			font-size: 15px;
			line-height: 20px;
			text-align: justify
		};
		.content-bottom {
			height: 60px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			> span {
				&:nth-child(1) {
                    font-size: 14px;
                    color: #a9a9a9
                }
			}
		}
	}
</style>




