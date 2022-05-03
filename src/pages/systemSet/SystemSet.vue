<template>
  <div class="page-box">
    <NavBar title="设置" path="myInfo" />
     <!-- 是否退出登录确认框 -->
    <van-dialog v-model="isShowLogout" :show-cancel-button="true"  :close-on-popstate="false" title="确认要退出登录吗"
      confirm-button-text="退出登录"
      @confirm="logoutSureEvent" 
      @cancel="logoutCancelEvent"
    />
    <van-loading type="spinner" v-show="loadingShow"/>
    <van-overlay :show="overlayShow" />
    <div class="content-box">
      <div class="content-top">
      <div class="nick-name photo-box">
			<div class="left">
				<span>头像</span>
			</div>
			<div class="right" @click="changeHeadPortrait">
          <img :src="notLoginPng" v-show="!isLogin" class="imgIcon" alt="">
          <img :src="defaultPersonPng" v-show="isLogin && userInfo && !userInfo.hasOwnProperty('avatarUrl')" class="imgIcon" alt="">
          <img :src="userInfo.avatarUrl" v-show="isLogin && userInfo && userInfo.hasOwnProperty('avatarUrl')" class="imgIcon" alt="">
          <img :src="arrowRightPng" class="imgIcon" alt="" width="8">
			</div>
		</div>
        <div class="nick-name">
			<div class="left">
				<span>昵称</span>
			</div>
			<div class="right" @click="changeNickname">
        <span v-show="isLogin">{{userInfo.nickName}}</span>
        <img :src="arrowRightPng" alt="">
			</div>
		</div>
    <div class="nick-name">
			<div class="left">
				<span>个性签名</span>
			</div>
			<div class="right" @click="changeIndividualitySignature">
        <span v-show="!userInfo.signTxt && isLogin">TA很神秘,什么都没有留下,TA很神秘,什么都没有留下</span>
        <span v-show="userInfo.signTxt && isLogin">{{userInfo.signTxt}}</span>
        <img :src="arrowRightPng" alt="">
			</div>
		</div>
      </div>
      <div class="content-bottom" @click="isShowLogout=true">
        <span>退出登录</span>
      </div>
      <!-- 拍照选择 -->
      <transition name="van-slide-up">
        <div class="choose-photo-box" v-show="photoBox">
          <div class="choose-photo">
            <van-icon name="photo" />
            <input name="uploadImg1" id="demo1" @change="previewFileOne" type="file" accept="image/*"/>从图库中选择
          </div>
          <div class="photo-graph">
            <van-icon name="photograph" />
            <input name="uploadImg2" id="demo2"  @change="previewFileTwo" type="file" accept="image/camera" capture="camera"/>拍照
          </div>
          <div class="photo-cancel" @click="photoCancel">取消</div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import NavBar from '@/components/NavBar'
  import { mapGetters, mapMutations } from 'vuex'
  import {logout} from '@/api/login.js'
  import {changeAvatar,inquareUserInfo} from '@/api/products.js'
  import { IsPC} from '@/common/js/utils'
  export default {
    name: 'SystemSet',
    components:{
	    NavBar
    },
    data() {
      return {
        photoBox: false,
        isShowLogout: false,
        overlayShow: false,
        loadingShow: false,
        defaultPersonPng :require("@/common/images/home/default-person.jpg"),
        arrowRightPng: require("@/common/images/login/arrow-right.png"),
        notLoginPng :require("@/common/images/login/not-login.png")
      }
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
      document.addEventListener('click', (e) => {
        if(e.target.className !='right' && e.target.className != 'imgIcon'){
          this.photoBox = false;
          this.overlayShow = false
        }
      })
    },

    watch: {
    },

    computed:{
      ...mapGetters([
        'userInfo',
        'isLogin'
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
        'storeUserInfo',
        'changeIsLogin'
      ]),

      juddgeIspc () {
        return IsPC()
      },

      //input调取摄像头兼容性处理
      dealPhotographCompatibleEvent () {
        let file = document.querySelector('input');
        if (this.getIos()) {
          file.removeAttribute("capture");
        }
      },

      // 判断是否为ios
      getIos() {
        let ua = navigator.userAgent.toLowerCase();
        if (ua.match(/iPhone\sOS/i) == "iphone os") {
          return true
        } else {
          return false
        }
      },


      // 修改头像事件
      saveChangeAvatarEvent (data) {
        this.loadingShow = true;
        changeAvatar(data).then((res) => {
            this.loadingShow = false;
            if (res && res.data.code == 0) {
                this.$toast({
                  message: '头像修改成功',
                  position: 'bottom'
                });
                this.queryuserInfo()
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
      },

      // 查询用户信息
      queryuserInfo () {
        inquareUserInfo().then((res) => {
          if (res && res.data.code == 0) {
            this.storeUserInfo(res.data.data)
          } else {
            this.$toast({
              message: `${res.data.msg}`,
              position: 'bottom'
            })
          }
        })
        .catch((err) => {
          this.$toast({
            message: `${err.message}`,
            position: 'bottom'
          })
        })
      },

      // 弹框确定注销
      logoutSureEvent () {
        this.isShowLogout = false;
        this.logoutEvent()
      },

      //  弹框取消注销
      logoutCancelEvent () {
        this.isShowLogout = false
      },

      //退出登录事件
      logoutEvent () {
        this.loadingShow = true;
        logout().then((res) => {
          this.loadingShow = false;
          if (res && res.data.code == 0) {
              this.changeIsLogin(false);
              // 清空store和localStorage
              this.$store.dispatch('resetFabricState');
              this.$store.dispatch('resetLoginState');
              window.localStorage.clear();
              this.$router.push({
                path: '/myInfo'
              });
              this.$toast({
                message: '退出登录成功',
                position: 'bottom'
              });
            } else {
              this.$toast({
                message: `${res.data.msg}`,
                position: 'bottom'
              })
            }
        })
        .catch((err) => {
          this.$toast({
            message: `${err.message}`,
            position: 'bottom'
          })
          this.loadingShow = false
        })
      },

      // 修改昵称事件
      changeNickname () {
        this.$router.push({path: 'changeNickname'})
      },

      //修改签名事件
      changeIndividualitySignature () {
        this.$router.push({path: 'individualitySignature'})
      },

      // 修改头像事件
      changeHeadPortrait () {
        this.dealPhotographCompatibleEvent();
        this.photoBox = true;
        this.overlayShow = true
      },

      // 图片上传预览
      previewFileOne() {
        let file = document.getElementById("demo1").files[0];
        let _this = this;
        let reader = new FileReader();
        let isLt2M = file.size/1024/1024 < 16;
        if (!isLt2M) {
          _this.$toast({
            message: '上传图片大小不能超过16MB!',
            position: 'bottom'
          });
          return
        };  
        reader.addEventListener("load", function () {
          let formData = new FormData();
          formData.append('file', file);
          _this.saveChangeAvatarEvent(formData)
        }, false);
        if (file) {
          reader.readAsDataURL(file);
        }
      },

      //拍照预览
      previewFileTwo() {
        let file = document.getElementById("demo2").files[0];
        let _this = this;
        let reader = new FileReader();
        let isLt2M = file.size/1024/1024 < 16;
        if (!isLt2M) {
          _this.$toast({
            message: '上传图片大小不能超过16MB!',
            position: 'bottom'
          });
          return
        };  
        reader.addEventListener("load", function () {
          let formData = new FormData();
          formData.append('file', file);
          _this.saveChangeAvatarEvent(formData)
        }, false);
        if (file) {
          reader.readAsDataURL(file);
        };
      },

      // 拍照取消
      photoCancel () {
        this.photoBox = false;
        this.overlayShow = false
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
            font-size: 18px !important
        };
        .van-nav-bar__title {
            color: #fff !important;
            font-size: 16px !important
        }
    };
    /deep/ .van-dialog {
      background: @color-block;
      .van-dialog__header {
        color: #fff
      };
      .van-dialog__footer {
        .van-button--default {
          background: @color-block;
        };
        .van-dialog__cancel {
          color: #cbcbcb
        };
        .van-dialog__confirm {
          color: #ffbc41;
          font-weight: bold
        }
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
                       color: #514a60;
                       margin: -2px 6px 0 8px;
                       width: 120px;
                       flex: 1;
                       text-align: right;
                       .no-wrap()
                    };
                    img {
                      width: 8px
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
                       border-radius: 50%;
                       margin-right: 2px;
                       &:last-child {
                        width: 8px !important;
                        height: auto !important
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
          color: #ffbc41;
          font-size: 18px;
        };
      .choose-photo-box {
        position: fixed;
        margin: auto;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 1000;
        font-size: 0;
        > div {
          width: 100%;
          text-align: center;
          font-size: 16px;
          background: #121212
        }
        .choose-photo {
          height: 60px;
          margin-bottom: 1px;
          line-height: 60px;
          position: relative;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          cursor: pointer;
          color: #FFFFFF;
          overflow: hidden;
          display: inline-block;
          *display: inline;
          *zoom: 1;
          /deep/ .van-icon {
            vertical-align: top;
            font-size: 20px;
            display: inline-block;
            line-height: 60px
          };
          input {
            position: absolute;
            font-size: 100px;
            right: 0;
            top: 0;
            height: 100%;
            opacity: 0;
            filter: alpha(opacity=0);
            cursor: pointer
          }
        };
        .photo-graph {
          position: relative;
          display: inline-block;
          height: 60px;
          overflow: hidden;
          margin-bottom: 4px;
          color: #FFFFFF;
          text-decoration: none;
          text-indent: 0;
          line-height: 60px;
          /deep/ .van-icon {
            vertical-align: top;
            font-size: 20px;
            display: inline-block;
            line-height: 60px
          };
          input {
            position: absolute;
            font-size: 100px;
            right: 0;
            height: 100%;
            top: 0;
            opacity: 0;
          }
        };
        .photo-cancel {
          position: relative;
          display: inline-block;
          overflow: hidden;
          color: #FFFFFF;
          text-decoration: none;
          text-indent: 0;
          height: 70px;
          line-height: 70px;
          font-weight: bold
        }
      } 
    }
  }
</style>
