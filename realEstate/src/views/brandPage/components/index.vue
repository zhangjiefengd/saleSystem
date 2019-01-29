<template>
<div id="leftNav">
  <div id="leftNavBar">
    <div class="leftLogo" >
      <img :src="companyLogo" alt="">
    </div>
    <ul id="LeftWorld">
      <router-link @click.native="closeLinkInfo(index)" tag="li" v-for="(world, index) in worlds" :key="index" :to="world.address" :class="index==Num?leftBottom:''">
        {{ world.name }}
      </router-link>
    </ul>
    <!-- <div class="leftEat">
       <img src="../../../assets/img/leftNav/eat.png" alt="">
    </div> -->
  </div>
  <div class="backImage"  @click="clickBack">
    <img src="../../../assets/img/goHouseHistory/goHistory.png" alt="">
  </div>
    <router-view></router-view>
  <!--</transition>-->
</div>
</template>

<script type="text/ecmascript-6">
import getImage from '@/ultis/getImage.js'

export default {
  name: 'layout',
  data () {
    return {
      worlds: [
        {
          'name': '企业简介',
          'address': '/brand/enterprise'
        },
        {
          'name': '品牌荣誉',
          'address': '/brand/honor'
        },
        {
          'name': '发展历程',
          'address': '/brand/develop'
        },
        {
          'name': '企业文化',
          'address': '/brand/culture'
        }
      ],
      Num: 0,
      leftBottom: 'leftBottom',
      isShowInfo: false,
      companyLogo: '',
      clickStatus: '#c1a077',
      clickedStatus: '#c7ad8c',
      clickNoneStatus: '#ffffff',
      upStatus: '#dfc29d'
    }
  },
  created () {
    this.$axios.get('/basic/guidePage/get')
      .then((res) => {
        (res.data.data && res.data.data.projectLogoLocation) ? this.companyLogo = getImage(res.data.data.projectLogoLocation, 1) : this.companyLogo = require('@/assets/img/leftNav/logo.png')
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.post('/brand/enterpriseStyle/get')
      .then((res) => {
        if (res.data.data) {
          this.clickNoneStatus = res.data.data.brandInfoNoneStatusStyle ? res.data.data.brandInfoNoneStatusStyle : '#ffffff'
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted () {
    var oUl = document.getElementById('LeftWorld')
    var oLi = oUl.getElementsByTagName('li')
    for (let i = 0; i < oLi.length; i++) {
      if (oLi[i].className === ('router-link-exact-active router-link-active')) {
        this.Num = i
      }
      oLi[i].onmouseover = () => {
        for (let j = 0; j < oLi.length; j++) {
          if (this.Num === j) {
            oLi[j].style.backgroundColor = this.clickedStatus
            oLi[j].style.color = '#ffffff'
          }
        }
        oLi[i].style.backgroundColor = this.upStatus
        oLi[i].style.color = '#ffffff'
      }
      oLi[i].onmouseleave = () => {
        for (let j = 0; j < oLi.length; j++) {
          if (this.Num !== j) {
            oLi[j].style.backgroundColor = this.clickNoneStatus
            oLi[j].style.color = '#666666'
          } else {
            oLi[j].style.backgroundColor = this.clickedStatus
            oLi[j].style.color = '#ffffff'
          }
        }
      }
      oLi[i].onmousedown = () => {
        oLi[i].style.backgroundColor = this.clickedStatus
      }
      oLi[i].onmouseup = () => {
        for (let j = 0; j < oLi.length; j++) {
          if (i !== j) {
            oLi[j].style.backgroundColor = this.clickNoneStatus
            oLi[j].style.color = '#666666'
          }
        }
      }
    }
  },
  methods: {
    clickBack: function () {
      this.$router.push({path: '/index'})
    },
    closeLinkInfo: function (i) {
      // console.log(i)
      this.isShowInfo = false
      this.Num = i
    },
    showInfo: function () {
      this.isShowInfo = !this.isShowInfo
    }
  },
  watch: {
    worlds () {
      this.Num = this.worlds.length - 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
#leftNav{
  width: 100%;
  height: 100%;
  position: relative;
  .backImage {
    height: vertical(125);
    position: absolute;
    display: flex;
    align-items: flex-end;
    right: px2rem(60);
    cursor: pointer;
    z-index: 99;
    >img {
      width: px2rem(57);
      height: px2rem(50);
    }
  }
  #leftNavBar {
    width: transverse(260);
    height: 100%;
    background-color: #ffffff;
    float: left;
    position: relative;
    .leftLogo {
      width: px2rem(179);
      margin: px2rem(90) auto;
      margin-bottom: 0;
      >img {
        width: 100%;
        height: 100%;
      }
    }
    #LeftWorld {
      width: 100%;
      height: vertical(600);
      // display: -webkit-flex;
      margin-top: px2rem(97);
      // @include fj(center);
      // flex-direction: column;
      // flex-wrap: wrap;
      li {
        width: 100%;
        height: px2rem(100);
        text-align: center;
        @include sc(px2rem(36));
        letter-spacing: .2em;
        @include fj(center);
        align-items: center;
        cursor: pointer;
        color: #727272;
        background-color: #fff;
        transition: all .5s;
        &:hover {
          background-color: #dfc29d;
        }
        &:active {
          background-color: #c1a077;
        }
        color: #666666;
      }
      .router-link-active {
        background-color: #c7ad8c;
        color: #fefdfd;
      }
    }
    .leftEat {
      width: px2rem(150);
      height: px2rem(150);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: px2rem(30);
      margin: auto;
      >img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
.linkUs {
  position: fixed;
  width: 4rem;
  height: 10rem;
  font-size: 1.4rem;
  text-align: center;
  line-height: 4rem;
  background-color: #fff;
  border: 1px solid #000;
  writing-mode: vertical-lr;
  writing-mode: tb-lr;
  cursor: pointer;
  z-index: 100;
  right: 0;
  top: 45%;
}
.linkInfo {
  position: fixed;
  z-index: 100;
  width: px2rem(260);
  left: transverse(320);
  top: vertical(20);
  font-size: px2rem(20);
  .companyInfo, .userInfo {
    @include fj();
    flex-direction: column;
    align-items: center;
    border: 1px solid #000;
    background-color: #fff;
  }
  .userInfo {
    li {
      width: 80%;
      margin-top: px2rem(10);
      input, #area, #price {
        width: 77%;
        border: 1px solid #000;
        box-shadow: 0 0 px2rem(10) #eee inset;
      }
    }
    .upUserInfo {
      width: 45%;
      height: px2rem(40);
      border: 1px solid #000;
      border-radius: px2rem(10);
      background-color: #fff;
      margin: px2rem(15) 0;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
