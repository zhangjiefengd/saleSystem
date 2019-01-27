<template>
    <div id="leftNavBar" :style='{backgroundColor: backColor}'>
        <div class="leftLogo">
            <img :src="imgLogo" alt=""/>
        </div>
        <div id="leftWorld">
            <div name='houseTypeChoose' v-for="(world,index) in worlds" :key="index" @mouseover="hover(index)" @mouseout="hoverOut(index)" @mousedown="mouseDown(index)" @mouseup="leave(index)" @click="changeColor(index)" :class="[{changeColor: index==changeIndex}]" >
                {{world.houseTypeName}}
            </div>
        </div>
        <div class="leftEat">
            <!-- <img src="../../../assets/img/leftNav/eat.png" alt=""> -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import getImage from '../../../ultis/getImage.js'
    export default {
    name: 'leftNavBar',
    data() {
        return{
            logo: '',
            eat: '',
            worlds: [],
            irrow: '',
            irrow1: '',
            irrow2: '',
            Num: 0,
            changeIndex: 0,
            leftBottom: 'leftBottom',
            intial: 1,//为点击一次户型使得有边框在0上
            houseNum: 0,
            imgLogo: "",
            clickNum: 0,
            backColor: '#ffffff',
            navHover: '#dfc29d',
            navClick: '#c1a077',
            navSelect: '#c7ad8c',
            noneFont: '#666666',
            clickFont: 'white'
            // numHanzi: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八"]
        }
    }, 
    created() {
        this.$axios.get("/basic/guidePage/get")
        .then((res) => {
            res.data.data && res.data.data.projectLogoLocation ? this.imgLogo = getImage(res.data.data.projectLogoLocation, 1) : "";
        })
        .catch(error => {
            console.log(error);
        });
        this.$axios.get("/house/houseType/get")
        .then(res => {
            if (res.data.code == 1) {
                this.worlds = res.data.data;
            }
            
        })
        .catch(error => {
            console.log(error);
        });
        this.$axios.get("/house/houseTypeStyle/get")
        .then((res) => {
            if (res.data.code == 1) {
                res.data.data.houseTypeNavigationNoneStatusStyle  ? this.backColor = res.data.data.houseTypeNavigationNoneStatusStyle  : "";
                res.data.data.houseTypeNavigationSuspensionStatusStyle ? this.navHover = res.data.data.houseTypeNavigationSuspensionStatusStyle : "";
                res.data.data.houseTypeNavigationClickStatusStyle ? this.navClick = res.data.data.houseTypeNavigationClickStatusStyle : "";
                res.data.data.houseTypeNavigationClickedStatusStyle  ? this.navSelect = res.data.data.houseTypeNavigationClickedStatusStyle  : "";
            
                res.data.data.houseTypeNavigationFontNoneStatusStyle ? this.noneFont =res.data.data.houseTypeNavigationFontNoneStatusStyle : '' ;
                res.data.data.houseTypeNavigationFontClickedStatusStyle  ? this.clickFont =res.data.data.houseTypeNavigationFontClickedStatusStyle  : '' ;
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    mounted() {
        this.$on('haha', () => {
            let houseTypeChoose = document.getElementsByName('houseTypeChoose');
            for (let i = 0; i < houseTypeChoose.length; i++) {
                if (houseTypeChoose[i].className == 'changeColor') {
                    this.houseNum = i;
                    this.$emit('eventC', this.houseNum);
                }
            }
        });
    },
    methods: {
        hover(i) {document.getElementsByName('houseTypeChoose')[i].style.backgroundColor = this.navHover; document.getElementsByName('houseTypeChoose')[i].style.color = this.clickFont},
        hoverOut(i) {
            if (this.changeIndex == i) {
                document.getElementsByName('houseTypeChoose')[i].style.backgroundColor = this.navSelect; 
                document.getElementsByName('houseTypeChoose')[i].style.color = this.clickFont;
            } else {
                document.getElementsByName('houseTypeChoose')[i].style.backgroundColor = this.backColor; 
                document.getElementsByName('houseTypeChoose')[i].style.color = this.noneFont;
            }
        },
        mouseDown(i) {document.getElementsByName('houseTypeChoose')[i].style.backgroundColor = this.navClick; document.getElementsByName('houseTypeChoose')[i].style.color = this.clickFont},
        leave(i) {
            
        },
        changeColor: function (index) {
            const houseTypeChoose = document.getElementsByName('houseTypeChoose');
            for (let i = 0; i < houseTypeChoose.length; i++) {
                houseTypeChoose[i].style.backgroundColor = this.backColor; 
                houseTypeChoose[i].style.color = this.noneFont;
            }
            houseTypeChoose[index].style.backgroundColor = this.navSelect; 
            houseTypeChoose[index].style.color = this.clickFont;
            this.changeIndex = index;
            this.$emit('ievent', index, this.intial);
        },
        //随时监控左边栏的位置
        watch() {
            let timer = setInterval(() => {
                let houseTypeChoose = document.getElementsByName('houseTypeChoose');
                for (let i = 0; i < houseTypeChoose.length; i++) {
                    if (houseTypeChoose[i].className == 'changeColor') {
                        this.houseNum = i;
                        this.$emit('eventC', this.houseNum);
                    }
                }
            }, 0);
        }
    },  
    watch: {
        worlds() {
            this.Num = this.worlds.length-1;
            this.watch();
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
@import '../../../styles/common.scss';

#leftNavBar {
    width: 100%;
    height: 100%;
    background-color: white;
    .leftLogo {
        width: 100%;
        height: px2rem(223);
        @include fj(center);
        align-items: flex-end;
        img {
            width: px2rem(179);
            height: px2rem(123);
        }
    }
    #leftWorld {
        width: 100%;
        margin-top: px2rem(110);
        height: vertical(500);
        // background-color: #fff;
        // @include fj(space-around);
        // flex-direction: column;
        // align-items: center;
        overflow-x: hidden;
        overflow-y: scroll;
        @include scrollBarTwo();
        div {
            width: 100%;
            height: px2rem(110);
            text-align: center;
            @include sc(px2rem(36), #666666);
            @include fj(center);
            align-items: center;
            cursor: pointer;
            margin-top: 0;
        }
        .changeColor{
            background-color:  #c7ad8c;
            color: white;
            >img{
                background-image: url();
            }
        }
        // >div:hover {
        //     background-color: #dfc29d;
        //     color: white;
        // }
        // >div:active {
        //     background-color: #c1a077;
        //     color: white;
        // }
    }
    .leftEat{
        width: 100%;
        height: px2rem(195);
        @include fj(center);
        align-items: center;
        img{
            width: px2rem(106);
            cursor: pointer;
        }
    }
}
</style>
