<template>
	<div id="honor" class="honor">
    <img :src="background" alt="" class="back">
    <div class="content">
      <div>
        <div class="contentTop">
          <img :src="culturePicture" alt="" class="culture">
        </div>
        <div class="contentBottom">
          <div>
            <div class="line"></div>
              <ul>
                <li v-for="(title, index) in titles">
                  <span class="spot"></span>
                </li>
              </ul>
              <div class="Intro">
                <div class="worldIntro" v-for="(title, index) in titles">
                  <h3 v-if="title.content !== null">{{ title.title }}</h3>
                  <p v-if="title.content !== null">{{ title.content }}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <contact @haveCon='haveCon'></contact>
        <contact-content @closeInfo='closeInfo' :style='{display: conDisplay}'></contact-content>
  </div>
</template>
<script>
import getImage from '../../../ultis/getImage.js';
// import { resetTime, Timeout } from "../../../ultis/timeOut.js";
import ip from '../../../../static/ip'
import contact from '../../../components/haveContact'
import contactContent from '../../../components/contactContent'
export default {
  name: 'honor',
  data () {
    return {
      background: '',
      titles: '',
      contents: '',
      culturePicture: '',
      backBig: '',
      culBig: '',
      head: ip + ':80/',
      conDisplay: 'none'
    }
  },
  created () {
    this.$axios.get('/brand/enterpriseCulture/get')
      .then(res => {
        if (res.data.data) {
          this.titles = res.data.data
          this.contents = res.data.data.content
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.get('/brand/enterpriseCulture/image/get')
      .then(res => {
        if (res.data.data) {
          this.culturePicture = getImage(res.data.data.mainImageLocation, 1)
          this.background = getImage(res.data.data.backgroundImageLocation, 1)
          if (screen.width > 1024) {
            this.backBig = getImage(res.data.data.backgroundImageLocation, 1)
            this.culBig = getImage(res.data.data.mainImageLocation, 1)
          } else {
            this.backBig = getImage(res.data.data.backgroundImageLocation, 2)
            this.culBig = getImage(res.data.data.mainImageLocation, 2)
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
      getImage(data, i) {
        const imgSplit = data.split(/\_|\./g)
        let index = i;
        while (imgSplit.length - 1 <= index) {
            index--;
        }
          return this.head  + imgSplit[0] + "_" + imgSplit[index] + "." + imgSplit[imgSplit.length - 1];
      },
      haveCon() {
            this.conDisplay = 'flex';
            this.$forceUpdate();
        },
        closeInfo() {
            this.conDisplay = 'none';
            this.$forceUpdate();
        },
  },
  components: {
    contact,
        contactContent
  },
  watch: {
    backBig () {
      var ele = document.querySelector('.honor');
      var imgUrl = this.backBig
      var imgObject = new Image()

      imgObject.src = imgUrl
      imgObject.onload = function () {
        this.background = imgUrl
        // console.log(this.imgProjectBack);
        document.getElementsByClassName('back')[0].src = this.background;
        // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'honor complete');

      }
    },
    culBig () {
      var ele = document.querySelector('.culture');
      var imgUrl = this.culturePicture;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function () {
        this.culturePicture = imgUrl;
        // console.log(this.imgProjectBack);
        ele.src = this.culturePicture;
        // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'culture complete');
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
    position: absolute;
    top: vertical(125);
    width: 100%;
    height: vertical(955);
    @include fj(center);
    div {
      width: 81%;
      height: 100%;
      .contentTop {
        width: 100%;
        height: 58%;
        @include fj();
        align-items: flex-end;
        >img {
          width: 100%;
          height: 78%;
        }
        .culture {
          // filter: blur(4px);
          transition: all 2s;
        }
        .complete {
            // filter: blur(0);
        }
      }
      .contentBottom {
        width: 100%;
        height: 32%;
        position: relative;
        @include fj(center);
        align-items: flex-end;
        >div {
          width: 100%;
          height: 50%;
          .line {
            width: 100%;
            height: 0;
            position: absolute;
            top: px2rem(88);
            border: 1px solid #ffdaaa;
          }
          ul {
            width:100%;
            position: absolute;
            top: px2rem(77);
            @include fj(space-around);
            li {
              width: px2rem(22);
              height: px2rem(22);
              border-radius: 50%;
              background-color: #ffdaaa;
              float: left;
            }
          }
          .Intro {
            width: 100%;
            height: 80%;
            @include fj(space-between);
            align-items: flex-end;
            .worldIntro {
              h3 {
                @include fj(center);
                color: #ffdaaa;
              }
              p {
                margin-top: 2%;
                text-align: center;
                @include fj(center);
                color: #ffffff;
              }
            }
          }
        }
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
