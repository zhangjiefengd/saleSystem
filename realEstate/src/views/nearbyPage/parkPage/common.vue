<template>
    <div class="content">
        <div class="changePosition">
            <div class="topHouse">
                <img src="../../../assets/img/goHouseHistory/goHistory.png" @click="goHistory()">
            </div>
            <div class="middleHouse">
                <div class="bigPic" v-show='picUrl' :style="{borderColor: borderColor, backgroundImage: 'url(' + picUrl + ')'}">
                    <span :style='{spanDisplay: spanDisplay}'>加载中...</span>
                </div>
                <right @event='getPicUrl' @eventB='checkEffect' :intial=1 ref="rightA"></right>
            </div>
        </div>
        <!-- 传给子组件值 -->
        <bottom :typeClassChange='typeClassChange' :typeClassChangeTwo='typeClassChangeTwo'></bottom>
        <contact @haveCon='haveCon'></contact>
        <contact-content @closeInfo='closeInfo' :style='{display: conDisplay}'></contact-content>
    </div>
</template>

<script type="text/ecmascript-6">
import bottom from '../components/bottomNavBar';
import getImage from '../../../ultis/getImage.js'
import right from "../components/rightNavBar";
import contact from '../../../components/haveContact'
import contactContent from '../../../components/contactContent'
export default {
    data() {
        return {
            typeClassChangeTwo: "noActive",//传给bottom没有被点击的盒子样式
            typeClassChange: "active",//传给bottom被点击的盒子样式
            picUrl: "",
            houseNum: 0,//户型号
            housePlans: [],
            intial: 1,
            conDisplay: 'none',
            imgBack: '',
            picUrlBig: '',
            borderColor: '#ffffff',
            spanDisplay: 'block'
        }
    },
    created() {
        this.$axios.get("/surround/surroundingTypeStyle/get")
        .then((res) => {
            if (res.data.code == 1) {
                res.data.data.surroundingBorderStyle   ? this.borderColor = res.data.data.surroundingBorderStyle     : "";
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    mounted(){
        // this.$on('bridge', (val, val2) => {
        //     this.chuFa(val, val2);
        // });
        // this.$on('bridgeTwo', (val) => {
        //     this.$refs.rightA.$emit('changeHouse2', val);
        // });
        // this.shuaXin();
    },
    methods: {
        //点击返回
        goHistory() {
            this.$router.push('/index'); 
        },
        getPicUrl(clickUrl) {
            this.picUrl = getImage(clickUrl, 5);
            const ele = document.querySelector('.bigPic');
            const span = ele.getElementsByTagName('span')[0];
            span.style.display = 'block';
            if (screen.width > 1024) {
                this.picUrlBig = getImage(clickUrl, 2);
            } else {
                this.picUrlBig = getImage(clickUrl, 3);
            }
        },
        chuFa(val, val2) {
            this.$refs.rightA.$emit('changeHouse', val, val2);
        },
        checkEffect() {
            document.getElementsByClassName('bigPic')[0].setAttribute('class', 'bigPic complete');
        },
        //强制刷新
        shuaXin() {
            window.onload = () => {
                this.$router.replace("/index"); 
            }
        }  ,
        haveCon() {
            this.conDisplay = 'flex';
            this.$forceUpdate();
        },
        closeInfo() {
            this.conDisplay = 'none';
            this.$forceUpdate();
        },
    },
    components: {
        bottom,
        right,
        contact,
        contactContent
    },
    watch: {
        picUrlBig() {
            var ele = document.querySelector('.bigPic');
            var imgUrl = this.picUrlBig;
            var imgObject = new Image();

            imgObject.src = imgUrl;
            const that = this;
            imgObject.onload = function () {
                this.imgBack = imgUrl;
                // console.log(this.imgProjectBack);
                ele.style.backgroundImage = 'url(' + this.imgBack + ')';
                const span = ele.getElementsByTagName('span')[0];
                span.style.display = 'none';
                
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
    background-image: url('../../../assets/img/goHouseHistory/houseBack.jpg');
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
            margin-top: px2rem(150);
            // background-color: white;
            .bigPic {
                width: px2rem(1107);
                height: 100%;
                margin-left: transverse(95);
                border: px2rem(3) solid ;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                @include fj(center);
                align-items: center;
                span {
                    @include sc(px2rem(40), white);
                    font-style:italic;
                }
                // filter: blur(10px);
                // transition: all 0.7s;
            }
            .complete {
                filter: blur(0);
            }        
        }
    }
}

</style>
