<template>
  <div class="controlEnterprise">
    <div class="enterprise_center">
      <div class="controlBox">
        <div class="control">
          <div id="upload">
            <form action="introduce/image" enctype="multipart/form-data" method="post" id="imgform">
              <div id="imglist" v-if="worlds !== null">
                <div  v-loading="image.bgcLoading" element-loading-text="图片上传中" class="img" v-for="(image, index) in images" :key="index">
                  <img v-if="image.image !== null" :src="image.image" alt="">
                  <div class="deleteimg" @click="deleteImg(index)">X</div>
                </div>
                <div id="updiv">
                  <label for="upfile" class="addAll">
                    <img class="addImg" src="../../../assets/img/add1.png" alt="">
                    <p>
                      <span>添加荣誉图片</span><br>
                      <span style="font-size: 1rem">支持 JPG/PNG</span><br>
                      <span style="font-size: .5rem">不超过10M</span>
                    </p>
                  </label>
                  <input type='file' name='photos' id="upfile" style="position: absolute;clip:rect(0 0 0 0);">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="box">
        <div id="enterprise">
          <div class="enterpriseImage" v-if="worlds !== null">
            <img v-if="image.image !== null" class="hide" :src="image.image" alt=""
                 v-for="(image, index) in images" :key="index" :class="[{show: index==imageNum}]">
            <img v-if="image.image == null" class="hide" src="" alt="" v-for="(image, index) in images" :key="index"
                 :class="[{show: index==imageNum}]">
          </div>
          <ul class="spot">
            <li v-for="(image, index) in images" :style="[{backgroundColor: (index==imageNum) ? pointSelectedStyle : pointUnselectedStyle}]" @click="buttonChange(index)" :key="index" :class="[{changeStyle: index==imageNum}]"></li>
          </ul>
          <div class="introduce">
            <div class="worldFather">
              <div class="worldIntro">
                <div class="worldTitle">
                  <p :style="[{color: titleColor}]" v-if="!worlds.enterpriseName" class="title" @click="changeTitle" :class="[{hide: titleAuto}]">
                    输入企业名称</p>
                  <p :style="[{color: titleColor}]" v-if="worlds.enterpriseName" class="title" @click="changeTitle" :class="[{hide: titleAuto}]">{{
                    worlds.enterpriseName
                    }}</p>
                  <form action="introduction/title">
                    <input style="color: #000;" v-if="worlds.enterpriseName" @blur="changeTitle" class="title" placeholder="输入企业名称" type="text" autofocus :value="worlds.enterpriseName" :class="[{hide: !titleAuto}]">
                    <input style="color: #000;" v-if="!worlds.enterpriseName" @blur="changeTitle" class="title" placeholder="输入企业名称" type="text" autofocus value="" :class="[{hide: !titleAuto}]">
                  </form>
                  <div></div>
                </div>
                <div class="contentWorld">
                  <p :style="[{color: contentColor}]" v-if="!worlds.enterpriseIntroduction" class="content" @click="changeContent"
                     :class="[{hide: contentAuto}]">
                    输入企业介绍</p>
                  <p :style="[{color: contentColor}]" v-if="worlds.enterpriseIntroduction" class="content" @click="changeContent"
                     :class="[{hide: contentAuto}]">{{
                    worlds.enterpriseIntroduction }} </p>
                  <form action="introduction/text">
                    <textarea style="color: #000;" rows="15" type="text" placeholder="输入企业介绍" class="content" autofocus @blur="changeContent"
                              :value="worlds.enterpriseIntroduction" :class="[{hide: !contentAuto}]">
                    </textarea>
                    <input type="submit" id="submit2" style="display:none">
                  </form>
                </div>
              </div>
              <div class="videoIntro">
                <div>
                  <input type="text" id="video" placeholder="输入视频链接">
                  <label class="filestyle" @click="videoChange">
                    <img src="../../../assets/img/input.png" alt="">
                  </label>
                </div>
              </div>
              <!--<div class="changeColor">-->
                <!--<button v-show="changeColorButton" @click="changeColor">修改字体颜色</button>-->
              <!--</div>-->
            </div>
          </div>

          <button class="allSubmit" type="button" @click="submitForm" value="保存">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhengque"></use>
            </svg>
          </button>
          <router-view></router-view>
          <!--<color-manage></color-manage>-->
          <!--<colorPicker v-show="showChangeTitleColor" v-model="titleColor" style="z-index: 1000;" />-->
          <!--<colorPicker v-show="showChangeContentColor" v-model="contentColor" style="z-index: 1000;" />-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { iconfont } from '../../../utils/iconfont.js'
  // import colorManage from '../../../components/colorManage'
  import ip from '../../../../static/ip'
  import qs from 'qs'

  export default {
    name: 'enterprise',
    data() {
      return {
        images: [],
        changeImage: [],
        imageNum: 0,
        worldBgc: '',
        worlds: '',
        title: '',
        content: '',
        videoMp4: '',
        btnCount: 0,
        checkChange: '',
        titleAuto: false,
        contentAuto: false,
        changeImageNum: 0,
        head: ip + '/static/image/',
        timer: '',
        titleColor: '#c7ad8b',
        contentColor: '#333333',
        pointSelectedStyle: '#ffffff',
        pointUnselectedStyle: '#ffffff'
        // showChangeTitleColor: false,
        // showChangeContentColor: false,
        // changeColorButton: false,
        // controlShowColor: true
      }
    },
    created() {
      this.getData()
      this.$nextTick(() => {
        this.timer = setInterval(() => {
          this.autoPlay()
        }, 5000)
      })
    },
    mounted() {
      var b = document.getElementById('upfile')
      b.onchange = () => {
        if (b.files[0].size > 10485760) {
          this.$message({
            message: '图片不能大于10M',
            type: 'warning'
          })
        } else if (this.images.length <= 5) {
          this.changeImage.push(b.files[0])
          var oFileUrl = this.getUrl(b.files[0])
          var oimage = {
            image: oFileUrl,
            imageLocation: b.files[0],
            bgcLoading: false
          }
          this.images.push(oimage)
        } else {
          this.$message({
            message: '上传图片达到上限',
            type: 'warning'
          })
        }
      }
    },
    methods: {
      clickBack () {
        this.$router.push({ path: '/index' })
      },
      getData() {
        this.$axios.get('/brand/enterpriseIntroduction/get')
          .then(res => {
            if (res.data.data) {

              this.worlds = res.data.data
              this.title = res.data.data.enterpriseName
              this.content = res.data.data.enterpriseIntroduction
              this.videoMp4 = res.data.data.videoUrl

              this.titleColor = res.data.data.enterpriseFontBackgroundStyle ? res.data.data.enterpriseFontBackgroundStyle : '#c7ad8b'
              this.contentColor = res.data.data.enterpriseFontStyle ? res.data.data.enterpriseFontStyle : '#333333'
              this.pointSelectedStyle = res.data.data.pointSelectedStyle ? res.data.data.pointSelectedStyle : '#ffffff'
              this.pointUnselectedStyle = res.data.data.pointUnselectedStyle ? res.data.data.pointUnselectedStyle : '#ffffff'

            } else if (res.data.code == 0) {

              this.$message.error('请在项目管理添加项目！');
              this.worlds = {
                enterpriseName: '请输入企业名称',
                enterpriseIntroduction: '输入企业介绍'
              }
              this.title = JSON.parse(JSON.stringify(this.worlds))
            } else {
              this.worlds = {
                enterpriseName: '请输入企业名称',
                enterpriseIntroduction: '输入企业介绍'
              }
              this.title = JSON.parse(JSON.stringify(this.worlds))
            }
          })
          .catch(error => {
            console.log(error)
          })
        this.$axios.post('/brand/enterpriseIntroduction/image/get')
          .then(res => {
            if (res.data.data) {

              this.changeImageNum = res.data.data
              this.images = res.data.data
              this.images.map((item, index) => {
                this.images[index].image = this.getImage(item.imageLocation, 3)
              })
            }
            if (res.data.code == 0) {
              this.$message.error('请在项目管理添加项目！');
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      autoPlay() {
        this.imageNum++
        if (this.imageNum > this.images.length - 1) {
          this.imageNum = 0
        }
      },
      bigVideo() {
        this.$router.push({ path: '/mp4' })
      },
      left() {
        clearInterval(this.timer)
        this.imageNum--
        this.autoPlay()
      },
      getUrl(file) {
        var url = null
        if (window.createObjectURL !== undefined) { // basic
          url = window.createObjectURL(file)
        } else if (window.URL !== undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file)
        }
        return url
      },
      changeTitle() {

        // if (this.controlShowColor) {

          this.titleAuto = !this.titleAuto
          // this.changeColorButton = this.titleAuto
          // this.showChangeTitleColor = false
          // this.controlShowColor = !this.controlShowColor
          var title1 = document.getElementsByClassName('title')
          this.worlds.enterpriseName = title1[1].value
          if (!this.titleAuto) {
            this.timer = setInterval(() => {
              this.autoPlay()
            }, 5000)
          } else {
            clearInterval(this.timer)
          }

        // } else {
        //
        //   this.controlShowColor = true
        // }
      },
      changeContent() {

        // if (this.controlShowColor) {

          this.contentAuto = !this.contentAuto
          // this.changeColorButton = this.contentAuto
          // this.showChangeContentColor = false
          var content1 = document.getElementsByClassName('content')
          this.worlds.enterpriseIntroduction = content1[2].value
          if (!this.contentAuto) {
            this.timer = setInterval(() => {
              this.autoPlay()
            }, 2000)
          } else {
            clearInterval(this.timer)
          }
        // } else {
        //   this.controlShowColor = true
        // }
      },
      deleteImg(index) {
        if (this.images[index].id) {
          var result = confirm('确定要删除?')
          var date = {
            imageInfoId: this.images[index].id
          }
          if (result) {
            this.$axios({
              method: 'post',
              url: '/brand/enterpriseIntroduction/image/delete',
              params: date
            }).then(res => {
              if (res.status === 200) {
                this.images.splice(index, 1)
                this.$message({
                  message: '图片删除成功',
                  type: 'success'
                })
              }
            })
          }
        } else {
          this.images.splice(index, 1)
        }
      },
      videoChange() {
        var video = document.getElementById('video')
        if (video.value !== null) {
          this.videoMp4 = video.value
          this.worlds.videoUrl = video.value
          this.$axios({
            method: 'post',
            url: 'brand/enterpriseIntroduction/update',
            data: this.worlds
          })
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '视频链接上传成功',
                  type: 'success'
                })
              }
            })
        }
      },
      buttonChange(index) {
        this.imageNum = index
      },
      submitForm() {
        var submit2 = document.getElementById('submit2')
        var config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        for (let i = 0; i < submit2.length; i++) {
          submit2[i].submit()
        }
        // 上传图片
        this.images.map((item, index) => {
          if (!item.id) {
            var upImage = new FormData()
            upImage.append('imageFile', item.imageLocation)
            this.images[index].bgcLoading = true
            this.$axios.post('/brand/enterpriseIntroduction/image/add', upImage, config)
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    message: '图片上传成功',
                    type: 'success'
                  })
                  this.images[index].id = res.data.data.id
                  this.images[index].bgcLoading = false
                } else {
                  this.$message({
                    message: '图片上传失败',
                    type: 'warning'
                  })
                }
              })
              .catch(res => {
                console.log(res)
              })
          }
        })
        if (this.worlds.enterpriseName !== this.title || this.worlds.enterpriseIntroduction !== this.content) {
          this.$axios({
            method: 'post',
            url: 'brand/enterpriseIntroduction/update',
            data: this.worlds
          })
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '公司信息上传成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '公司信息上传失败，检查字数是否超过限制',
                  type: 'warning'
                })
              }
            })
        }
      },
      getImage(data, i) {
        const imgSplit = data.split(/\_|\./g)
        return this.head + imgSplit[0] + '_' + imgSplit[i] + '.' + imgSplit[imgSplit.length - 1]
      },
      changeColor() {
        if (this.titleAuto) {
          this.showChangeTitleColor = !this.showChangeTitleColor
        } else {
          this.showChangeContentColor = !this.showChangeContentColor
        }
      },
      headleChangeColor() {
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import '../../../styles/main.scss';
  @import '../../../styles/mixin.scss';

  .hide {
    display: none;
  }

  .show {
    display: block;
  }

  li {
    list-style: none;
  }

  .allSubmit {
    position: absolute;
    z-index: 99;
    right: 0;
    bottom: 0;
    color: #54b3ff;
    background-color: #d3ecfd;
  }

  #updiv {
    width: 15%;
    height: 100%;
    border: 1px dotted #9da4ae;
    background-color: #f8f9fb;
    text-align: center;
    @include fj(space-between);

    > div {
      width: 40%;
      height: 100%;

      > label, input {
        width: 50%;
        height: 100%;
        float: left;
      }
    }

    .addAll {
      width: 100%;
      height: 100%;
      @include fj(center);
      align-items: center;
      flex-direction: column;

      .addImg {
        width: px2rem(25);
        height: px2rem(25);
      }

      > p {
        margin: 0;
        padding: 0;
        font-size: 1rem;
        margin-top: .5rem;

        > span {
          color: #9da4ae;
        }
      }
    }
  }

  .controlEnterprise {
    width: 100%;
    height: px2rem(scale(1550));
    background-color: #edf0f5;
    padding-bottom: 60px;
  }

  .enterprise_center {
    width: 100%;
    height: 100%;
  }

  .video {
    width: 30%;
  }

  .controlBox {
    width: 100%;
    height: 30%;
    @include fj(center);
  }

  .control {
    width: 80%;
    height: 100%;
    border-top: 30px solid #edf0f5;
    border-bottom: 30px solid #edf0f5;
    background-color: #fff;

    #upload {
      height: 100%;
      #imgform {
        width: 100%;
        height: 100%;
        float: left;
        @include fj(center);
        align-items: center;

        > #imglist {
          width: 100%;
          height: 80%;
          float: left;
          overflow: hidden auto;

          > .img {
            width: 15%;
            border: 1px solid #ccc;
            margin-left: 2px;
            height: 100%;
            float: left;
            position: relative;

            img {
              width: 100%;
              height: 100%;
            }

            &:hover {
              > .deleteimg {
                color: #f00a0a;
              }

              border-color: rgb(255, 45, 8);
            }

            .deleteimg {
              width: 15px;
              height: 15px;
              position: absolute;
              @include fj(center);
              align-items: center;
              cursor: pointer;
              color: #3da2f6;
              right: 0;
              top: 0;
            }
          }
        }

        > #world {
          width: 40%;
          height: 80%;
          float: left;

          > .nav {
            width: 15%;
            float: left;

            > span {
              display: inline-block;
              line-height: 20px;
              height: 20%;
            }
          }
        }

        #updiv {
          float: left;
        }
      }
    }
  }

  .box {
    width: 100%;
    height: 70%;
    @include fj(center);
    align-items: center;
  }

  #enterprise {
    width: 80%;
    height: 100%;
    float: left;
    overflow: hidden;
    position: relative;

    .enterpriseImage {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      border: 1px dotted #fff;
      img {
        width: 100%;
        height: 100%;
        float: left;
      }
    }

    .spot {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: px2rem(70);
      z-index: 2;
      @include fj(center);

      li {
        width: px2rem(14);
        height: px2rem(14);
        border-radius: 50%;
        margin-left: px2rem(5);
        background-color: #bfbfbf;
      }

      .changeStyle {
        width: px2rem(30);
        height: px2rem(14);
        border-radius: 5px;
        background-color: #ffdaaa;
      }
    }

    .introduce {
      float: right;
      position: absolute;
      right: px2rem(120);
      top: vertical(50);
      z-index: 88;
      width: 50%;
      height: 80%;
      background-color: #ffffff;
      background-color: rgba(250, 250, 250, 0.85);

      > img {
        width: 100%;
        height: 100%;
        float: left;
        opacity: 0.7;
      }

      > .worldFather {
        width: 100%;
        height: 100%;
        @include fj(space-around);
        align-items: center;
        flex-direction: column;
      }

      .worldIntro {
        width: 90%;

        > .worldTitle {
          float: right;
          width: 60%;
          @include fj(space-between);
          align-items: center;
          .title {
            width: 100%;
            height: px2rem(30);
            text-align: center;
            font-size: px2rem(30);
            line-height: px2rem(26);
            color: #c7ad8b;
            border: 1px dotted #fff;
            float: left;
            margin: 0;
            -webkit-appearance: none;
            -moz-appearance: none;
          }

          > div {
            width: transverse(80);
            height: vertical(880);
            float: right;
            background-color: #ffdba1;
          }
        }

        > .contentWorld {
          width: 100%;
          height: 63%;
          line-height: px2rem(26);
          float: right;
          margin-top: vertical(20);
          color: #333333;
          .content {
            width: 100%;
            text-indent: 2em;
            border: 1px dotted #fff;
            height: px2rem(300);
            font-size: px2rem(25);
            line-height: px2rem(40);
            overflow-y: scroll;
          }

          > p {
            margin: 0;
          }
        }
      }

      .videoIntro {
        width: 90%;
        height: 10%;
        opacity: 0.7;

        > div {
          width: 55%;
          height: 100%;
          float: right;

          input {
            width: 85%;
            height: 100%;
            border: 2px solid gray;
            border-right-width: 0;
          }

          > label {
            width: 15%;
            height: 100%;
            float: right;
            border: 2px solid gray;
            border-left-width: 0;
            cursor: pointer;

            > img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .changeColor {
        width: 90%;
        >button {

        }
      }
    }
  }
</style>
