<template>
  <div class="video4">
    <div class="player">
      <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                     data-setup='{"techOrder": ["html5", "flash", "other supported tech"]}'
      >
      </video-player>
    </div>
    
    <div class="backImage" >
      <img @click="clickBack" src="../../../assets/img/goHouseHistory/goHistory.png" alt="">
    </div> 
  </div>
</template>

<script>
import videojs from 'video.js'
import { videoPlayer } from 'vue-video-player';
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
export default {
  data () {
    return {
      videoMp4: '',
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src:  ""//你的m3u8地址（必填）
        }],
        // poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: false  //全屏按钮
        }
      },
      back: '',
      src1: '',
    }
  },
  components: {
    videoPlayer
  },
  created() {
    this.$axios.get("/brand/enterpriseIntroduction/get")
      .then(res => {
        this.playerOptions.sources[0].src = res.data.data.videoUrl
      })
      .catch(error => {
        console.log(error);
      })
  },
  mounted() {
  },
  methods: {
    onPlayerPlay(player) {
      console.log("play");
      
      var controlBar = document.getElementsByClassName('vjs-control-bar')[0]
      if (controlBar.getElementsByClassName('vjs-fullscreen-control').length == 0) {
        var buttom = document.createElement('button')
        var spanIcon = document.createElement('span')
        spanIcon.className = 'vjs-icon-placeholder'
        buttom.append(spanIcon)
        buttom.className = "vjs-fullscreen-control vjs-control vjs-button"
        buttom.addEventListener('click', this.fullScreenHandle)
        controlBar.append(buttom)
      }
    },
    onPlayerPause(player){
    },
    fullScreenHandle(ev){
      event.stopPropagation()
      if(!this.player.isFullscreen()){  
        this.player.requestFullscreen();  
        this.player.isFullscreen(true);  
      }else{  
        this.player.exitFullscreen();  
        this.player.isFullscreen(false);  
      }  
    },
    clickBack: function() {
			this.$router.push({path: '/brand/enterprise'});
		}
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.video4 {
  width: 100%;
  height: 100%;
}
  .container {
    background-color: #efefef;
    min-height: 100%;
    color: #fff !important;
  }
  .player {
    width: 100%;
    height: 100%;
    // position: relative;
    // left: 0;
    // top: 0;
    .video-player {
      width: 100%;
      height: 100%;
      .video-js {
        width: 100%;
        height: 100%;
      }
    }
    .fullscreen {
      position: absolute;
      width: 42px;
      height: 42px;
      right: 0;
      bottom: 0;
      z-index: 99;
    }
  }
  .backImage {
    height: vertical(125);
    position: fixed;
    top: 0;
    display: flex;
    align-items: flex-end;
    right: px2rem(60);
    z-index: 99;
    >img {
      width: px2rem(57);
      height: px2rem(50);
      cursor: pointer;
    }
  }
</style>
