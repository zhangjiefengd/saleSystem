<template>
  <div class="indexPage"  v-show="check" :style="{backgroundImage: 'url(' + imgIndexBack + ')'}" >
    <img v-show='imgProject' :src="imgProject" alt="projectImg" class="projectImg">
    <div class="module">
      <div class="smallNav" v-for="(m, a) in word" @click="skip(url[a])">
        <img :src="icon[a]" alt="" class="navLogo">
        <span>{{m}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import intial from '../../assets/img/index/loading.jpg';
import getImage from '../../ultis/getImage.js'
export default {
  data() {
    return {
      imgIndexBack: require('../../assets/img/index/back.jpg'),
      imgBig: "",
      imgProBig: "",
      imgProject: '',
      moduleIndex: [],
      word: ["项目介绍", "品牌概况", "户型展示", "楼盘周边"],
      url: ["/projectIntroduce", "/brand", "/houseType", "/nearBy" ],
      check: 0,
      hoverColor: 'rgba(205,182,151,0.25)',
      icon: [require('../../assets/img/index/介绍.png'), require('../../assets/img/index/品牌概况.png'), require('../../assets/img/index/户型.png'), require('../../assets/img/index/楼盘周边.png')]
    }
  },
  created() {
    //请求首页项目图片和背景图片
    this.$axios.get("/basic/mainPage/get")
    .then(res => {
      if (res.data.code == 1 && res.data.data) {
        if (screen.width > 1024){
          res.data.data.backgroundImageLocation ? this.imgBig = getImage(res.data.data.backgroundImageLocation, 1) : '';
          res.data.data.projectLogoLocation ? this.imgProBig = getImage(res.data.data.projectLogoLocation, 1) : '';
        }else {
          res.data.data.backgroundImageLocation ? this.imgBig = getImage(res.data.data.backgroundImageLocation, 2) : '';
          res.data.data.projectLogoLocation ? this.imgProBig = getImage(res.data.data.projectLogoLocation, 2) : '';
        }
        res.data.data.backgroundImageLocation ? this.imgIndexBack = getImage(res.data.data.backgroundImageLocation, 5) : '';
        // this.imgBig = res.data.data.backgroundImage.fileName;
        res.data.data.projectLogoLocation ? this.imgProject = getImage(res.data.data.projectLogoLocation, 5) : '';
        res.data.data.projectIntroductionBar ? this.icon[0] = getImage(res.data.data.projectIntroductionBar, 1) : '';
        res.data.data.brandOverviewBar ? this.icon[1] = getImage(res.data.data.brandOverviewBar, 1) : '';
        res.data.data.unitDisplayBar ? this.icon[2] = getImage(res.data.data.unitDisplayBar, 1) : '';
        res.data.data.projectAroundBar ? this.icon[3] = getImage(res.data.data.projectAroundBar, 1) : '';
        // this.imgProBig = res.data.data.projectImage.fileName;
        res.data.data && res.data.data.projectIntroductionBar ? this.icon[0] = getImage(res.data.data.projectIntroductionBar, 1) : "";
        res.data.data && res.data.data.brandOverviewBar ? this.icon[1] = getImage(res.data.data.brandOverviewBar, 1) : "";
        res.data.data && res.data.data.unitDisplayBar ? this.icon[2] = getImage(res.data.data.unitDisplayBar, 1) : "";
        res.data.data && res.data.data.projectAroundBar ? this.icon[3] = getImage(res.data.data.projectAroundBar, 1) : "";
        
        res.data.data.brandOverviewSuspensionStatusStyle ? this.hoverColor = res.data.data.brandOverviewSuspensionStatusStyle : '';
        const that = this;
        for (let i = 0; i < document.getElementsByClassName('smallNav').length; i++) {
          $('.smallNav').eq(i).hover(() => {
            $('.smallNav').eq(i).css('backgroundColor', that.hoverColor);
          }, () => {
            $('.smallNav').eq(i).css('backgroundColor', 'transparent');
          });
        }

        
        this.check = 1;
      }
      // this.judgeModule();
    })
    .catch(error => {
      console.log(error);
    })

    //请求激活的模块
    // http://192.168.43.127:8080/module/main
    // this.$axios.get("/module/main", {params:{'select':'true'}})
    // .then(res => {
    //   this.moduleIndex = res.data.data;
    //   // console.log(res.data);
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  },
  mounted() {
    // this.judgeModule();
  },
  methods: {
    //进行跳转页面
    skip(position) {
      this.$router.push(position);
    },
    //用来判断总有几个模块并把它加到module里面去
    judgeModule() {
      let moduleContent = "";//为module里面的内容
      let a = 0;
      for (let moduleOne of this.word) {
        moduleContent += '<div class="smallNav"><img src="' + this.icon[a] + '" class="navLogo"><span>' + moduleOne + '</span></div>';
        a++;
      }
      document.getElementsByClassName('module')[0].innerHTML = moduleContent;
      this.hoverChange();
    },
    //导航移上去变logo
    hoverChange() {
      let navLogo = document.getElementsByClassName('navLogo');
      let smallNav = document.getElementsByClassName('smallNav');
      for (let i = 0; i < smallNav.length; i++) {
        smallNav[i].onclick = () => {
          // navLogo[i].src = this.moduleIndex[i].logo2;
          this.skip( this.url[i]);
          // console.log(navLogo[i].src);
        }
      }
    }
  },
  components: {

  },
  watch: {
    //检测到数组有变化后就立即执行函数
    // moduleIndex() {
    //   this.judgeModule();
    //   this.hoverChange();
    // },
    imgBig() {
      var ele = document.querySelector('.indexPage');
      var imgUrl = this.imgBig;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function () {
        this.imgIndexBack = imgUrl;
          // console.log(this.imgProjectBack);
        ele.style.backgroundImage = 'url(' + this.imgIndexBack + ')';
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'indexPage complete');
      }
    },
    imgProBig() {
      // this.addWords();
      var ele = document.querySelector('.projectImg');
      var imgUrl = this.imgProBig;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function () {
        this.imgProject = imgUrl;
        // console.log(this.imgProjectBack);
        ele.src = this.imgProject;
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'projectImg complete');
        
      }
    },
  }
}
</script>

<style lang="scss">
@import "../../styles/main";
@import "../../styles/common";
@import "../../styles/mixin";

.indexPage {
  background-repeat: no-repeat;
  background-size: 100% 60.9%;
  background-color: white;
  width: 100%;
  height: 100%;
  // filter: blur(4px);
  transition: all 0.7s;
  .projectImg {
    width: px2rem(569);
    @include cl();
    top: vertical(175);
    // filter: blur(4px);
    transition: all 0.7s;
  }
  .complete {
    filter: blur(0);
  }
  .module {
    width: transverse(1236);
    height: vertical(261);
    @include cl();
    top: vertical(729);
    @include fj();
    .smallNav {
      cursor: pointer;
      @include fj();
      align-items: center;
      flex-direction: column;
      width: px2rem(258);
      height: px2rem(261);
      padding: px2rem(41) px2rem(65) px2rem(41) px2rem(65);
      img {
        width: px2rem(114);
        height: px2rem(114);
      }
      span {
        @include sc(px2rem(30));
      }
    }
    .smallNav:hover {
      // background-color: rgba(205,182,151,0.25);
    }
  }
}
.complete {
  filter: blur(0);
}
</style>
