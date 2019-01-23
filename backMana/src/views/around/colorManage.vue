<template>
  <div class="colorManage" :style="{display: colorFrame}">
        <div class="title">
            <p>前台展示效果预览</p>
            <i class="el-icon-close" @click='colorCancel'></i>
        </div>
        <div class="content">
            <table cellpadding='0' cellspacing='0' @click='openMiss'>
                <tr height='10%'>
                    <td>修改按钮</td>
                    <td>无状态</td>
                    <td>悬停</td>
                    <td>点击时</td>
                    <td>选中后</td>
                </tr>
                <tr height='10%'>
                    <td>导航按钮</td>
                    <td><colorPicker @click='viewPicker' v-model="colorNoTab" v-on:change="headleNoTab"></colorPicker></td>
                    <td><colorPicker v-model="colorStopTab" v-on:change="headleStopTab"></colorPicker></td>
                    <td><colorPicker v-model="colorClickTab" v-on:change="headleClickTab"></colorPicker></td>
                    <td><colorPicker v-model="colorSelectTab" v-on:change="headleSelectTab"></colorPicker></td>
                </tr>
                <tr height='10%'>
                    <td>内容切换按钮</td>
                    <td>————</td>
                    <td>————</td>
                    <td>————</td>
                    <td><colorPicker v-model="colorSelectContent" v-on:change="headleSelectContent"></colorPicker></td>
                </tr>
                <tr height='50%'>
                    <td>更改背景</td>
                    <td colspan="4" class="backButton">
                        <input type="file" @change="sureBack" id="backFile" style="display:none"/>
                        <div class="back row" :style="{display: backDisplay, backgroundImage: 'url(' + backImage + ')'}"></div>
                        <el-button @click="uploadBack" :icon="icon" class="row1" :style="{left: addBack}">{{buttonWords}}</el-button>
                    </td>
                </tr>
                <tr height='20%'>
                    <td>更改边框</td>
                    <td colspan="4"><colorPicker v-model="colorBorder" v-on:change="headleBorder"></colorPicker></td>
                </tr>
            </table>
        </div>
        <div class="bottom">
            <el-button type='primary' @click='colorOk'>确定</el-button>
            <el-button @click='colorCancel'>取消</el-button>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getUrl} from '../../utils/urlGet.js'
export default {
    data() {
        return {
            icon: 'el-icon-upload2',
            backDisplay: 'none',
            backImage: '',
            addBack: '',
            buttonWords: '上传图片',
            backFile: '',
            colorNoTab: 'white',
            colorStopTab: '#dfc29d',
            colorClickTab: '#c1a077',
            colorSelectTab: '#c7ad8c',
            colorSelectContent: '#c7ad8c',
            colorBorder: 'white',
            colorFrame: 'none'
        }
    },
    components: {

    },
    mounted() {
        const colorButton = document.getElementsByClassName('colorBtn');
        const open = document.getElementsByClassName('open');
        for (let i = 0; i < colorButton.length; i++) {
            colorButton[i].style.width = '100%';
            colorButton[i].style.height = '100%';
        }
        this.$on('userColor', (name) => { 
            //得到新添加的房间名字
            this.$forceUpdate();
            this.colorFrame = 'flex';
        });
    },
    methods: {
        //默认导航
        headleNoTab(color) {

        },
        headleStopTab() {

        },
        headleClickTab() {

        },
        headleSelectTab() {

        },
        headleSelectContent() {

        },
        headleBorder() {

        },
        colorOk() {

        },
        viewPicker(e) {
            e.stopPropagation();
            open[0].style.display = 'block';
            alert(1);
        },
        openMiss(e) {
            e.stopPropagation();
            const open = document.getElementsByClassName('open');
            for (let i = 0; i < open.length; i++) {
                open[i].style.opacity = 0;
            }
        },
        colorCancel() {
            this.$forceUpdate();
            this.$emit('colorCancel');
            this.colorFrame = 'none';
        },
        //点击上传背景
        uploadBack() {
            document.getElementById('backFile').click();
        },
        //背景选定之后
        sureBack() {
            if (document.getElementById('backFile').files[0]) {
                this.$forceUpdate();
                this.icon = 'el-icon-refresh';
                this.buttonWords = '更改图片';
                this.backDisplay = 'block';
                this.addBack = '83%';
                this.backImage = getUrl(document.getElementById('backFile').files[0]);
                this.backFile = document.getElementById('backFile').files[0];
            }
        }
    }
}
</script>

<style lang="scss">
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
        // overflow: hidden;
        table {
            width: 100.5%;
            height: 100.5%;
            margin-left: -0.2%;
            margin-top: -0.2%;
            cursor: pointer;
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
                .backButton {
                    position: relative;
                    .back {
                        width: px2rem(350);
                        height: px2rem(200);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                    .row1 {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translateX(-50%) translateY(-50%);
                    }
                    .el-button {
                        transition: all 0;
                        // transform: translateY(80%);
                        
                    }
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
.m-colorPicker {
    width: px2rem(70);
    height: px2rem(30);
    border: px2rem(1) solid black;
    // .colorBtn {
    //     width: 100%;
    //     height: 100%;
    // }
    // .m-colorPicker .box.open {
    //     width: px2rem(500);
    //     height: px2rem(400);
    //     z-index: 1000;
    // }
    // .open {
    //     width: px2rem(500);
    //     height: px2rem(400);
    //     z-index: 1000;
    // }
}
tr:last-of-type {
    td:last-of-type {
        .m-colorPicker {
            width: px2rem(250);
            height: px2rem(60);
            border: px2rem(1) solid black;
        } 
    }
}

.m-colorPicker .box.open[data-v-11842410] {
    width: px2rem(350);
    height: px2rem(400);
    z-index: 1000;
}
</style>
