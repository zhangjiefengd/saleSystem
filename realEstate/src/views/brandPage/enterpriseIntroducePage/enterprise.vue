<template>
  <div id="enterprise" class="honor">
    <div class="enterpriseImage">
      <transition-group tag="ul" :name="change">
        <li v-for="(image, index) in images" :key="image.image" v-show="index == imageNum">
          <img :src="image.image" alt="">
        </li>
      </transition-group>
    </div>

    <transition-group tag="ul" class="spot">
      <li v-for="(image, index) in images"  :style="[{backgroundColor: (index==imageNum) ? pointSelectedStyle : pointUnselectedStyle}]" :key="image"  @click="changeImage(index)" :class="[{changeStyle: index==imageNum}]"></li>
    </transition-group>
    <div class="introduce">
      <div class="worldIntro">
        <p v-if="worlds.enterpriseIntroduction" :style="[{color: contentColor}]">{{ worlds.enterpriseIntroduction }} </p>
        <p v-else></p>
        <div @click="bigVideo">
          <img :src="videoIcon" alt="">
        </div>
      </div>
    </div>
    <div class="touchevent" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">
    </div>
    <router-view></router-view>
    <contact @haveCon='haveCon'></contact>
        <contact-content @closeInfo='closeInfo' :style='{display: conDisplay}'></contact-content>
  </div>
</template>
<script>
import getImage from '../../../ultis/getImage.js';
import ip from '../../../../static/ip'
import contact from '../../../components/haveContact'
import contactContent from '../../../components/contactContent'
export default {
  name: 'enterprise',
  data () {
    return {
      images: '',
      worlds: '',
      titleColor: '#c7ad8b',
      contentColor: '#333333',
      worldBgc: '',
      videoMp4: '',
      videoIcon: require('@/assets/img/leftNav/video.png'),
      imageNum: 0,
      timer: '',
      startX: 0,
      endX: 0,
      x: 0,
      change: '',
      head: ip + ':8080/static/image/',
      conDisplay: 'none',
      pointSelectedStyle: '#ffffff',
      pointUnselectedStyle: '#ffffff'
    }
  },
  created () {
    this.$axios.get('/brand/enterpriseIntroduction/get')
      .then(res => {
        if (res.data.data) {
          this.worlds = res.data.data
          this.titleColor = res.data.data.enterpriseFontBackgroundStyle ? res.data.data.enterpriseFontBackgroundStyle : '#c7ad8b'
          this.contentColor = res.data.data.enterpriseFontStyle ? res.data.data.enterpriseFontStyle : '#333333'
          this.videoIcon = res.data.data.playIcoLocation ? res.data.data.playIcoLocation : require('@/assets/img/leftNav/video.png')
          this.pointSelectedStyle = res.data.data.pointSelectedStyle ? res.data.data.pointSelectedStyle : '#ffffff'
          this.pointUnselectedStyle = res.data.data.pointUnselectedStyle ? res.data.data.pointUnselectedStyle : '#ffffff'
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.post('/brand/enterpriseIntroduction/image/get')
      .then(res => {
        if (res.data.data) {
          this.images = res.data.data
          this.images.map((item, index) => {
            if (item.imageLocation) {
              this.images[index].image = getImage(item.imageLocation, 1)
            }
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$nextTick(() => {
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 5000)
    })
  },
  methods: {
    clickBack: function () {
      this.$router.push({path: '/index'})
    },
    autoPlay () {
      this.imageNum++
      this.change = 'photoSlideLeft'
      if (this.imageNum > this.images.length - 1) {
        this.imageNum = 0
      }
    },
    changeImage (index) {
      clearInterval(this.timer)
      if (this.imageNum < index) {
        this.change = 'photoSlideRight'
      } else {
        this.change = 'photoSlideLeft'
      }
      this.imageNum = index
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 4000)
    },
    bigVideo () {
      this.$router.push({path: '/mp4'})
    },
    left () {
      clearInterval(this.timer)
      this.imageNum--;
      this.change = 'photoSlideRight'
      if (this.imageNum < 0) {
        this.imageNum = this.images.length - 1
      }
    },
    touchstart (ev) {
      this.startX = parseInt(ev.touches[0].clientX)
    },
    touchmove (ev) {
      this.endX = parseInt(ev.touches[0].clientX)
    },
    touchend (ev) {
      this.x = this.endX - this.startX
      if (this.x > 0) {
        clearInterval(this.timer)
        this.left()
        this.timer = setInterval(() => {
          this.autoPlay()
        }, 5000)
      } else if (this.x < 0) {
        clearInterval(this.timer)
        this.autoPlay()
        this.timer = setInterval(() => {
          this.autoPlay()
        }, 5000)
      }
    },
    getImage (data, i) {
      const imgSplit = data.split(/\_|\./g)
      let index = i
      while (imgSplit.length - 1 <= index) {
        index--
      }
      return this.head + imgSplit[0] + '_' + imgSplit[index] + '.' + imgSplit[imgSplit.length - 1]
    },
    haveCon() {
      this.conDisplay = 'flex'
      this.$forceUpdate()
    },
    closeInfo() {
      this.conDisplay = 'none'
      this.$forceUpdate()
    },
  },
  components: {
    contact,
    contactContent
  },
  watch: {
    images () {
      let that = this
      let ele = document.getElementsByTagName('img')
      let imgUrl = []
      let imgObject = []
      let num = 0
      for (let i = 0; i < this.images.length; i++) {
        if (screen.width > 1024) {
          imgUrl[i] = this.images[i].image.fileName
          // alert(334);
        } else {
          imgUrl[i] = this.images[i].image.middle
        }
        imgObject[i] = new Image()
        imgObject[i].src = imgUrl[i]
      }

      for (let i = 0; i < this.images.length; i++) {
        imgObject[i].onload = function () {
          num++
          ele[i + 2].src = imgUrl[i]
          // document.getElementsByClassName('honor')[0].setAttribute('class', 'honor complete');
          // if (i == 0) {
          // that.$emit('eventB');
          // that.clickUrl = imgUrl[0];
          // that.$emit('event', this.clickUrl);
          // }
        }
      }
      let time = setInterval(() => {
        if (this.images.length == num && document.getElementById('enterprise')) {
          document.getElementById('enterprise').setAttribute('class', 'honor complete');
        }
      }, 100);
      // console.log(document.getElementById('enterprise')[0]);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.touchevent {
  width: 75%;
  height: 100%;
  position: absolute;
  z-index: 90;
}
#enterprise {
  width: transverse(1660);
  height: 100%;
  float: left;
  overflow: hidden;
  position: relative;
  .enterpriseImage {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    ul {
      width: 100%;
      height: 100%;
      li {
        position: absolute;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .spot {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: px2rem(70);
    z-index: 99;
    padding-top: px2rem(3);
    @include fj(center);
    li {
      width: px2rem(15);
      height: px2rem(15);
      border-radius: 50%;
      margin-left: px2rem(10);
      background-color: #ffffff;
    }
    .changeStyle {
      width: px2rem(34);
      height: px2rem(15);
      border-radius: 7px;
      background-color: #ffffff;
    }
  }
  .introduce {
    width: transverse(1080);
    height: 100%;
    float: right;
    position: absolute;
    right: 0;
    z-index: 88;
    >img {
      width: 100%;
      height: 100%;
      float: left;
      opacity: 0.7;
    }
    .worldIntro {
      position: absolute;
      right: px2rem(200);
      top: vertical(200);
      width: px2rem(623);
      height: 68%;
      background-color: #ffffff;
      background-color: rgba(250, 250, 250, 0.85);
      >div {
        float: right;
        width: px2rem(80);
        height: px2rem(60);
        margin-right: px2rem(50);
        @include fj(space-between);
        align-items: center;
        cursor: pointer;
        >img {
          width: 100%;
          height: 100%;
          margin-right: px2rem(30);
        }
      }
      >p {
        width: 85%;
        height: 80%;
        line-height: px2rem(40);
        text-indent: 2em;
        font-size: px2rem(28);
        letter-spacing: 1px;
        margin: px2rem(50) px2rem(50) 0 px2rem(50);
        color: #333333;
        font-family: 'FZHei';
        overflow: hidden scroll;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          width: 0;
        }
      }
    }
  }
}
.honor {
  // filter: blur(10px);
  transition: all 0.7s;
}
.complete {
    // filter: blur(0);
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
