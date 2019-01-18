<template>
    <div class="content">
        <div class="changePosition">
            <div class="topHouse">
                <img src="../../../assets/img/goHouseHistory/goHistory.png" @click="goHistory()">
            </div>
            <div class="middleHouse">
                <div class="bigPic" :style="{backgroundImage: 'url(' + picUrlMin + ')'}">

                </div>
                <right @event='getPicUrl' @eventB='checkEffect' @checkVR='checkVR' @haha='haha' :intial=1 ref="rightA"></right>
            </div>
        </div>
        <!-- 传给子组件值 -->
        <bottom ref="bottom" @changeCate='changeCate' :typeClassChange='typeClassChange' :typeClassChangeThree='typeClassChangeTwo' :typeClassChangeTwo='typeClassChangeTwo' ></bottom>
    </div>
</template>

<script type="text/ecmascript-6">
import bottom from '../components/navBar/bottomNavBar'
import right from "../components/navBar/rightNavBar";
import getImage from '../../../ultis/getImage.js'

export default {
    data() {
        return {
            typeClassChangeTwo: "noActive",//传给bottom没有被点击的盒子样式
            typeClassChange: "active",//传给bottom被点击的盒子样式
            picUrl: "",
            houseNum: 1,//户型号
            housePlans: [],
            intial: 1,
            val: 0,
            check: 0,
            picUrlMin: '',
            picUrlBig: ''
        }
    },
    mounted(){
        // console.log(this.$route.query.houseNum);
        this.$on('bridge', (val, val2) => {
            this.chuFa(val, val2);
            // this.$refs.bottom.$emit('checkVR', val);
        });
        this.$on('bridgeTwo', (val) => {
            // console.log(val);
            this.$refs.rightA.$emit('changeHouse2', val);
            this.$refs.bottom.$emit('checkVR', val, 1);
            // this.getPicUrl(this.dataAll[val].housePlans[0].houseTypeImage.image.url);
            // this.val = val;
        });
        // this.shuaXin();
    },
    methods: {
        checkVR(val, cate) {
            // alert(val);
           this.$refs.bottom.$emit('checkVR', val, 1);
        },
        //点击返回
        goHistory() {
            // window.location.href = "/index"; 
            this.$router.push('/index');
        },
        getPicUrl(clickUrl) {
            // this.check++;
            this.picUrl = clickUrl;
            this.picUrlMin = getImage(clickUrl, 5);
            if (screen.width > 1024) {
                this.picUrlBig = getImage(clickUrl, 1);
            } else {
                this.picUrlBig = getImage(clickUrl, 2);
            }
        },
        chuFa(val, val2) {
            this.$refs.rightA.$emit('changeHouse', val, val2);
        },
        changeCate() {
            
            this.$refs.rightA.$emit('changeHouse2', this.val);
            // });
        },
        haha() {
            document.getElementsByClassName('bigPic')[0].setAttribute('class', 'bigPic');
        },
        checkEffect() {
            document.getElementsByClassName('bigPic')[0].setAttribute('class', 'bigPic complete');
        },
        //强制刷新
        shuaXin() {
            window.onload = () => {
                this.$router.replace("/index"); 
            }
        }  
    },
    components: {
        bottom,
        right
    },
    watch: {
        picUrl() {
            var ele = document.querySelector('.bigPic');
            var imgUrl = this.picUrlBig;
            var imgObject = new Image();

            imgObject.src = imgUrl;
            imgObject.onload = function () {
                this.imgBack = imgUrl;
                // console.log(this.imgProjectBack);
                ele.style.backgroundImage = 'url(' + this.imgBack + ')';
                // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
                ele.setAttribute('class', 'bigPic complete');
                
            }           
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';

.content {
    width: 100%;
    height: 100%;
    background-color: #D7D7D7;
    .changePosition {
        width: 100%;
        height: vertical(905);
        // display: flex;
        // flex-direction: column;
        // justify-content: flex-end;
        .topHouse {
            height: vertical(117);
            position: absolute;
            display: flex;
            align-items: flex-end;
            right: px2rem(95);
            img {
                width: px2rem(63);
                height: px2rem(57);
                cursor: pointer;
            }
        }
        .middleHouse {
            width: 100%;
            height: percentage(725 / 905);
            display: flex;
            align-items: center;
            margin-top: px2rem(167);
            // background-color: white;
            .bigPic {
                width: px2rem(1107);
                height: 100%;
                margin-left: transverse(95);
                border: px2rem(8) solid white;
                background-repeat: no-repeat;
                background-size: percentage(1094 / 1098) percentage(761 / 765);
                filter: blur(10px);
                transition: all 0.7s;
            }
            .complete {
                filter: blur(0);
            }        
        }
    }
}
.complete {
    filter: blur(0);
} 

</style>
