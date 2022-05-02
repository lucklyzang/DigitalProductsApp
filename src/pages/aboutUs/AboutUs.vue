<template>
	<div class="content-box">
		<NavBar path="/myInfo" title="关于我们"/>
		<div class="content-top">
            <img :src="defaultPersonPng">
			<span>
               艺真
            </span>
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
			height: 300px;
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
                };
                &:nth-child(3) {
                    font-size: 14px;
                    color: #a9a9a9
                }
			}
		}
	}
</style>




