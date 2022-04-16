<template>
  <div class="page-box">
    <van-nav-bar :fixed="true" :safe-area-inset-top="true" :border="false"/>
    <div class="content-box">
      <div class="content-top">
        <div class="person-message-box">
          <div class="message-left">
            <div class="person-picture" @click="toEditPersonPage">
              <img :src="defaultPersonPng">
            </div>
            <div class="person-name">
              <div v-if="true">砂夹石三</div>
              <div v-else>未登录</div>
              <div>
                <span v-if="true">TA很神秘,什么都没有留下</span>
                <span v-else>登录后可以查看更多数字藏品</span>
              </div>
            </div>
          </div>
        </div>
        <div class="function-zone">
          <div class="function-zone-icon-list" v-for="(item,index) in zoneIconList" :key="index">
            <van-icon :name="item.icon" size="32" color="#ee9f4d" />
            <span>{{item.span}}</span>
          </div>
        </div>
		  </div>
      <div class="content-bottom">
      	<div class="nick-name">
				<div class="left">
          <van-icon name="contact" size="20" color="#c0bebe" />
					<span>账号与安全</span>
				</div>
				<div class="right">
					<div>
						<van-icon name="arrow" size="15" color="#6c6c6c" />
					</div>
				</div>
			</div>
			<div class="nick-name">
				<div class="left">
          <van-icon name="service-o" size="20" color="#c0bebe" />
					<span>我的客服</span>
				</div>
				<div class="right">
					<div>
						<van-icon name="arrow" size="15" color="#6c6c6c" />
					</div>
				</div>
			</div>
			<div class="nick-name">
				<div class="left">
          <van-icon name="info-o" size="20" color="#c0bebe" />
					<span>关于</span>
				</div>
				<div class="right">
					<div>
						<van-icon name="arrow" size="15" color="#6c6c6c" />
					</div>
				</div>
			</div>
      <div class="nick-name">
				<div class="left">
        <van-icon name="share-o" size="20" color="#c0bebe" />
					<span>分享</span>
				</div>
				<div class="right">
					<div>
						<van-icon name="arrow" size="15" color="#6c6c6c" />
					</div>
				</div>
			</div>
      </div>
    </div>
    <FooterBottom></FooterBottom>  
  </div>
</template>
<script>
  import FooterBottom from '../components/FooterBottom'
  import NoData from '@/components/NoData'
  import Loading from '@/components/Loading'
  import store from '@/store'
  import { mapGetters, mapMutations } from 'vuex'
  import { formatTime, setStore, getStore, removeStore, IsPC} from '@/common/js/utils'
  let windowTimer
  export default {
    name: 'Home',
    components:{
      NoData,
      Loading,
      FooterBottom
    },
    data() {
      return {
        noDataShow: false,
        showLoadingHint: false,
        versionNumber: '1.8',
				iconName: 'gear-filled',
				zoneIconList: [
					{
						icon: 'setting',
						span: '我的订单'
					},
					{
						icon: 'setting',
						span: '藏品记录'
					},
					{
						icon: 'setting',
						span: '消息'
					},
					{
						icon: 'setting',
						span: '设置'
					}
				],
        defaultPersonPng :require("@/common/images/home/default-person.jpg"),
      }
    },

    mounted() {
      // 控制设备物理返回按键
      if (!IsPC()) {
        pushHistory();
        this.gotoURL(() => {
        })
      }
    },

    watch: {
    },

    computed:{
      ...mapGetters([
        'userInfo'
      ])
    },

    beforeRouteEnter (to, from, next) {
      next()
    },

    beforeRouteLeave (to, from, next) {
      next()
    },

    methods:{
      ...mapMutations([
        'changeTitleTxt'
      ]),

      juddgeIspc () {
        return IsPC()
      },

      toEditPersonPage () {
			},

			toSetPage () {
			}
    }
  }
</script>
<style lang='less' scoped>
  @import "../common/stylus/variable.less";
  @import "../common/stylus/mixin.less";
  @import "../common/stylus/modifyUi.less";
  .page-box {
    .content-wrapper();
    .van-nav-bar {
      background: #252525
    };
    .content-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      background: #252525;
      margin-top: 45px;
      .content-top {
        height: auto;
        font-size: 14px;
        background: #252525;
			.person-message-box {
				width: 92%;
				margin: 0 auto;
				height: 120px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				.message-left {
					flex: 1;
					padding-left: 6px;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					.person-picture {
						width: 65px;
						height: 65px;
						border-radius: 50%;
						img {
							width: 100%;
							height: 100%;
							border-radius: 50%
						}
					};
					.person-name {
						color: #fff;
						height: 80px;
						margin-left: 10px;
						font-size: 20px;
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						div {
							&:last-child {
								font-size: 13px;
								display: flex;
								flex-flow: row nowrap;
                margin-top: 4px;
                color: #636363;
								span {
									display: inline-block;
									height: 26px;
									text-align: center;
									line-height: 26px
								}
							}
						}
					}
				}
			};
			.function-zone {
				width: 92%;
				margin: 0 auto;
				height: 75px;
				background: #2a1f32;
				border-radius: 10px;
				display: flex;
				flex-flow: row wrap;
				.function-zone-icon-list {
					flex: 1;
					height: 75px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					span {
						color: #878787;
						margin-top: 10px;
					}
				}
			}
		};		
		.content-bottom {
			flex: 1;
			font-size: 13px;
			position: relative;
			display: flex;
			flex-direction: column;
      width: 92%;
			margin: 0 auto;
			margin-top: 10px;
			padding: 0 6px 6px 6px;
      box-sizing: border-box;
			border-radius: 10px;
      .nick-name {
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
        align-items: center;
				height: 46px;
				padding: 6px;
        background: #2a1f32;
        margin-bottom: 10px;
				.left {
					font-size: 16px;
					color: #FFFFFF;
					display: flex;
          flex-flow: row nowrap;
					justify-content: space-between;
          >span {
            margin-left: 16px;
          }
				};
				.right {
					> div {
						display: flex;
						flex-direction: column;
						justify-content: center;
					}
				}
			}
		}
    }
  }
</style>
