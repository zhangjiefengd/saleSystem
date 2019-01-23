<template>
    <div class="bottomNav" >
        <!-- :style="{backgroundColor: bottomNavColor}" -->
        <div class="chooseType">
            <div class="chooseSmall">
                <div :class="typeClassOne"><router-link to='/nearBy/park/common'>公共设施</router-link></div>
                <div :class="typeClassTwo"><router-link to='/nearBy/park/parkView'>园林美景</router-link></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'bottomNavBar',
  data() {
      return {
        "typeClassOne": this.typeClassChange,
        "typeClassTwo": this.typeClassChangeTwo,
        "botSelect": '#c7ad8c',
        noneFont: '#666666',
        clickFont: 'white'
      }
  },
  created() {
      this.$axios.get("/surround/surroundingTypeStyle/get")
        .then((res) => {
            if (res.data.code == 1) {
                const active = document.getElementsByClassName('active')[0];
                const activeTwo = document.getElementsByClassName('activeTwo')[0];
                res.data.data.surroundingSwitchClickedStatusStyle  ? this.botSelect = res.data.data.surroundingSwitchClickedStatusStyle    : "";
                res.data.data.surroundingSwitchFontNoneStatusStyle   ? this.noneFont = res.data.data.surroundingSwitchFontNoneStatusStyle     : "";
                res.data.data.surroundingSwitchFontClickedStatusStyle   ? this.clickFont = res.data.data.surroundingSwitchFontClickedStatusStyle     : "";
                
                
                active ? active.style.backgroundColor = this.botSelect : "";
                active ? active.getElementsByTagName('a')[0].style.color = this.clickFont : '';
                activeTwo ? activeTwo.style.backgroundColor = this.botSelect : '';
                activeTwo ? activeTwo.getElementsByTagName('a')[0].style.color = this.clickFont : '';
                active ? active.style.borderColor = this.botSelect : '';
                activeTwo ? activeTwo.style.borderColor = this.botSelect : '';
            
            }
        })
        .catch(error => {
            console.log(error);
        });
  },
  mounted() {

  },
  methods: {
      
  },
  props: ['typeClassChange', "typeClassChangeTwo"]
}
</script>
<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.bottomNav {
    width: 100%;
    height: vertical(175);
    // @include fj(center);
    margin-left: transverse(95);
    // background-color: #fff;
    .chooseType {
        width: px2rem(1098);
        height: px2rem(84);
        margin-top: px2rem(56);
        // margin-left: transverse(121);
        // @include fj(center);
        // background-color: black;
        .chooseSmall {
            // width: 32.06%;
            height: 100%;
            // @include fj();
            // align-items: flex-end;
            // background-color: white;
            div {
                float: left;
                width: px2rem(180);
                height: px2rem(63);
                @include fj(center);
                align-items: center;
                cursor: pointer;
                // background-color: #c1c1c1;
	            border: solid px2rem(2) #666666;
                margin-left: px2rem(123);
                a {
                    width: 100%;
                    height: 100%;
                    @include fj(center);
                    align-items: center;
                }
            }
            div:first-of-type {
                margin-left: 0;
            }
            .noActive {
                border: solid px2rem(2) #666666;
                // background-color: #c1c1c1;
                a {
                    @include sc(px2rem(30), #666666);
                    text-decoration: none;
                }
            }
            .noActiveTwo {
                border: solid px2rem(2) #666666;
                // background-color: #c1c1c1;
                a {
                    @include sc(px2rem(30), #666666);
                    text-decoration: none;
                }
            }
            .active {
                // background-color: #c7ad8c;
                // border: px2rem(1) solid #121212;
                // border: px2rem(1) solid #c7ad8c;
                border-width: px2rem(1);
                border-style: solid;
                a {
                    @include sc(px2rem(30), white);
                    text-decoration: none;
                }    
            }
            .activeTwo {
                // background-color: #c7ad8c;
                // border: px2rem(1) solid #c7ad8c;
                // border: px2rem(1) solid #757575;
                border-width: px2rem(1);
                border-style: solid;
                a {
                    @include sc(px2rem(30), white);
                    text-decoration: none;
                } 
            }
        }
    }
}      
</style>
