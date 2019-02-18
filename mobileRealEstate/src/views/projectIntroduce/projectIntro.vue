<template>
  <div class="projectIntro" :style="{ 'background-image': 'url(' + backgroundImage + ')'}">
    <div class="wordIntro">
      <div class="wordIntroContent">
        <p>
          {{ words }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import getImage from '../../utils/getImage.js'
export default {
  name: 'projectIntro',
  data() {
    return {
      backgroundImage: require('@/assets/img/background.png'),
      words: '',
      backgroundSize: ''
    }
  },
  created() {
    this.$axios.get('/project/info/get')
      .then(res=>{

        if (res.data.data) {

          res.data.data.backgroundImageLocation ? this.backgroundImage = getImage(res.data.data.backgroundImageLocation, 1) : ''
          this.words = res.data.data.content;
        }
    })
    this.$nextTick(()=>{
      document.title = '项目介绍'
    })
  },
  methods: {
    clickBack: function() {
      this.$router.push({path: '/index'});
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/mixin';
@import '../../styles/main';
.projectIntro {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @include fj();
  flex-direction: column-reverse;
  align-items: center;
  position: relative;
  .wordIntro {
    width: 100%;
    height: 40%;
    color: #000000;
    background-color: #d1d1d1;
    opacity: .7;
    bottom: 0;
    position: absolute;
    z-index: 99;
    .wordIntroContent {
      width: 100%;
      height: 100%;
      @include fj(center);
      align-items: center;
      p {
        width: 85%;
        height: 90%;
        color: #000000;
        @include fontSize(28);
        @include lineHeight(48);
        letter-spacing: .1em;
        text-indent: 2em;
        overflow-y: auto;
      }
    }
  }
  .allBack {
    width: 4rem;
    height: 4rem;
    position: fixed;
    top: 2rem;
    right: 2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

