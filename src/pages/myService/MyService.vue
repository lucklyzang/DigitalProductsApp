<template>
	<div class="content-box">
		<NavBar path="/myInfo" title="客服"/>
        <van-loading type="spinner" v-show="loadingShow"/>
		<div class="content">
            <img :src="protocolContent" alt="">
		</div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
    import {
        queryProtocolConfig
    } from '@/api/products.js'
	import NavBar from '@/components/NavBar'
	export default {
		name: 'MyService',
		components: {
            NavBar
		},
		data() {
			return {
			  loadingShow: false,
              protocolContent: ''
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
            this.queryProtocolConfigEvent('CUSTOMER_SERVICE')
		},
		methods: {
			...mapMutations([
			]),
            //查询协议配置
            queryProtocolConfigEvent(value) {
                this.loadingShow = true;
                queryProtocolConfig(value).then((res) => {
                    this.loadingShow = false;
                    if (res && res.data.code == 0) {
                        this.protocolContent = res.data.data
                    } else {
                        this.$toast({
                            message: `${res.data.msg}`,
                            position: 'bottom'
                        })
                    }
                })
                .catch((err) => {
                    this.loadingShow = false;
                    this.$toast({
                        message: `${err.message}`,
                        position: 'bottom'
                    })
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
                font-size: 18px !important
            };
            .van-nav-bar__title {
                color: #fff !important;
                font-size: 16px !important
            }
        };
        .content {
            flex: 1;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            >img {
                width: 260px;
                margin-top: -50px
            }
        }
	}
</style>




