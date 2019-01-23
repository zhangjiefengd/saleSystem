<template>
  <div class="colorManage">
        <div class="title">
            <p>前台展示效果预览</p>
            <i class="el-icon-close" @click="cancelAdd"></i>
        </div>
        <div class="content">
            <table cellpadding='0' cellspacing='0'>
                <tr height='10%'>
                    <td>修改按钮</td>
                    <td>无状态</td>
                    <td>悬停</td>
                    <td>点击时</td>
                    <td>选中后</td>
                </tr>
                <tr height='10%'>
                    <td>导航按钮</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr height='10%'>
                    <td>内容切换按钮</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr height='50%'>
                    <td>更改背景</td>
                    <td colspan="4">
                        <!-- <input type="file" @change="sureBack" id="backFile" style="display:none"/>
                        <div class="qrCode row" :style="{display: qrCodeDisplay, backgroundImage: 'url(' + qrCodeImage + ')'}"></div>
                        <el-button @click="uploadQr" :icon="icon" class="row" :style="{left: addQr}">{{buttonWords}}</el-button> -->
                    </td>
                </tr>
                <tr height='20%'>
                    <td>更改边框</td>
                    <td colspan="4"></td>
                </tr>
            </table>
        </div>
        <div class="bottom">
            <el-button type='primary' @click='addNewProject'>确定</el-button>
            <el-button @click="cancelAdd">取消</el-button>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
@import "../../styles/main.scss";
@import "../../styles/mixin.scss";
.colorManage {
    width: px2rem(800);
    height: px2rem(800);
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: px2rem(15);
    @include fj();
    flex-direction: column;
    align-items: center;
    .title {
        width: 100%;
        height: 10%;
        padding: px2rem(30);
        @include fj();
        align-items: center;
        border-bottom: px2rem(1) solid black;
        p {
            @include sc(px2rem(25), black);
        }
        i {
            font-size: px2rem(30);
            cursor: pointer;
        }
    }
    .content {
        width: 90%;
        height: 70%;
        overflow: hidden;
        table {
            width: 100.5%;
            height: 100.5%;
            margin-left: -0.2%;
            margin-top: -0.2%;
            // border: px2rem(1) solid #357DD3;
            tr {
                td {
                    border: px2rem(1) solid #C0C4CC;
                    text-align: center;
                    @include sc(px2rem(20));
                    color: #909399;
                    font-weight: 400;
                    width: 19%;
                }
                td:first-of-type {
                    width: 24%;
                }
            }
        }
    }
    .bottom {
        width: 100%;
        height: 10%;
        @include fj(center);
        // background-color: red;
        .el-button {
            height: 75%;
            @include fj(center);
            align-items: center;
            span {
                width: 30%;
                height: 50%;
                @include fj(center);
                align-items: center;
            }
        }
    }
}
</style>
