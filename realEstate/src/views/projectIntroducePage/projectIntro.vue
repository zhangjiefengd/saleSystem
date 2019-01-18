<template>
<!-- v-lazy:background-image='imgProjectBack' -->
  <div class="projectIntroduce" v-show="check" :style="{backgroundImage: 'url(' + imgProjectBack + ')'}">
      <img :src='imgLogo'/>
      <div class="projectWord">
          
          <div class="wordTitle">
              <span class="proWord">项目介绍</span>
              <hr>
              <span class="proDetail">Project Introduction</span>
          </div>
          <div class="wordContent">

          </div>
      </div>
      <div class="backImage"  @click="clickBack">
        <img src="@/assets/img/brandBGC/back.png" alt="">
      </div>

  </div>
</template>

<script type="text/ecmascript-6">
import intial from '../../assets/img/index/loading.jpg';
import getImage from '../../ultis/getImage.js'
export default {
  data() {
    return {
      back: '',
      imgProjectBack: '',
      projectWord: "",
      D3D: require('../../assets/img/index/3D.png'),
      check: 0,
      imgBig: "",
      imgLogo: ""
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
    //请求首页项目图片和背景图片
    this.$axios.get("/project/info/get")
    .then(res => {
      if (screen.width > 1024){
        this.imgBig = getImage(res.data.data.backgroundImageLocation, 1);
      }else {
        this.imgBig = getImage(res.data.data.backgroundImageLocation, 2);
      }
      // this.imgProjectBack = res.data.data.image.fileName;
      this.imgProjectBack = getImage(res.data.data.backgroundImageLocation, 4);
      // this.imgBig = res.data.data.image.fileName;
      this.projectWord = res.data.data.content;
      this.check = 1;
    })
    .catch(error => {
      console.log(error);
    })
  },
  mounted() {

  },
  methods: {
    //添加介绍的文字
    addWords() {
      // console.log(document.getElementsByClassName('wordContent')[0]);
      let wordIntrol = "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.projectWord + "</span>";//为内容区域所添加的字符串
      if (document.getElementsByClassName('wordContent')) {

        document.getElementsByClassName('wordContent')[0].innerHTML = wordIntrol;
        // $('.wordContent').html(wordIntrol);
      }
    },
    //返回
    clickBack() {
      this.$router.push({path: '/index'});;
    }
  },
  components: {
    // 'vue-lazy-component': VueLazyComponent
  },
  watch: {
      projectWord() {
          this.addWords();
      },
      imgBig() {
        var ele = document.querySelector('.projectIntroduce');
        var imgUrl = this.imgBig;
        var imgObject = new Image();

        imgObject.src = imgUrl;
        imgObject.onload = function () {
          this.imgProjectBack = imgUrl;
          // console.log(this.imgProjectBack);
          ele.style.backgroundImage = 'url(' + this.imgProjectBack + ')';
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
          ele.setAttribute('class', 'projectIntroduce complete');
        }
      }
  }
}
</script>

<style lang="scss">
@import "../../styles/main";
@import "../../styles/common";
@import "../../styles/mixin";
.projectIntroduce {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  // filter: blur(4px);
  transition: all 0.7s;
  position: relative;
  > img {
    width: px2rem(159);
    height: px2rem(109);
    position: absolute;
    top: px2rem(34);
    left: px2rem(40);
  }
  .projectWord {
      width: px2rem(629);
      height: vertical(854);
      position: absolute;
      left: transverse(1085);
      top: vertical(151);
      background-color: white;
      opacity: 0.9;
      padding: px2rem(77) px2rem(59) px2rem(77) px2rem(59);
      .wordTitle {
          width: 100%;
          height: px2rem(120);
          // display: flex;
          // justify-content: space-between;
          // flex-direction: column;
          // align-items: flex-start;
          .proWord {
              @include sc(px2rem(46), #333333);
          }
          hr {
            width: px2rem(308);
            height: px2rem(2);
            margin-left: 0;
            margin-top: px2rem(5);
            margin-bottom: 0;
            background-color: #bfbfbf;
          }
          .proDetail {
            @include sc(px2rem(36), #999999);
            display: block;
            margin-top: px2rem(5);
          }
      }
      .wordContent {
          width: 100%;
          height: px2rem(413);
          margin: px2rem(60) auto;
          span {
              @include sc(px2rem(30), #333333);
          }
      }
  }
  .backImage {
    height: vertical(117);
    position: absolute;
    display: flex;
    align-items: flex-end;
    right: px2rem(95);
    z-index: 99;
    cursor: pointer;
    >img {
      width: px2rem(63);
      height: px2rem(57);
    }
  }
  .button {
    width: 9%;
    height: vertical(150);
    position: absolute;
    right: transverse(90);
    bottom: vertical(90);
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.complete {
  filter: blur(0);
}
</style>
