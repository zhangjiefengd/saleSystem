<template>
  <div class="video4" >
    <!-- <iframe height=100% width=100% src='http://player.youku.com/embed/XMzU3MTI4NTYwNA==' frameborder=0 allowfullscreen>
    </iframe> -->
    <video ref="videoPlayer" class="video-js">
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
// import { videoPlayer } from 'vue-video-player';
require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
export default {
  name: 'mp4',
  data () {
    return {
      back: '',
      src1: '',
      player: null,
      options: {
        autoplay: false,
        controls: true,
        sources: [{
          src: '//path/to/video.mp4',
          type: 'video/mp4'
        }],
        controlBar: {
          playToggle: true,
          fullscreenToggle: true
        }
      }
    }
  },
  created() {
    this.$axios.get("/brand/enterpriseIntroduction/get")
      .then(res => {
        console.log(this.options.sources[0].src = res.data.data.videoUrl)
        // this.playerOptions.sources[0].src = res.data.data.videoUrl
        this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
          console.log('onPlayerReady', this, this.options);
        })
      })
      .catch(error => {
        console.log(error);
      })
  },
  mounted() {
    
  },
  methods: {
    clickBack: function() {
			this.$router.push({path: '/brand/brandIntro'});
    },
    onPlayerPlay(player) {
      
    },
    onPlayerPause(player){
      
    }
  },
  beforeDestroy() {
      if (this.player) {
          this.player.dispose()
      }
  },
  computed: {
    // player() {
    //   return this.$refs.videoPlayer.player
    // }
  },
  components: {
    // videoPlayer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../styles/main.scss';
@import '../../styles/mixin.scss';
.video4 {
  width: 100%;
  height: calc(90% - 55px);
  margin-top: 55px;
  @include fj(center);
  align-items: flex-end;
  .video-js {
    width: 100%;
    height: 100%;
    @include fj(center);
    align-items: center;
    >.vjs-big-play-button {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
