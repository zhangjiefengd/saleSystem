<template>
  <div class="brandHonor">
    <div>
      <div class="brandHonorPhoto">
        <div class="brandHonorPhotoLeft" v-if="brandHonorPhoto.length > 1" @click="brandHonorLeftChange">
          <img src="@/assets/img/brand/left.png" alt="">
        </div>
        <transition-group tag="ul" :name="change">
          <li v-for="(photo, index) in brandHonorPhoto" :key='index*5' v-show="index == imageNum">
            <img :src="photo.image" alt="">
          </li>
        </transition-group>
        <div class="brandHonorPhotoRight" v-if="brandHonorPhoto.length > 1" @click="brandHonorRightChange">
          <img src="@/assets/img/brand/right.png" alt="">
        </div>
      </div>
      <div class="brandHonorIntro">
        <ul class="brandHonorwords brandHonorScroll">
          <li v-for="(word, index) in brandHonorWords" :key='index'>
            <span class="word-spot" :style="[{backgroundColor: word.pointColor}]"></span>
            <span :style="[{color: word.textColor}]">{{ word.enterpriseHonorInfo }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="honorWordRemind" >
      <img v-show="wordRemind" src="@/assets/img/brand/honorWordRemind.png" alt="">
    </div>
  </div>
</template>
<style lang="scss">
@import '../../styles/main';
@import '../../styles/mixin';
.brandHonor {
  width: 100%;
  height: 90%;
  @include fj(space-around);
  align-items: center;
  flex-direction: column;
  overflow: auto;
  >div {
    width: 85%;
    height: 95%;
  }
  .brandHonorPhoto {
    width: 100%;
    height: 60%;
    margin-top: 45px;
    position: relative;
    @include fj(center);
    align-items: center;
    >div {
      width: px2rem(36);
      height: 100%;
      position: absolute;
      z-index: 99;
      @include fj(center);
      align-items: center;
      >img {
        width: px2rem(16);
        height: px2rem(36);
        opacity: 1;
      }
    }
    .brandHonorPhotoLeft {
      left: px2rem(0);
    }
    .brandHonorPhotoRight {
      right: px2rem(0);
    }
    ul {
      width: 80%;
      height: 100%;
      position: relative;
      li {
        width: 100%;
        height: 100%;
        position: absolute;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .brandHonorIntro {
    height: 40%;
    overflow-y: auto;
    position: relative;
    .brandHonorwords {
      width: 80%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      li {
        margin-top: px2rem(25);
        @include fj(flex-start);
        align-items: center;
        .word-spot {
          width: px2rem(16);
          height: px2rem(16);
          border-radius: 50%;
          background-color: #c7ad8b;
          margin: 0 px2rem(5);
        }
        span {
          width: calc(100% - 1rem);
          @include fontSize(30);
          color: #fff;
          @include lineHeight(50);
        }
      }
    }
  }
  .honorWordRemind {
    width: 100%;
    height: 5%;
    @include fj(center);
    align-items: center;
    img {
      width: px2rem(30);
      height: px2rem(20);
    }
  }
}
.photoSlideLeft-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
.photoSlideLeft-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%);
}
.photoSlideLeft-enter {
  transform: translateX(100%);
}
.photoSlideLeft-leave {
  transform: translateX(0);
}
.photoSlideRight-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
.photoSlideRight-leave-active {
  transition: all 1s ease;
  transform: translateX(100%);
}
.photoSlideRight-enter {
  transform: translateX(-100%);
}
.photoSlideRight-leave {
  transform: translateX(200%);
}
</style>
<script>
import getImage from '../../utils/getImage.js'
export default {
  name: 'brandHonor',
  data() {
    return {
      brandHonorPhoto: '',
      brandHonorWords: '',
      imageNum: 0,
      change: '',
      wordRemind: true,
      head: 'http://139.9.80.230:8080/',
      backgroundImage: require('@/assets/img/background.png')
    }
  },
  created() {
    this.$axios.get('/brand/enterpriseHonor/get')
      .then(res => {

        if (res.data.data) {

          this.brandHonorWords = res.data.data;
          this.brandHonorWords.map(item => {
            item.textColor = item.enterpriseHonorFontStyle ? item.enterpriseHonorFontStyle : '#333333'
            item.pointColor = item.enterpriseHonorPointStyle ? item.enterpriseHonorPointStyle : '#c7ad8b'
          })

          if (this.brandHonorWords.length > 4) {

            this.wordRemind = true
          }
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
    this.$axios.get('/brand/enterpriseHonor/honorImage/get')
      .then(res => {

        if (res.data.data) {

          this.brandHonorPhoto = res.data.data
          this.brandHonorPhoto.map((item, index) => {
            if (item.imageLocation) {
              this.brandHonorPhoto[index].image = getImage(item.imageLocation, 1)
            }
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$nextTick(()=>{
      if (document.body.clientHeight > 750) {
        // $('.brandHonorwords').css('height','32rem')
      }
      document.title = '品牌荣誉'
    })
  },
  mounted () {
    setTimeout(()=>{
      if (brandWorldScroll.offsetHeight == brandWorldScroll.scrollHeight) {
        this.wordRemind = false;
      }else {
        this.wordRemind = true;
      }
    },100);
    var brandWorldScroll = document.getElementsByClassName('brandHonorIntro')[0];
    brandWorldScroll.addEventListener('scroll', ()=>{
      var allheight = parseInt(brandWorldScroll.scrollHeight);
      var judeHeight = Math.ceil(brandWorldScroll.scrollTop) + Math.ceil(brandWorldScroll.offsetHeight);
      if (allheight == judeHeight || allheight+1 == judeHeight) {
        this.wordRemind = false;
      }else if (allheight > judeHeight) {
        this.wordRemind = true;
      }
    })
  },
  methods: {
    brandHonorLeftChange() {
      this.imageNum--;
      this.change = 'photoSlideRight';
      if (this.imageNum < 0) {
        this.imageNum = this.brandHonorPhoto.length-1;
      }
    },
    brandHonorRightChange() {
      this.imageNum++;
      this.change = 'photoSlideLeft';
      if (this.imageNum > this.brandHonorPhoto.length-1) {
        this.imageNum = 0;
      }
    },
    getImage (data, i) {
      const imgSplit = data.split(/\_|\./g)
      return this.head + imgSplit[0] + '_' + imgSplit[i] + '.' + imgSplit[imgSplit.length - 1]
    }
  }
}
</script>
