<template>
  <div class="home-option" @click="clearChoose" :style="[{height: optionHeight}, {background: optionBackground}]">
    <div class="component-box" v-show="isShowHead">
      <ul class="all-head" :style="[{color: headColor}, {marginTop: marginTop}, {height: topHeight}]">
        <li @click="backHome"> <span>首页</span></li>
        <li @click="showCollect" v-show="!isCollect"><span>我有意向></span></li>
      </ul>
      <div v-show="isCollect" class="collectInfo">

        <div class="company-info">
          <div class="company-wechat">微信公众号</div>
          <div class="wechatQr">
            <img :src="wechatQr" alt="">
          </div>
          <div><span>客服电话：</span> {{phoneNum}}</div>
        </div>

        <div class="user-info">
          <ul>
            <li class="user-phone" style="position: relative">
              <span><span style="color: #e01">*</span><span> 电话：</span></span>
              <div><input v-model="showPhoneNum" id="customPhone" placeholder="请输入您的手机号" @input="watchPhone"></div>
              <span class="phoneRemindInfo"> {{ phoneRemindInfo }}</span>
            </li>
            <li class="produce-price">
              <span> 价格：</span>
              <div>
                <div class="price con"  @click.stop='priceDis'>
                  {{selectPrice}}
                  <span :style='{display: placeholder}'>请选择理想价位</span>
                  <img src='../assets/img/brand/down.png'/>
                </div>
              </div>
              <ul class="priceSelect" :style='{display: priceDisplay}'>
                <li @click="getPrice">1万元以下/平</li>
                <li @click="getPrice">1.0-1.5万元/平</li>
                <li @click="getPrice">1.5-2.0万元/平</li>
                <li @click="getPrice">2.0-2.5万元/平</li>
                <li @click="getPrice">2.5-3.0万元/平</li>
                <li @click="getPrice">3.0-3.5万元/平</li>
                <li @click="getPrice">3.5-4.0万元/平</li>
                <li @click="getPrice">4.0-4.5万元/平</li>
                <li @click="getPrice">4.5-5.0万元/平</li>
                <li @click="getPrice">5万元以上/平</li>
              </ul>
            </li>
            <li class="house-type">
              <span>户型：</span>
              <ul>
                <li class="house-num">
                  <input id="house1" type="checkbox">
                  <label for="house1">一居室</label>
                </li>
                <li class="house-num">
                  <input id="house2" type="checkbox">
                  <label for="house2">二居室</label>
                </li>
                <li class="house-num">
                  <input id="house3" type="checkbox">
                  <label for="house3">三居室</label>
                </li>
                <li class="house-num">
                  <input id="house4" type="checkbox">
                  <label for="house4">四居室</label>
                </li>
                <li class="house-num">
                  <input id="house5" type="checkbox">
                  <label for="house5">五居室</label>
                </li>
                <li class="house-num">
                  <input id="house6" type="checkbox">
                  <label for="house6">五居室以上</label>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="user-info-submit"><input @click="submitCustomInfo" type="submit" value="提交"></div>
      </div>
    </div>
    <div class="infoRemind" v-show="infoRemind">
      <ul>
        <li>
          <img v-if="isSuccess" src="../assets/img/brand/success.png" alt="">
          <img v-else @click="closeRemind" src="../assets/img/brand/fail.png" alt="">
        </li>
        <li>
          {{ returnInfo }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import getImage from '../utils/getImage.js'
  export default {
    name: "topOption",
    data () {
      return {
        isCollect: false,
        isSuccess: false,
        returnInfo: '提交成功',
        infoRemind: false,
        selectPrice: '',
        placeholder: 'block',
        priceDisplay: 'none',
        optionHeight: 'auto',
        marginTop: '10px',
        topHeight: '25px',
        optionBackground: 'transparent',
        wechatQr: '',
        projectName: '',
        phoneNum: '',
        houseType: '',
        isShowHead: true,
        headColor: '#000000',
        backHeadColor: '',
        phoneRemindInfo: '',
        showPhoneNum: ''
      }
    },
    created () {
      this.$axios.post('/manage/concurrentProject/get').then((res) => {
        this.id = res.data.data;
        this.$axios.get('/manage/project/get').then((respond) => {
          respond.data.data.forEach(data => {

            if (data.id == res.data.data) {

              this.phoneNum = data.customerPhone
              this.wechatQr = getImage(data.qrCode, 1)
              this.projectName = data.projectName
            }
          });
        }).catch(err => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    methods: {
      backHome: function () {
        this.isCollect = false
        this.optionBackground = 'transparent'
        this.optionHeight = 'auto'
        this.marginTop = '10px'
        this.topHeight = '25px'
        this.$router.push({
          path: '/'
        })
      },
      clearChoose: function () {
        this.priceDisplay = 'none'
      },
      showCollect: function () {
        this.isCollect = !this.isCollect

        if (this.optionHeight === 'auto') {
          this.optionHeight = '100%'
          this.marginTop = '0'
          this.topHeight = '5%'
          this.optionBackground = 'url(' + require('../assets/img/index/noIndexBack.png') + ')'
          this.headColor = '#000000'
        } else {
          this.optionHeight = 'auto'
          this.marginTop = '10px'
          this.topHeight = '25px'
          this.optionBackground = 'transparent'
          this.headColor = this.backHeadColor
        }
        if (this.isCollect) {
          var docEl = document.getElementsByTagName('html')[0]
          var styleNum = docEl.style.fontSize.replace('px', '')
          if (Number(styleNum) < 10) {
            docEl.style.fontSize = '10px'
          }
        }
      },
      priceDis() {
        if (this.priceDisplay == 'block') {
          this.priceDisplay = 'none';
        } else {
          this.priceDisplay = 'block';
        }
      },
      getPrice(e) {
        this.selectPrice = e.target.innerHTML;
        this.priceDisplay = 'none';
        this.placeholder = 'none';
        this.$forceUpdate();
      },
      submitCustomInfo() {
        this.houseType = '';
        const houseTypeDom = document.getElementsByClassName('house-num');
        const phone = document.getElementById('customPhone').value
        const phoneReg = /0\d{2,3}-\d{7,8}/
        const smallPhoneReg = /^1[3456789]\d{9}$/

        for (let i in houseTypeDom) {

          if(houseTypeDom[i].children && houseTypeDom[i].children[0].checked) {

            this.houseType += houseTypeDom[i].children[1].innerText + '&'
          }
        }

        if (phoneReg.test(phone) || smallPhoneReg.test(phone)) {
          let formdata = new FormData();
          formdata.append('item_code', this.id);
          formdata.append('item_name', this.projectName);
          formdata.append('customer_phone', phone);
          formdata.append('customer_price', this.selectPrice);
          formdata.append('house_type', this.houseType);
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*'
            }
          }
          this.$axios.post('https://iot.xhmind.com/api/sales_management/customer_information', formdata, config)
            .then((res) => {
              if (res.data.status === 200) {
                this.infoRemind = true
                this.returnInfo = '您的意向我已收到，将会尽快联系您。'
                document.getElementById('customPhone').value = ''
                this.selectPrice = ''
                this.placeholder = 'block'
                this.showPhoneNum = ''
                this.isSuccess = true
                for (let i in houseTypeDom) {

                  if(houseTypeDom[i].children && houseTypeDom[i].children[0].checked) {

                    houseTypeDom[i].children[0].checked = false
                  }
                }
                this.showCollect()
                this.$forceUpdate()
                setTimeout(() => {
                  this.infoRemind = false
                  this.isSuccess = false
                }, 3000);
              } else {
                this.infoRemind = true
                this.returnInfo = '提交失败'
                this.$forceUpdate();
                setTimeout(() => {
                  this.infoRemind = false
                }, 3000);
              }
            }).catch((err) => {
            });
          } else {
          this.infoRemind = true
          if (phone === '') {
            this.returnInfo = '手机号不能为空'
          } else {
            this.returnInfo = '请输入正确的联系方式'
          }
          this.$forceUpdate();
          setTimeout(() => {
            this.infoRemind = false
          }, 3000);
        }

      },
      closeRemind: function () {
        this.infoRemind = false
      },
      watchPhone: function () {
        this.showPhoneNum = this.showPhoneNum.replace(/[^\d]/g, '')
      }
    },
    watch: {
      $route(to, from) {
        if (this.$route.path === '/index') {
          this.isShowHead = false
        } else {
          this.isShowHead = true
        }
        if (this.$route.path.match('/brandIntro') !== null) {
          this.backHeadColor = this.headColor = '#ffffff'
        } else if (this.$route.path.match('/projectIntroduce') !== null) {
          this.backHeadColor = this.headColor = '#ffffff'
        } else {
          this.backHeadColor = this.headColor = '#000000'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/main';
  @import '../styles/mixin';
.home-option {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  @include fj(center);
  color: #fff;
  background: transparent;
  z-index: 999;
  .component-box {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .all-head {
    width: 100%;
    height: 5%;
    @include fj();
    align-items: flex-end;
    @include fontSize(34);
    li {
      height: 100%;
      @include fj();
      align-items: flex-end;
      >span {
        display: block;
        @include fj(center);
        align-items: center;
      }
    }
  }
  .collectInfo {
    width: 100%;
    height: 100%;
    @include fj(space-around);
    align-items: center;
    flex-direction: column;
  }
  .company-info {
    width: 100%;
    height: px2rem(320);
    @include fj(center);
    align-items: center;
    flex-direction: column;
    .company-wechat {
      @include fontSize(28);
      color: #000000;
    }
    .wechatQr {
      width: px2rem(240);
      height: px2rem(240);
      margin: px2rem(10) 0;
      >img {
        width: 100%;
        height: 100%;
      }
    }
    >div {
      @include fontSize(28);
      color: #666666;
    }
  }
  .user-info {
    width: 100%;
    border-top: px2rem(1) solid #e7e7e7;
    position: relative;
    >ul {
      width: 100%;
      height: 100%;
      @include fj(flex-start);
      align-items: flex-start;
      flex-direction: column;
      >li {
        width: 100%;
        @include fj(center);
        align-items: center;
        margin-top: px2rem(20);
        >span {
          width: 30%;
          text-align: right;
          @include fontSize(32);
          display: inline-block;
          color: #000000;
        }
        .phoneRemindInfo {
          width: 14%;
          color: #e01;
          position: absolute;
          right: 0; top: 0;
          @include fontSize(10);
          text-align: center;
        }
        >div, >ul {
          width: 70%;
        }
      }
      .user-phone {
        height: px2rem(50);
        >div {
          width: 70%;
          height: 100%;
          >input {
            width: 90%;
            height: 100%;
            outline: none;
            padding: 0 1rem;
            background-color: #f0f0f0;
            @include fontSize(25);
            letter-spacing: px2rem(1);
          }
        }
      }
      .produce-price {
        width: 100%;
        height: px2rem(50);
        >div {
          width: 70%;
          height: 100%;
          .price {
            height: 100%;
            @include fj();
            align-items: center;
            padding-top: 0;
            padding-bottom: 0;
            img {
              width: px2rem(30);
              height: px2rem(16);
            }
            span {
              display: block;
              @include fontSize(25);
              color: #666666;
              letter-spacing: .2em;
            }
          }
          .con {
            background-color: #f0f0f0;
            width: 90%;
            height: 100%;
            @include fontSize(25);
            color: #333333;
            letter-spacing: px2rem(1);
            padding: px2rem(20);
          }
        }

        .con::-webkit-input-placeholder {
          @include sc(px2rem(29));
          color: #c1c1c1;
        }

        .con::-moz-placeholder {
          @include sc(px2rem(29));
          color: #c1c1c1;
        }

        .con:-ms-input-placeholder {
          @include sc(px2rem(29));
          color: #c1c1c1;
        }

        .priceSelect {
          width: 63%;
          height: px2rem(228);
          position: absolute;
          left: 30%;
          top: px2rem(140);
          background-color: #ffffff;
          box-shadow: 0px px2rem(5) px2rem(18) 0px rgba(0, 0, 0, 0.1);
          border-radius: 0 0 px2rem(6) px2rem(6);
          overflow: auto;
          z-index: 9999;
          @include fontSize(25);
          li {
            width: 100%;
            height: px2rem(32);
            margin-top: px2rem(6);
            @include fj(center);
            align-items: center;
            @include fontSize(25);
            color: #666666;
            letter-spacing: px2rem(1);
          }

          li:hover {
            background-color: rgba(199, 173, 140, 0.4);
          }
        }
      }
      .house-type {
        align-items: flex-start;
        >ul {
          @include fontSize(22);
          margin-top: px2rem(-5);
          >li {
            @include fontSize(28);
            letter-spacing: 1px;
            margin-top: px2rem(5);
            @include fj(flex-start);
            align-items: center;
            color: #666666;
            >input {
              -webkit-appearance: none;
              -moz-appearance: none;
              background-color:transparent;
              border-color:transparent;
              width: px2rem(20);
              height: px2rem(20);
              background-color: #fff;
              border: solid px2rem(1) #b7b7b7;
              cursor: pointer;
              margin-right: px2rem(4);
              &[type=checkbox]:checked{
                background-image: url("../assets/img/brand/select.png");
                -webkit-background-size: 100%;
                background-size: 100%;
              }
              &[type=checkbox]:checked + label {
                color: #c7ad8c;
              }
            }
          }
        }
      }
    }
  }
  .user-info-submit {
    width: 100%;
    height: px2rem(60);
    >input {
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 100%;
      height: 100%;
      @include fontSize(40);
      color: #ffffff;
      background-color: #c1a077;
    }
  }
  .infoRemind {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: px2rem(200);
    background-color: #ffffff;
    @include fj(space-around);
    align-items: center;
    flex-direction: column;
    >ul {
      width: 80%;
      height: 80%;
      >li {
        width: 100%;
        height: 50%;
        color: #666666;
        @include fontSize(34);
        font-weight: 600;
        @include fj(center);
        align-items: center;
        >img {
          width: px2rem(60);
          height: px2rem(60);
        }
      }
    }
  }
}
</style>
