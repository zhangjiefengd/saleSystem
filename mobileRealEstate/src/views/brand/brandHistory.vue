<template>
  <div class="brandHistory">
    <div class="brandHistoryBox" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">
      <transition-group :name="change">
        <div class="brandHistoryPhoto" v-for="(image, index1) in brandHistory" :key="index1*10" v-show="index1==brandHistoryNum">
          <img v-if="image.image !== null" :src="image.image" alt="">
        </div>
      </transition-group>
        <div class="brandHistorywords" v-for="(image, index) in brandHistory" :key="image.id" v-show="index==brandHistoryNum">
          <div class="brandShadow"></div>
          <div class="brandHistoryBody">
            <div class="brandHistoryHead" :style="[{color: image.stepColor}]">
              {{ image.step }}
            </div>
            <div>
              <p class="brandHistoryTitle" :style="[{color: image.titleColor}]">
                {{ image.developTitle }}
              </p>
              <p class="brandHistoryContent" :style="[{color: image.contentColor}]">
                {{ image.enterpriseDevelopInfo }}
              </p>
            </div>
          </div>
        </div>
            <div class="brandHistoryNum">
              <ul>
                <li v-for="(a, index) in brandHistory" :style="[{backgroundColor: (index==brandHistoryNum) ? pointSelectedStyle : pointUnselectedStyle}]" :key="index" :class="[{changeStyle: index==brandHistoryNum}]" @click="changeBrandHistory(index)">
                </li>
              </ul>
            </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../styles/main';
@import '../../styles/mixin';
.brandHistory {
  height: 100%;
  @include fj(center);
  flex-direction: column;
  .brandHistoryBox {
    width: 100%;
    height: 50%;
    position: relative;
    .brandHistoryPhoto {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .brandHistorywords {
      width: 100%;
      height: 45%;
      position: absolute;
      bottom: 0;
      left: 0;
      .brandShadow {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 0;
        background-color: #3e3e3e;
        opacity: 0.8;
      }
      .brandHistoryBody {
        width: 90%;
        height: 85%;
        @include fj(center);
        align-items: flex-start;
        flex-direction: column;
        position: absolute;
        left: 5%;
        top: 0;
        z-index: 99;
        .brandHistoryHead {
          width: auto;
          height: px2rem(50);
          color: #ffffff;
          padding: 0.5rem;
          background-color: #c7ad8b;
          @include fontSize(28);
          @include fj(center);
          align-items: center;
          text-align: center;
        }
        div {
          width: 100%;
          .brandHistoryTitle {
            color: #c79f62;
            @include fontSize(26);
            margin-top: .5rem;
          }
          .brandHistoryContent {
            color: #fffffe;
            margin-top: px2rem(15);
            @include fontSize(24);
          }
        }
      }

    }
    .brandHistoryNum {
      width: 100%;
      @include fj(center);
      align-items: center;
      position: absolute;
      bottom: 10px;
      left: 0;
      ul {
        width: 80%;
        height: px2rem(20);
        @include fj(center);
        align-items: center;
        li {
          width: px2rem(14);
          height: px2rem(14);
          @include fontSize(30);
          @include lineHeight(48);
          margin-left: px2rem(5);
          border-radius: 50%;
          text-align: center;
          background-color: #d0d0d0;
        }
        .changeStyle {
          width: px2rem(30);
          height: px2rem(14);
          border-radius: 5px;
          background-color: #ffdaaa;
        }
      }
    }
  }
}
.photoSlideRight-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
.photoSlideRight-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%);
}
.photoSlideRight-enter {
  transform: translateX(100%);
}
.photoSlideRight-leave {
  transform: translateX(0);
}
.photoSlideLeft-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
.photoSlideLeft-leave-active {
  transition: all 1s ease;
  transform: translateX(100%);
}
.photoSlideLeft-enter {
  transform: translateX(-100%);
}
.photoSlideLeft-leave {
  transform: translateX(200%);
}
</style>
<script>
import getImage from '../../utils/getImage.js'
export default {
  name: 'brandHistory',
  data() {
    return {
      brandHistory: '',
      brandHistoryNum: 0,
      change: '',
      startX: 0,
      endX: 0,
      x: 0,
      head: 'http://139.9.80.230:8080/',
      backgroundImage: require('@/assets/img/background.png'),
      pointSelectedStyle: '#d0d0d0',
      pointUnselectedStyle: '#d0d0d0',
      timer: ''
    }
  },
  created() {
    this.$axios.get('/brand/enterpriseDevelop/get')
      .then(res => {

        if (res.data.data) {

          this.brandHistory = res.data.data
          this.pointSelectedStyle = res.data.data.pointSelectedStyle ? res.data.data.pointSelectedStyle : '#d0d0d0'
          this.pointUnselectedStyle = res.data.data.pointUnselectedStyle ? res.data.data.pointUnselectedStyle : '#d0d0d0'
          this.brandHistory.map((item, index) => {
            if (item.enterpriseDevelopImageLocation) {
              this.brandHistory[index].image = getImage(item.enterpriseDevelopImageLocation, 3)
            }
            item.stepColor = item.enterpriseDevelopStepStyle ? item.enterpriseDevelopStepStyle : '#ffffff'
            item.titleColor = item.enterpriseDevelopTitleStyle ? item.enterpriseDevelopTitleStyle : '#c7ad8b'
            item.contentColor = item.enterpriseDevelopFontStyle ? item.enterpriseDevelopFontStyle : '#e1e1e1'
          })
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
      document.title = '发展历程'
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 5000)
    })
  },
  methods: {
    changeBrandHistory(index) {
      if (this.brandHistoryNum < index) {
        this.change = 'photoSlideRight';
      }else if (this.brandHistoryNum > index) {
        this.change = 'photoSlideLeft';
      }
      this.brandHistoryNum = index;
    },
    autoPlay () {
      this.brandHistoryNum++
      this.change = 'photoSlideRight'
      if (this.brandHistoryNum > this.brandHistory.length - 1) {
        this.brandHistoryNum = 0
      }
    },
		touchstart(ev) {
      clearInterval(this.timer);
			this.startX = parseInt(ev.touches[0].clientX);
		},
		touchmove(ev) {
			this.endX = parseInt(ev.touches[0].clientX);
    },
		touchend(ev) {
			this.x = this.endX - this.startX;
			if (this.x>0) {
				this.brandHistoryNum--;
        this.change = 'photoSlideLeft';
        if (this.brandHistoryNum < 0) {
          this.brandHistoryNum = this.brandHistory.length-1;
        }
			}else if(this.x<0) {
				this.brandHistoryNum++;
        this.change = 'photoSlideRight';
        if (this.brandHistoryNum > this.brandHistory.length-1) {
          this.brandHistoryNum = 0;
        }
			}
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 5000)
		},
    getImage (data, i) {
      const imgSplit = data.split(/\_|\./g)
      return this.head + imgSplit[0] + '_' + imgSplit[i] + '.' + imgSplit[imgSplit.length - 1]
    }
  }
}
</script>
