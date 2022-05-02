<template>
  <div class="page-box">
    <NavBar title="消息" path="myInfo" />
    <div class="content-box">
        <div class="message-list" v-for="(item,index) in messageList" :key="index">
            <div class="top">
                <span class="message-title">{{item.messageTitle}}</span>
                <span class="message-date">{{item.messageDate}}</span>
            </div>
            <div class="bottom">
                <P>
                   {{item.messageContent}}
                </P>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
  import NavBar from '@/components/NavBar'
  import { mapGetters, mapMutations } from 'vuex'
  import {IsPC} from '@/common/js/utils'
  export default {
    name: 'SystemMessage',
    components:{
	    NavBar
    },
    data() {
      return {
        messageList: [
            {
                messageTitle: '系统消息',
                messageDate: '03/06 17:33',
                messageContent: '数字藏品为虚拟数字商品,坚决反对一切形式的炒作,数字藏品为虚拟数字商品,坚决反对一切形式的炒作,数字藏品为虚拟数字商品,坚决反对一切形式的炒作'
            },
            {
                messageTitle: '系统消息',
                messageDate: '03/06 17:33',
                messageContent: '数字藏品为虚拟数字商品,坚决反对一切形式的炒作,数字藏品为虚拟数字商品,坚决反对一切形式的炒作,数字藏品为虚拟数字商品,坚决反对一切形式的炒作'
            }
        ]
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
    .content-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      background: @color-background;
      .message-list {
          &:first-child {
            margin-top: 40px
          };
          width: 92%;
          margin: 0 auto;
          margin-bottom: 10px;
          padding: 20px;
          box-sizing: border-box;
          background: #100726;
          border-radius: 8px;
          .top {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            >span {
                display: inline-block;
                &:first-child {
                    color: #fff;
                    font-size: 14px;
                    padding-right: 4px;
                    box-sizing: border-box;
                    flex: 1;
                    .no-wrap()
                };
                 &:last-child {
                    color: #fff;
                    font-size: 12px;
                    color: #716f78
                }
            }
          };
          .bottom {
            margin-top: 16px;
            color: #716f78;
            font-size: 13px;
            line-height: 22px;
            text-align: justify
          }
      }
    }
  }
</style>
