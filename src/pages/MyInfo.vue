<template>
  <div class="page-box">
    <NavBar :leftArrow="false" />
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
          <div class="function-zone-icon-list" v-for="(item,index) in zoneIconList" :key="index" @click="featureSetTopEvent(item)">
            <van-icon :name="item.icon" size="32" color="#ee9f4d" />
            <span>{{item.span}}</span>
          </div>
        </div>
		  </div>
      <div class="content-bottom">
      	<div class="nick-name" v-for="(item,index) in featureSetList" :key="index" @click="featureSetEvent(item)">
			<div class="left">
				<van-icon :name="item.iconLeft" size="20" color="#c0bebe" />
				<span>{{item.span}}</span>
			</div>
			<div class="right">
				<div>
					<van-icon :name="item.iconRight" size="15" color="#6c6c6c" />
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
  import NavBar from '@/components/NavBar'
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
      FooterBottom,
	  NavBar
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
				featureSetList: [
					{
						iconLeft: 'contact',
						iconRight: 'arrow',
						span: '账号与安全'
					},
					{
						iconLeft: 'service-o',
						iconRight: 'arrow',
						span: '我的客服'
					},
					{
						iconLeft: 'info-o',
						iconRight: 'arrow',
						span: '关于'
					},
					{
						iconLeft: 'share-o',
						iconRight: 'arrow',
						span: '分享'
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
		},

		// 上部区域功能事件
		featureSetTopEvent(item) {
			if (item.span === '我的订单') {
				this.$router.push({path: 'myOrderForm'}) 
			} else if (item.span === '藏品记录') {
				this.$router.push({path: 'collectionRecords'})
			} else if (item.span === '设置') {
				this.$router.push({path: 'systemSet'})
			}
		}, 

		// 下部区域功能事件
		featureSetEvent(item) {
			if (item.span === '账号与安全') {
				this.$router.push({path: 'accountSecurity'})
			}
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
    .content-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      background: #252525;
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
