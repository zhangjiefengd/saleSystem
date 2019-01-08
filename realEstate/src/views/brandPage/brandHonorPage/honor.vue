<template>
	<div id="honor" class="honor">
    <img :src="background" alt="" class="back">
    <div class="content">
      <ul class="worlds">
        <li v-for="(world, index) in worlds" >
          <img src="@/assets/img/brandBGC/worldLogo.png" alt="">
          <span>{{ world.enterpriseHonorInfo }}</span>
        </li>
      </ul>
      <div class="picture">
        <div class="left" @click="leftChange">
          <img src="@/assets/img/brandBGC/left.png" alt="">
        </div>
        <img class="hide" v-if="photo.image" :src="photo.image" v-for="(photo, index) in honorPhoto"  alt="" :class="[{show: index==imageNum}]">
        <div class="right" @click="rightRight">
          <img src="@/assets/img/brandBGC/right.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { resetTime, Timeout } from "../../../ultis/timeOut.js";
import ip from '../../../../static/ip'
export default {
  name: 'honor',
  data () {
    return {
      background: '',
      honorPhoto: '',
      worldLogo: '',
      back: '',
      left: '',
      right: '',
      worlds: '',
      imageNum: 0,
      backBig: '',
      head: ip + ':80/'
    }

  },
  created () {
    this.$axios.get('/brand/enterpriseHonor/get')
      .then(res => {
        if (res.data.data) {
          this.worlds = res.data.data
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.get('/brand/enterpriseHonor/backHonorImage/get')
      .then(res => {
        if (res.data.data) {
          this.background = this.getImage(res.data.data.imageLocation, 1)
          if (screen.width > 1024) {
            this.backBig = this.getImage(res.data.data.imageLocation, 1)
          } else {
            this.backBig = this.getImage(res.data.data.imageLocation, 2)
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.get('/brand/enterpriseHonor/honorImage/get')
      .then(res => {
        if (res.data.data) {
          this.honorPhoto = res.data.data
          this.honorPhoto.map((item, index) => {
            if (item.imageLocation) {
              this.honorPhoto[index].image = this.getImage(item.imageLocation, 1)
            }
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    clickBack: function() {
      this.$router.push({path: '/index'})
    },
    leftChange () {
      this.imageNum--
      if (this.imageNum < 0) {
        this.imageNum = this.honorPhoto.length - 1
      }
    },
    rightRight () {
      this.imageNum++
      if (this.imageNum > this.honorPhoto.length - 1) {
        this.imageNum = 0
      }
    },
      getImage(data, i) {
        const imgSplit = data.split(/\_|\./g)
        let index = i;
        while (imgSplit.length - 1 <= index) {
            index--;
        }
          return this.head + imgSplit[0] + "_" + imgSplit[index] + "." + imgSplit[imgSplit.length - 1];
      },
  },
  watch: {
    backBig () {
      var ele = document.querySelector('.honor')
      var imgUrl = this.backBig
      var imgObject = new Image()

      imgObject.src = imgUrl
      imgObject.onload = function () {
        var time = setInterval(() => {
          this.background = imgUrl
          document.getElementsByClassName('back')[0].src = this.background
          ele.setAttribute('class', 'honor complete')
        }, 100)
      }
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
#honor {
  width: transverse(1620);
  height: 100%;
  float: left;
  position: relative;
  >img {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .content {
    width: 100%;
    height: vertical(955);
    position: absolute;
    top: vertical(125);
    @include fj(center);
    align-items: center;
    .worlds {
      width: transverse(900);
      height: vertical(560);
      float: left;
      @include fj(space-between);
      flex-direction: column;
      li {
        font-size: px2rem(25);
        line-height: 33px;
        @include fj(flex-start);
        align-items: center;
        >span {
          text-indent: 1em;
          color: #ffffff;
        }
        >img {
          width: px2rem(32);
          height: px2rem(22);
        }
      }
    }
    .picture {
      width: transverse(460);
      height: vertical(560);
      float: left;
      position: relative;
      margin-left: vertical(120);
      @include fj(center);
      align-items: center;
      overflow: hidden;
      .left,.right {
        width: transverse(120);
        height: vertical(200);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(101, 101, 101, 0.26);
        @include fj(center);
        align-items: center;
        >img {
          width: px2rem(12);
          height: px2rem(32);
        }
      }
      .left {
        left: 0;
      }
      .right{
        right: 0;
      }
      >img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.honor {
  // filter: blur(4px);
  transition: all 0.7s;
}
.complete {
    // filter: blur(0);
}
</style>
