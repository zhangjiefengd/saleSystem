<template>
  <div class="homePage" :style="{backgroundImage: 'url(' + homeBgc + ')'}">
    <div class="homeHead">
      <img :src="homeLogo" alt="">
    </div>
    <div class="projectList">
      <ul class="homeModule">
        <router-link tag="li" :to="module.url" :style="[{backgroundColor: module.bgColor}]" v-for="(module, index) in moduleIndex" :key="index">
          <img :src="module.icon" alt="">
         <span> {{ module.description }} </span>
        </router-link>
      </ul>
    </div>
    <!--<div class="companyLogo">-->
      <!--<img src="@/assets/img/index/companyLogo.png" alt="">-->
    <!--</div>-->
  </div>
</template>

<style lang="scss">
@import "../../styles/main";
@import "../../styles/common";
@import "../../styles/mixin";
.homePage {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  .homeHead {
    width: 100%;
    height: 58%;
    @include fj(center);
    flex-direction: column;
    align-items: center;
    img {
      height: px2rem(245);
    }
  }
  .projectList {
    width: 100%;
    height: 34%;
    @include fj(center);
    align-items: center;
    .homeModule {
      width: 90%;
      height: px2rem(256);
      @include fj(center);
      align-items: center;
      flex-wrap: wrap;
      margin-left: px2rem(-16);
      li {
        width: 40%;
        height: px2rem(102);
        background-color: #ffffff;
        box-shadow: 0px 8px 12px 0px
        rgba(29, 35, 40, 0.05);
        @include fj(center);
        align-items: center;
        margin-bottom: px2rem(16);
        margin-left: px2rem(16);
        img {
          width: px2rem(40);
          height: px2rem(40);
          margin-right: px2rem(10);
        }
        span {
          color: #000000;
          @include fontSize(28);
          @include lineHeight(30);
          letter-spacing: .1em;
        }
      }
    }
  }
  .companyLogo {
    width: 100%;
    height: 8%;
    @include fj(center);
    align-items: flex-start;
    img {
      width: px2rem(134);
      height: px2rem(24);
    }
  }
}
</style>

<script type="text/ecmascript-6">
import getImage from '../../utils/getImage.js'
export default {
  data() {
    return {
      imgIndexBack: require('../../assets/img/index/首页1.jpg'),
      imgProject: "",
      homeLogo: '',
      homeBgc: require('@/assets/img/homeBackground.png'),
      moduleIndex: [],
      icon: [require('../../assets/img/index/icon1.png'),require('../../assets/img/index/icon2.png'),require('../../assets/img/index/icon3.png'),require('../../assets/img/index/icon4.png')],
      moduleIndex: [
        {
          url: '/projectIntroduce',
          description: "项目介绍",
          icon: require('../../assets/img/index/icon1.png')
        },{
          url: '/brand',
          description: "品牌概况",
          icon: require('../../assets/img/index/icon2.png')
        },{
          url: '/houseType',
          description: "户型展示",
          icon: require('../../assets/img/index/icon3.png')
        },{
          url: '/nearBy',
          description: "楼盘周边",
          icon: require('../../assets/img/index/icon4.png')
        },
      ],
      brandBgColor: '#ffffff',
      projectBgColor: '#ffffff',
      unitBgColor: '#ffffff',
      aroundBgColor: '#ffffff',
    }
  },
  created() {
    this.$axios.get('/basic/mainPage/get')
      .then(res=>{

        if (res.data.data) {

          this.homeLogo = getImage(res.data.data.projectLogoLocation, 3)
        }
      })
    this.$axios.get('/basic/mainPage/get')
      .then(res=>{

        if (res.data.data) {

          for (let i in res.data.data) {
            this.moduleIndex.map((item, index) => {
              if (item.url === '/projectIntroduce' && i === 'projectIntroductionBar' && res.data.data[i]) {
                item.icon = getImage(res.data.data[i], 3)
                res.data.data.projectIntroductionNoneStatusStyle ? item.bgColor = this.projectBgColor : ''
              }
              if (item.url === '/brand' && i === 'brandOverviewBar' && res.data.data[i]) {
                item.icon = getImage(res.data.data[i], 3)
                res.data.data.brandOverviewNoneStatusStyle ? item.bgColor = this.brandBgColor : ''
              }
              if (item.url === '/houseType' && i === 'unitDisplayBar' && res.data.data[i]) {
                item.icon = getImage(res.data.data[i], 3)
                res.data.data.unitDisplayNoneStatusStyle ? item.bgColor = this.unitBgColor : ''
              }
              if (item.url === '/nearBy' && i === 'projectAroundBar' && res.data.data[i]) {
                item.icon = getImage(res.data.data[i], 3)
                res.data.data.projectAroundNoneStatusStyle ? item.bgColor = this.aroundBgColor : ''
              }
            })
          }

          this.homeBgc = res.data.data.mobileBackgroundImageLocation ? getImage(res.data.data.mobileBackgroundImageLocation, 2) : require('../../assets/img/homeBackground.png')
        }
      })
    //请求激活的模块
    // this.$axios.get("/module/main", {params:{'select':'true'}})
    // .then(res => {
    //   this.moduleIndex = res.data.data;
    //   for (let i = 0; i < this.moduleIndex.length; i++) {
    //     this.moduleIndex[i].icon = this.icon[i]
    //   }
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  },
  methods: {
  }
}
</script>

