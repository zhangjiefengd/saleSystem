<template>
<!-- :style="{backgroundImage: 'url(' + imgBack + ')'}"  -->
  <div class="guidePage"  v-show="check" :style="{backgroundImage: 'url(' + imgBack + ')'}" @click="goIndex()">
    <div class="content">
      <img v-show='imgLogo' :src=imgLogo alt="logo" class="guideLogo">
      <!-- <div class="click">
        <img src="../../assets/img/guidePage/click.png"/>
        <span>·点击探索·</span>
      </div> -->
      <div class="guideInfor">
        <span class="bottomInfor" :style='{color: colorBussiness}'><img :src="bussiness" alt="bussiness"></span>
        <span class="bottomInfor" :style='{color: colorAddress}'><img :src="address" alt="bussiness"></span>
        <span class="bottomInfor" :style='{color: colorTel}'><img :src="tel" alt="bussiness"></span>
      </div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
import intial from '../../assets/img/index/loading.jpg';
import getImage from '../../ultis/getImage.js';
export default {
  data() {
    return {
      imgBack: require('../../assets/img/guidePage/back.jpg'),
      imgLogo: '',
      word: [],
      root: null,
      check: 0,
      imgBig: "",
      imgLogoBig: "",
      colorBussiness: '#666666',
      colorAddress: '#666666',
      colorTel: '#666666',
      bussiness: require('../../assets/img/guidePage/bussiness.png'),
      address: require('../../assets/img/guidePage/address.png'),
      tel: require('../../assets/img/guidePage/tel.png')
    }
  },
  created() {
    //获取引导页数据
    this.$axios.get("/basic/guidePage/get")
    .then((res) => {
      if (res.data.code == 1 && res.data.data) {
        if (screen.width > 1024){
          res.data.data.backgroundImageLocation ? this.imgBig = getImage(res.data.data.backgroundImageLocation, 1) : '';
          res.data.data.projectLogoLocation ? this.imgLogoBig = getImage(res.data.data.projectLogoLocation, 1) : '';
        }else {
          res.data.data.backgroundImageLocation ? this.imgBig = getImage(res.data.data.backgroundImageLocation, 2) : '';
          res.data.data.projectLogoLocation ? this.imgLogoBig = getImage(res.data.data.projectLogoLocation, 2) : '';
        }
        res.data.data.backgroundImageLocation ? this.imgBack = getImage(res.data.data.backgroundImageLocation, 5) : '';
        // this.imgBig = res.data.data.backgroundImage.fileName;
        // this.imgBack = intial;
        res.data.data.projectLogoLocation ? this.imgLogo = getImage(res.data.data.projectLogoLocation, 5) : '';
        // this.imgLogoBig = res.data.data.logo.fileName;
        res.data.data.projectHost ? this.word[0] = res.data.data.projectHost : '';
        res.data.data.projectLocation ? this.word[1] = res.data.data.projectLocation : '';
        res.data.data.projectHotline ? this.word[2] = res.data.data.projectHotline : '';
        res.data.data.projectLocationFontStyle ? this.colorBussiness = res.data.data.projectLocationFontStyle : '';
        res.data.data.projectHostFontStyle ? this.colorAddress = res.data.data.projectHostFontStyle : '';
        res.data.data.projectHotlineFontStyle ? this.colorTel = res.data.data.projectHotlineFontStyle : '';
        res.data.data.projectLocationIconLocation ? this.bussiness = getImage(res.data.data.projectLocationIconLocation, 2) : '';
        res.data.data.projectHostIconLocation ? this.address = getImage(res.data.data.projectHostIconLocation, 2) : '';
        res.data.data.projectHotlineIconLocation ? this.tel = getImage(res.data.data.projectHotlineIconLocation, 2) : '';
       
      }
      this.check = 1;
    })
    .catch(error => {
      console.log(error);
    })
  },
  mounted() {
    this.root = this.$parent.$el;
  },
  methods: {
    // 添加引导页下方信息
    addWords() {
      // 获取底层文字span的标签
      let bottomInfor = document.getElementsByClassName('bottomInfor');
      //将文字添加到各个的span中去
      for (let i = 0; i < 3; i++) {
        let inforContent = bottomInfor[i].innerHTML;//首先获取底层的icon图片内容
        inforContent += "&nbsp;&nbsp;" + this.word[i];
        bottomInfor[i].innerHTML = inforContent;
      }
    },
    // 进入主页
    goIndex() {
      this.$router.push('/index');
    }
  },
  components: {

  },
  watch: {
    imgLogoBig() {
      this.addWords();
      var ele = document.querySelector('.guideLogo');
      var imgUrl = this.imgLogoBig;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function () {
        this.imgLogo = imgUrl;
        // console.log(this.imgProjectBack);
        ele.src = this.imgLogo;
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'guideLogo complete');

      }
    },
    imgBig() {
      var ele = document.querySelector('.guidePage');
      var imgUrl = this.imgBig;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function () {
        this.imgBack = imgUrl;
        // console.log(this.imgProjectBack);
        ele.style.backgroundImage = 'url(' + this.imgBack + ')';
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'guidePage complete');
        }
      }
  }
}
</script>

<style lang="scss">
@import "../../styles/main";
@import "../../styles/common";
@import "../../styles/mixin";

.guidePage {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  cursor: pointer;
  // filter: blur(4px);
  transition: all 0.7s;
  .content {
    width: px2rem(1562);
    height: vertical(730);
    margin: px2rem(254) auto;
    margin-bottom: px2rem(68);
    @include fj();
    flex-direction: column;
    align-items: center;
    .guideLogo {
      width: px2rem(403);
      height: px2rem(286);
      // filter: blur(4px);
      transition: all 0.7s;
    }
    .complete {
      filter: blur(0);
    }
    .click {
      width: px2rem(161);
      height: px2rem(140);
      @include fj();
      flex-direction: column;
      align-items: center;
      img {
        width: px2rem(73);
      }
      span {
        @include sc(px2rem(30), #b1b1b1);
      }
    }
    .guideInfor {
      width: 100%;
      height: px2rem(40);
      @include fj();
      align-items: center;
      .bottomInfor {
        @include sc(px2rem(30));
        img {
          width: px2rem(25);
        }
      }
    }
  }

}
.complete {
  filter: blur(0);
}
</style>
