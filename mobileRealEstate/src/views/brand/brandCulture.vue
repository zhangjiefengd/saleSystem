<template>
  <div class="brandCulture">
    <div class="brandCulturePhoto">
      <img :src="brandCultureImage" alt="">
    </div>
    <div class="brandCultureWords">
      <ul class="brandCultureScroll">
        <li v-for="(title, index) in brandCultureTitle" :key="index">
          <p class="brandCultureTitle" :style="[{color: titleColor}]"> {{ title.title }} </p>
          <p class="brandCultureContent" :style="[{color: contentColor}]">  {{ title.content }} </p>
        </li>
      </ul>
      <div class="honorWordRemind" v-if="wordRemind">
        <img src="@/assets/img/brand/honorWordRemind.png" alt="">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../styles/main';
@import '../../styles/mixin';
.styleNull {
  margin: 0 !important;
}
.brandCulture {
  width: 100%;
  height: 100%;
  .brandCulturePhoto {
    width: 100%;
    height: 30%;
    margin-top: 30%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .brandCultureWords {
    width: 100%;
    height: 40%;
    position: relative;
    ul {
      width: 90%;
      height: 80%;
      margin-top: px2rem(10);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      overflow-y: scroll;
      li {
        width: 70%;
        height: px2rem(100);
        margin: 0 15%;
        @include fj(space-between);
        align-items: center;
        flex-direction: column;
        .brandCultureTitle {
          color: #666666;
          @include fontSize(30);
          @include lineHeight(63);
        }
        .brandCultureContent {
          height: calc(100% - 2rem);
          color: #999999;
          @include fontSize(24);
          text-align: center;
        }
      }
    }
    .honorWordRemind {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: px2rem(50);
      @include fj(center);
      align-items: center;
      img {
        width: px2rem(30);
        height: px2rem(20);
      }
    }
  }
}
</style>
<script>
import getImage from '../../utils/getImage.js'
export default {
  name: 'brandCulture',
  data() {
    return {
      brandCultureImage: '',
      brandCultureTitle: '',
      brandCultureContent: '',
      brandCultureNum: Number,
      wordRemind: true,
      head: 'http://139.9.80.230:8080/',
      backgroundImage: require('@/assets/img/background.png'),
      titleColor: '',
      contentColor: ''
    }
  },
  created() {
    this.$axios.get('/brand/enterpriseCulture/get')
      .then(res => {

        if (res.data.data) {

          this.brandCultureTitle = res.data.data
          this.titleColor = res.data.data.titleStyle ? res.data.data.titleStyle : '#666666'
          this.contentColor = res.data.data.fontStyle ? res.data.data.fontStyle : '#999999'
          this.brandCultureNum = res.data.data.length
          // if (this.brandCultureNum > 3) {
          //   this.wordRemind = true
          // }
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.get('/brand/enterpriseCulture/image/get')
      .then(res => {

        if (res.data.data) {

          this.brandCultureImage = getImage(res.data.data.mainImageLocation, 3)
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.post('/common/mobileCommonBackgroundImage/get')
      .then(res => {
        if (res.data.data) {
          res.data.data ? this.backgroundImage = getImage(res.data.data, 1) : ''
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$nextTick(()=>{
      document.title = '企业文化'
    })
  },
  methods: {
    getImage (data, i) {
      const imgSplit = data.split(/\_|\./g)
      return this.head + imgSplit[0] + '_' + imgSplit[i] + '.' + imgSplit[imgSplit.length - 1]
    }
  },
  mounted () {
    var brandCultureScroll = document.getElementsByClassName('brandCultureScroll')[0];
    setTimeout(()=>{
      if (brandCultureScroll.offsetHeight < brandCultureScroll.scrollHeight) {
        this.wordRemind = true;
      } else {
        this.wordRemind = false;
      }
    },100);
    brandCultureScroll.addEventListener('scroll', ()=>{
      var allheight = parseInt(brandCultureScroll.scrollHeight);
      var judeHeight = Math.ceil(brandCultureScroll.scrollTop) + Math.ceil(brandCultureScroll.offsetHeight);
      if (allheight <= judeHeight+1) {
        this.wordRemind = false;
      }else if (allheight > judeHeight) {
        this.wordRemind = true;
      }
    })
  }
}
</script>
