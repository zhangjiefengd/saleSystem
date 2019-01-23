<template>
    <div id="leftNavBar">
        <div class="leftLogo">
            <img :src="imgLogo" alt=""/>
        </div>
        <div id="leftWorld">
            <router-link class="nav" tag="div" v-for="(word, index) in words" :key="index"  @mouseover.native="hover(index)" @mouseout.native="hoverOut(index)" @mousedown.native="mouseDown(index)" @mouseup.native="leave(index)" @click.native="changeColor(index)"  :to="word.toUrl" >
            {{ word.name }}
            </router-link>
        </div>
        <div class="leftEat">
            <!-- <img src="@/assets/img/leftNav/eat.png" alt=""> -->
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
            words: [
                {
                    name: '园林景观',
                    toUrl: '/nearBy/park'
                },
                {
                    name: '周边设施',
                    toUrl: '/nearBy/neighberhood'
                }
            ],
            changeIndex: 0,
            imgLogo: "",
            backColor: '#ffffff',
            navHover: '#dfc29d',
            navClick: '#c1a077',
            navSelect: '#c7ad8c',
            noneFont: '#666666',
            clickFont: 'white'
        }
    }, 
    created() {
        this.$axios.get("/basic/guidePage/get")
        .then((res) => {
        
            res.data.data && res.data.data.projectLogoLocation ? this.imgLogo = getImage(res.data.data.projectLogoLocation, 1) : "";
            // console.log(this.imgLogo);
        })
        .catch(error => {
            console.log(error);
        });
        this.$axios.get("/surround/surroundingTypeStyle/get")
        .then((res) => {
            if (res.data.code == 1) {
                res.data.data.houseTypeNavigationNoneStatusStyle  ? this.backColor = res.data.data.houseTypeNavigationNoneStatusStyle  : "";
                res.data.data.houseTypeNavigationSuspensionStatusStyle ? this.navHover = res.data.data.houseTypeNavigationSuspensionStatusStyle : "";
                res.data.data.houseTypeNavigationClickStatusStyle ? this.navClick = res.data.data.houseTypeNavigationClickStatusStyle : "";
                res.data.data.houseTypeNavigationClickedStatusStyle  ? this.navSelect = res.data.data.houseTypeNavigationClickedStatusStyle  : "";
                
                res.data.data.surroundingNavigationFontNoneStatusStyle ? this.noneFont = res.data.data.surroundingNavigationFontNoneStatusStyle : "";
                res.data.data.surroundingNavigationFontClickedStatusStyle   ? this.clickFont = res.data.data.surroundingNavigationFontClickedStatusStyle   : "";
                if (this.$route.path == '/nearBy/neighberhood') {
                    document.getElementsByClassName('nav')[1].style.backgroundColor = this.navSelect; 
                    document.getElementsByClassName('nav')[1].style.color = this.clickFont;
                    document.getElementsByClassName('nav')[0].style.color = this.noneFont;
                } else {
                    document.getElementsByClassName('nav')[0].style.backgroundColor = this.navSelect; 
                    document.getElementsByClassName('nav')[0].style.color = this.clickFont;
                    document.getElementsByClassName('nav')[1].style.color = this.noneFont;
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    methods: {
        hover(i) {document.getElementsByClassName('nav')[i].style.backgroundColor = this.navHover; document.getElementsByClassName('nav')[i].style.color = this.clickFont},
        hoverOut(i) {
            if (this.changeIndex == i) {
                document.getElementsByClassName('nav')[i].style.backgroundColor = this.navSelect; 
                document.getElementsByClassName('nav')[i].style.color = this.clickFont;
            } else {
                document.getElementsByClassName('nav')[i].style.backgroundColor = this.backColor; 
                document.getElementsByClassName('nav')[i].style.color = this.noneFont
            }
        },
        mouseDown(i) {document.getElementsByClassName('nav')[i].style.backgroundColor = this.navClick; document.getElementsByClassName('nav')[i].style.color = this.clickFont},
        leave(i) {
            
        },
        changeColor: function (index) {
            const nav = document.getElementsByClassName('nav');
            for (let i = 0; i < nav.length; i++) {
                nav[i].style.backgroundColor = this.backColor; 
                nav[i].style.color = this.noneFont;
            }
            nav[index].style.backgroundColor = this.navSelect; 
            nav[index].style.color = this.clickFont;
            this.changeIndex = index;
            // this.$emit('ievent', index, this.intial);
        },
    },
    watch: {

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
        }
    }
    #leftWorld {
        width: 100%;
        margin-top: px2rem(110);
        height: vertical(500);
        div {
            width: 100%;
            height: px2rem(110);
            text-align: center;
            @include fj(center);
            @include sc(px2rem(36), #666666);
            align-items: center;
            cursor: pointer;
        }
        .router-link-active {
            // background-color: #c7ad8c;
            color: white;
        }
        .changeColor{
            background-color: #c7ad8c;
            color: white;
        }
        >div:hover {
            // background-color: #dfc29d;
            color: white;
        }
        >div:active {
            // background-color: #c1a077;
            color: white;
        }
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
