<template>
   <!-- 启动页 -->
        <div class="main">
            <div class="top">
                <img src="../../static/img/default-person.jpg" style="width: 100px" alt="">
            </div>
            <div class="bottom">
                <img src="../../static/img/blockchain-service.png" style="width:100px" alt="">
                <span style=" margin-left:8px;font-size:10px;">提供技术支持</span>
            </div>
        </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    @import "../common/stylus/variable.less";
    @import "../common/stylus/mixin.less";
    @import "../common/stylus/modifyUi.less";
    .main {
        .content-wrapper();
        min-height: 100vh;
        background: @color-background;
        .top {
            flex:1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center
        };
        .bottom {
            height: 30vh;
            display: flex;
            justify-content: center;
            align-items: center;
            >span {
                color: #c2c2c2
            }
        }
    }
</style>