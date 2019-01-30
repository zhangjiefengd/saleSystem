<template>
  <div id="nearType">
      <div class="leftContent">
        <left-nav></left-nav>
      </div>
      <div class="rightContent" :style="{backgroundImage: 'url(' + back +')'}">
        <router-view  ref="park"/>
      </div>
  </div>
</template>
<script>
import leftNav from './leftNavBar';

export default {
  name: 'houseType',
  data() {
    return {
      nearNum: 0,
      back: require('../../../assets/img/goHouseHistory/houseBack.jpg')
    }
  },
  created() {
        this.$axios.get("/surround/surroundingTypeStyle/get")
        .then((res) => {
            if (res.data.code == 1 && res.data.data) {
               
                res.data.data.surroundingBackgroundImageLocation ? this.back = res.data.data.surroundingBackgroundImageLocation : '';
            }
        })
        .catch(error => {
            console.log(error);
        });
  },
  methods: {
    
  },
  components: {
    leftNav
  }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
@import '../../../styles/common.scss';

#nearType{
  width: 100%;
  height: 100%;
  display: flex;
  .leftContent {
    width: transverse(300);
    height: 100%;
  }
  .rightContent {
    width: transverse(1920 - 300);
    height: 100%;
  }
}
</style>
