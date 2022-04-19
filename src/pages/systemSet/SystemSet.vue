<template>
  <div class="page-box">
    <NavBar title="设置" path="myInfo" />
    <div class="content-box">
      <div class="content-top">
      	<div class="nick-name photo-box">
			<div class="left">
				<span>头像</span>
			</div>
			<div class="right">
                <img :src="defaultPersonPng">
                <img :src="arrowRightPng" alt="">
			</div>
		</div>
        <div class="nick-name">
			<div class="left">
				<span>昵称</span>
			</div>
			<div class="right">
                <span>凝结</span>
                <img :src="arrowRightPng" alt="">
			</div>
		</div>
        <div class="nick-name">
			<div class="left">
				<span>个性签名</span>
			</div>
			<div class="right" @click="changeIndividualitySignature">
                <span>TA很神秘,什么都没有留下,TA很神秘,什么都没有留下</span>
                <img :src="arrowRightPng" alt="">
			</div>
		</div>
      </div>
      <div class="content-bottom" @click="cancellationEvent">
        <span>退出登录</span>
      </div>
    </div>
  </div>
</template>
<script>
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
	  NavBar
    },
    data() {
      return {
        noDataShow: false,
        showLoadingHint: false,
        versionNumber: '1.8',
        defaultPersonPng :require("@/common/images/home/default-person.jpg"),
        arrowRightPng: require("@/common/images/login/arrow-right.png")
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

      //账号注销事件
      cancellationEvent () {
        this.$router.push({path: '/'})
      },

      //修改签名事件
      changeIndividualitySignature () {
          this.$router.push({path: 'individualitySignature'})
      }
    }
  }
</script>
<style lang='less' scoped>
  @import "~@/common/stylus/variable.less";
  @import "~@/common/stylus/mixin.less";
  @import "~@/common/stylus/modifyUi.less";
  .page-box {
    .content-wrapper();
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
    .content-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      background: @color-background;
		.content-top {
			height: 300px;
			font-size: 13px;
			position: relative;
			display: flex;
			flex-direction: column;
            width: 92%;
			margin: 0 auto;
			margin-top: 20px;
			padding: 6px;
            box-sizing: border-box;
            .nick-name {
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
                align-items: center;
				height: 46px;
				padding: 6px;
                background: @color-block;
                border-radius: 10px;
                margin-bottom: 10px;
				.left {
                    width: 100px;
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
                    flex: 1;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: flex-end;
                    span {
                       font-size: 14px;
                       color: #717078;
                       margin: 0 6px;
                       width: 120px;
                       flex: 1;
                       text-align: right;
                       .no-wrap()
                    };
                    img {
                      width: 8px;
                      height: 10px
                    }
				}
			};
            .photo-box {
                .right {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: flex-end;
                    align-items: center;
                    img {
                       width: 40px;
                       height: 40px;
                       margin: 0 6px;
                       border-radius: 50%;
                       &:last-child {
                         width: 8px;
                         height: 10px
                       }
                    }
				}
            }
		};
        .content-bottom {
          width: 92%;
          margin: 0 auto;
          border-radius: 10px;
          box-sizing: border-box;
          padding: 6px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          height: 55px;
          background: @color-block;
          color: #bc67ff;
          font-size: 15px;
        }
    }
  }
</style>
