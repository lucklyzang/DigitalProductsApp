<template>
	<div class="content-box">
		<NavBar path="/collectionRecordDetails" title="转增好友"/>
		<div class="content-top">
           <p>将以下藏品转增给好友</p>
           <div class="collection-details-box">
               <div class="left">
                    <div class="img-show">
                        <img :src="donationProductDetails.path">
                    </div>
                    <div class="span-show">
                        <span>{{donationProductDetails.name}}</span>
                        <p>
                            <img :src="blockchainPng" alt="">
                            <span>{{donationProductDetails.chain}}</span>
                        </p>
                        <span>{{donationProductDetails.publisher}}</span>
                    </div>
                </div>
           </div>
		</div>
        <div class="content-center">
            <p>请输入好友的区块链地址/手机号:</p>
            <van-field
                v-model="adreeMessage"
                rows="4"
                autosize
                type="textarea"
            />
        </div>
        <div class="content-btn">
            确认转增
        </div>
        <div class="donation-explain">
            <p>转赠说明</p>
            <div>1、请您确认您具备赠送数字藏品的民事行为能力;</div>
            <div>2、请您确认您与受赠人均已通过平台的实名认证并遵守相关法律法规及平台协议;</div>
            <div>3、请您确认本次赠送行为未设定任何形式的对价;</div>
            <div>4、转增操作无法撤销;</div>
            <div>5、与数字藏品相关的权利将会同步且毫无地转移至受赠人;</div>
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
        name: 'DonationFriend',
		components: {
            NavBar
		},
		data() {
			return {
                adreeMessage: '',
				blockchainPng: require("@/common/images/home/blockchain.png")
			}
		},
		onReady() {},
		computed: {
			...mapGetters([
                'userInfo',
                'donationProductDetails'
			])
		},
		mounted() {
            console.log('昌平星系',this.donationProductDetails.id);
			// 控制设备物理返回按键
            if (!IsPC()) {
                pushHistory();
                this.gotoURL(() => {
                pushHistory();
                    this.$router.push({
                        path: '/collectionRecordDetails'
                    })
                })
            }
		},
		methods: {
			...mapMutations([
			]),
            onCopySuccess(){
                this.$toast("复制成功");
            },
            onCopyError(){
                this.$toast("复制失败");
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
		.content-top {
			width: 90%;
            margin: 0 auto;
            margin-bottom: 30px;
            p {
                color: #fff;
                font-size: 16px;
                margin: 30px 0;
            };
            .collection-details-box {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                padding: 0 10px 0 0;
                border-radius: 10px;
                background: @color-block;
                margin-bottom: 10px;
                box-sizing: border-box;
                .left {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    width: 100%;
                    .img-show {
                        width: 110px;
                        img {
                            width: 100%;
                        }
                    };
                    .span-show {
                        display: flex;
                        height: 100px;
                        flex: 1;
                        width: 0;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-left: 14px;
                        >span {
                            .no-wrap();
                            display: inline-block;
                            &:nth-child(1) {
                                font-size: 18px;
                                color: #FFFFFF;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            };
                            &:nth-child(3) {
                                font-size: 14px;
                                color: #686866
                            };
                        };
                        p {
                            margin: 6px 0;
                            height: 30px;
                            display: flex;
                            flex-flow: row nowrap;
                            align-items: center;
                            padding: 0 20px 0 0;
                            box-sizing: border-box;
                            height: 22px;
                            border: 1px solid #bd6aff;
                            border-top-right-radius: 10px;
                            border-bottom-right-radius: 10px;
                            border-top-left-radius: 5px;
                            border-bottom-left-radius: 5px;
                            display: flex;
                            flex-flow: row nowrap;
                            align-items: center;
                            img {
                                width: 20px;
                                margin-right: 2px;
                            };
                            span {
                                display: inline-block;
                                max-width: 200px;
                                font-size: 10px;
                                box-sizing: border-box;
                                line-height: 22px;
                                color: #bd68ff;
                                .no-wrap()
                            }
                        }
                    }
                }
            }
		};
        .content-center {
            width: 90%;
            margin: 0 auto;
            p {
                color: #fff;
                font-size: 16px;
                margin-bottom: 30px
            };
            /deep/ .van-cell {
                background: @color-block;
                border-radius: 10px;
                .van-cell__value {
                   .van-field__control {
                       color: #fff
                   }
                }
            }
        };
        .content-btn {
            width: 90%;
            margin: 0 auto;
            margin-top: 20px;
            border-radius: 20px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: black;
            font-size: 18px;
            background-image: linear-gradient(to right, #f2c460 ,#e29119)
        };
        .donation-explain {
            width: 90%;
            margin: 0 auto;
            margin-top: 20px;
            p {
                color: #fff;
                font-size: 16px;
                margin-bottom: 20px
            };
            >div {
                color: #686868;
                font-size: 14px;
                line-height: 20px
            }
        }
	}
</style>




