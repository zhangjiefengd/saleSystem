<template>
    <div class="bottomNav" >
        <!-- :style="{backgroundColor: bottomNavColor}" -->
        <!-- <div class="chooseType">
            <div class="chooseSmall">
                <div :class="typeClassOne"><router-link to='/nearBy/park/common'>公共设施</router-link></div>
                <div :class="typeClassTwo"><router-link to='/nearBy/park/parkView'>园林美景</router-link></div>
            </div>
        </div> -->
        <div class="choose">
            <div id="around" :class="typeClassOne" @click="changeOne">
                <router-link to='/nearBy/park/around' >周边设施</router-link>
            </div>
            <div :class="typeClassTwo" @click="changeTwo">
                <router-link to='/nearBy/park/parkView' >园林美景</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'bottomNavBar',
  data() {
      return {
        "typeClassOne": "active",
        "typeClassTwo": "noActive",
        "botSelect": '#c7ad8c'
      }
  },
  created() {
      this.$axios.get("/surround/surroundingTypeStyle/get")
        .then((res) => {
            if (res.data.code == 1) {
                res.data.data.houseTypeSwitchClickedStatusStyle ? this.botSelect = res.data.data.houseTypeSwitchClickedStatusStyle   : "";
                document.getElementsByClassName('active')[0] ? document.getElementsByClassName('active')[0].getElementsByTagName('a')[0].style.color = this.botSelect : '';
                
            }
        })
        .catch(error => {
            console.log(error);
        });
  },
  mounted() {
      if (this.$route.path == '/nearBy/park/around') {
          this.$forceUpdate();
          this.typeClassOne = 'active';
          this.typeClassTwo = 'noActive';
          setTimeout(() => {
              document.getElementsByClassName('active')[0] ? document.getElementsByClassName('active')[0].getElementsByTagName('a')[0].style.color = this.botSelect : '';
              document.getElementsByClassName('noActive')[0] ? document.getElementsByClassName('noActive')[0].getElementsByTagName('a')[0].style.color = '#666666' : '';
              
          }, 100);
      }else if (this.$route.path == '/nearBy/park/parkView') {
          this.$forceUpdate();
          this.typeClassOne = 'noActive';
          this.typeClassTwo = 'active';
          setTimeout(() => {
              document.getElementsByClassName('active')[0] ? document.getElementsByClassName('active')[0].getElementsByTagName('a')[0].style.color = this.botSelect : '';
              document.getElementsByClassName('noActive')[0] ? document.getElementsByClassName('noActive')[0].getElementsByTagName('a')[0].style.color = '#666666' : '';
              
          }, 100);
      }
  },
  methods: {
      changeOne() {
          this.$forceUpdate();
          this.typeClassOne = "active";
          this.typeClassTwo = "noActive";
          setTimeout(() => {
              document.getElementsByClassName('active')[0] ? document.getElementsByClassName('active')[0].getElementsByTagName('a')[0].style.color = this.botSelect : '';
              document.getElementsByClassName('noActive')[0] ? document.getElementsByClassName('noActive')[0].getElementsByTagName('a')[0].style.color = '#666666' : '';
              
          }, 100);
      },
      changeTwo() {
          this.$forceUpdate();
          this.typeClassTwo = "active";
          this.typeClassOne = "noActive";
          setTimeout(() => {
              document.getElementsByClassName('active')[0] ? document.getElementsByClassName('active')[0].getElementsByTagName('a')[0].style.color = this.botSelect : '';
              document.getElementsByClassName('noActive')[0] ? document.getElementsByClassName('noActive')[0].getElementsByTagName('a')[0].style.color = '#666666' : '';
              
          }, 100);
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.bottomNav {
    width: 100%;
    height: 100%;
    @include fj(center);
    align-items: center;
    // box-shadow: 0px px2rem(11) px2rem(36) px2rem(3) rgba(29, 35, 40, 0.2);
    .choose {
        width: 45%;
        height: 59.2%;
        // background-color: red;
        @include fj();
        div {
            width: 50%;
            height: 100%;
            // background-color: blue;
            @include fj(center);
            align-items: center;
            cursor: pointer;
            a {
                @include fontSize(30);
                color: #666666;
            }

        }
        .active {
            a {
                // color: #c7ad8b;
            }
        }
        .noActive {
            a {
                color: #666666;
            }
        }
        #around {
            border-right: px2rem(2) solid #c9c9c9;;
        }
    }

}     
</style>
