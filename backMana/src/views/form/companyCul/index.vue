<template>
  <div class="honorAll">
    <div class="honorbox">
      <!-- <div class="control">
        <div id="upload">
          <form action="" enctype="multipart/form-data" method="post" id="imgform">
            <div id="updiv">

              <input type="submit" name="" id="submit" style="display: none">
            </div>
          </form>
        </div>
      </div> -->
      <div id="honor" v-loading="bgcLoading" element-loading-text="背景图片上传中">
        <button class="allSubmit" type="button" @click="submitForm" value="全部提交">
          <!--<svg class="icon" aria-hidden="true">-->
            <!--<use xlink:href="#icon-zhengque"></use>-->
          <!--</svg>-->
          全部提交
        </button>
        <label class="change changebgc" for="bFile">
          <img class="imgstyle" src="../../../assets/img/brandBGC/changeBGC.png" alt="">
        </label>
        <input type='file' id="bFile" style="position: absolute;clip:rect(0 0 0 0);" name='photos' class="upfile">

        <img :src="backgroundImage" alt="">
        <div class="content">
          <div>
            <div class="contentTop" v-loading="cultureLoading" element-loading-text="文化图片上传中">
              <label class="change changephoto" for="upfile">
                <img class="imgstyle" src="../../../assets/img/brandBGC/change.png" alt="">
              </label>
              <input type='file' name='photos' id="upfile" style="position: absolute;clip:rect(0 0 0 0);">
              <img :src="cultureImage" alt="">
            </div>
            <div class="contentBottom">
              <button class="change changeword" type="button" value="" @click="addWorld">
                <img class="imgstyle" src="../../../assets/img/brandBGC/addculture.png" alt="">
              </button>
              <div>
                <div class="line"></div>
                <ul class="dotted">
                  <li v-for="(world, index) in cultureText" v-if="index<6" :key="index">
                    <span class="spot"></span>
                  </li>
                </ul>
                <form class="Intro">
                  <div class="worldIntro" v-for="(item, index) in cultureText" v-if="index<6 || cultureText" :key="index">
                    <div class="titleFather" style="height: 50%">
                      <p v-if="item.title !== null" class="title" @click="changeTitle(index)"
                         :class="[{hide: titleAuto}]">{{ item.title }}</p>

                      <input v-if="item.title !== null" class="title" type="text" autofocus @blur="changeBack(index)"
                             :value="item.title" :class="[{hide: !titleAuto}]">
                    </div>
                    <div class="content1Father" style="height: 50%">
                      <p class="content1" v-if="item.content !== null" @click="changeContent(index)"
                         :class="[{hide: contentAuto}]">{{ item.content }}</p>

                      <input class="content1" v-if="item.content !== null" type="text" autofocus
                             @blur="changeContentBack(index)" :value="item.content"
                             :class="[{hide: !contentAuto}]">

                    </div>
                  </div>
                  <input type="submit" id="submit2" style="display: none">
                </form>
                <ul class="deleteT">
                  <li v-for="(world, index) in cultureText" v-if="index<6" :key="index">
                    <span class="delete" @click="deleteWorld(index)">X</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { iconfont } from '../../../utils/iconfont.js'
  import qs from 'qs'

  export default {
    name: 'honor',
    data() {
      return {
        titleAuto: false,
        world: [],
        worldNum: 0,
        contentAuto: false,
        backgroundImage: '',
        cultureImage: '',
        cultureText: [],
        listen: [],
        head: 'http://118.24.113.182:80/',
        bgcLoading: false,
        cultureLoading: false
      }
    },
    created() {
      this.getData()
    },
    mounted() {
      var cultureImage = document.getElementById('upfile')
      cultureImage.onchange = () => {
        if (cultureImage.files[0].size > 10485760) {
          this.$message({
            message: '图片不能大于10M',
            type: 'warning'
          })
        } else {
          var oFile = this.getUrl(cultureImage.files[0])
          this.cultureImage = oFile
        }
      }
      var backgroundImage = document.getElementById('bFile')
      backgroundImage.onchange = () => {
        if (backgroundImage.files[0].size > 10485760) {
          this.$message({
            message: '图片不能大于10M',
            type: 'warning'
          })
        } else {
          var img = this.getUrl(backgroundImage.files[0])
          this.backgroundImage = img
        }
      }
    },
    methods: {
      getData() {
        this.$axios.get('/brand/enterpriseCulture/image/get')
          .then(res => {
            if (res.data.data) {
              this.backgroundImage = this.getImage(res.data.data.backgroundImageLocation, 2)
              this.cultureImage = this.getImage(res.data.data.mainImageLocation, 2)
            }
          })
        this.$axios.get('/brand/enterpriseCulture/get')
          .then(res => {
            if (res.data.data) {
              this.cultureText = res.data.data
              this.listen = JSON.parse(JSON.stringify(res.data.data))
              this.worldNum = res.data.data.length
            }
          })
          .catch(error => {
            console.log(error)
          })
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
      changeTitle(index) {
        let title1 = document.getElementsByClassName('title')
        for (let i = 0; i < title1.length; i++) {
          if (i === index) {
            title1[2 * index].style.display = 'none'
            title1[2 * index + 1].style.display = 'flex'
          }
        }
      },
      changeBack(index) {
        let title1 = document.getElementsByClassName('title')
        for (let i = 0; i < title1.length; i++) {
          if (i === index) {
            title1[2 * index].style.display = 'flex'
            title1[2 * index + 1].style.display = 'none'
          }
        }
        this.cultureText[index].title = title1[2 * index + 1].value
      },
      changeContent(index) {
        let content1 = document.getElementsByClassName('content1')
        for (let i = 0; i < content1.length; i++) {
          if (i === index) {
            content1[2 * index].style.display = 'none'
            content1[2 * index + 1].style.display = 'flex'
          }
        }
      },
      changeContentBack(index) {
        let content1 = document.getElementsByClassName('content1')
        for (let i = 0; i < content1.length; i++) {
          if (i === index) {
            content1[2 * index].style.display = 'flex'
            content1[2 * index + 1].style.display = 'none'
          }
        }
        this.cultureText[index].content = content1[2 * index + 1].value
      },
      addWorld() {
        if (this.cultureText.length < 6) {
          this.cultureText.push({
            'id': 0,
            'title': '请编辑文字',
            'content': '请编辑文字'
          })
        }
        // this.$set(this.title, this.title.length, setWorld)
        // this.$set(this.content, this.title.length, setWorld)
      },
      deleteWorld(index) {
        if (this.cultureText[index].id) {
          let result = confirm('确定要删除?')
          if (result) {
            this.$axios({
              method: 'DELETE',
              url: '/brand/enterpriseCulture/delete',
              params: {
                cultureInfoId: this.cultureText[index].id
              },
              data: {}
            }).then(res => {
              if (res.status === 200) {
                this.cultureText.splice(index, 1)
                this.worldNum = this.worldNum - 1
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
              }
            })
          }
        } else {
          this.cultureText.splice(index, 1)
        }
      },
      submitForm() {
        // let fd = new FormData()
        // var iconStyle = document.getElementsByClassName('allSubmit')[0]
        // iconStyle.firstChild.style.color = '#3aa7ff'
        // iconStyle.firstChild.style.backgroundColor = '#edf0f5'
        let submit2 = document.getElementById('submit2')
        var bgc = document.getElementById('bFile').files[0]
        var culture = document.getElementById('upfile').files[0]
        for (let i = 0; i < submit2.length; i++) {
          submit2[i].submit()
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        // 文字添加、修改
        for (let i = 0; i < this.cultureText.length; i++) {
          if (this.cultureText[i].id === 0) {
            this.$axios({
              method: 'POST',
              url: '/brand/enterpriseCulture/add/',
              data: this.cultureText[i],
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              }
            })
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  })
                  this.cultureText[i].id = res.data.data.id
                  this.listen[i] = res.data.data
                }
              })
          } else if (this.cultureText[i].title !== this.listen[i].title || this.cultureText[i].content !== this.listen[i].content) {
            this.$axios({
              method: 'POST',
              url: '/brand/enterpriseCulture/update/',
              data: this.cultureText[i],
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              }
            })
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  console.log(res.data.data)
                }
              })
          }
        }
        // 上传背景图
        if (bgc) {
          let fd = new FormData()
          fd.append('imageFile', bgc)
          fd.append('isBack', 'yes')
          this.bgcLoading = true
          this.$axios.post('/brand/enterpriseCulture/image/update/', fd, config)
            .then(res => {
              this.$message({
                message: '背景图修改成功',
                type: 'success'
              })
              document.getElementById('upfile').value = ''
              this.bgcLoading = false
            }).catch(res => {
              console.log(res)
            })
        }
        if (culture) {
          let fd = new FormData()
          fd.append('imageFile', culture)
          fd.append('isBack', 'no')
          this.cultureLoading = true
          this.$axios.post('/brand/enterpriseCulture/image/update/', fd, config)
            .then(res => {
              this.$message({
                message: '文化图片修改成功',
                type: 'success'
              })
              document.getElementById('upfile').value = null
              this.cultureLoading = false
            }).catch(res => {
              console.log(res)
            })
        }
      },
      getImage(data, i) {
        const imgSplit = data.split(/\_|\./g)
        return this.head + imgSplit[0] + '_' + imgSplit[i] + '.' + imgSplit[imgSplit.length - 1]
      }
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../styles/main.scss';
  @import '../../../styles/mixin.scss';

  .imgstyle {
    width: 100%;
    height: 100%;
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
  }

  .hide {
    display: none;
  }

  .honorAll {
    width: 100%;
    background-color: #edf0f5;
    height: px2rem(scale(1450));
    @include fj(center);
    align-items: center;
  }

  .honorbox {
    width: 80%;
    height: 80%;
  }

  .change {
    width: px2rem(120);
    height: px2rem(34);
    background-color: #edf0f5;
    border-radius: px2rem(4);
    position: absolute;
    z-index: 99;
    @include fj(center);
    align-items: center;
  }

  .changebgc {
    left: .3rem;
    top: .3rem;
  }

  .changephoto {
    width: px2rem(150);
    top: 5rem;
  }

  .changeword {
    top: 1rem;
    right: 0;
    border: 0;
    padding: 0;
  }

  .allSubmit {
    position: absolute;
    z-index: 99;
    right: 0;
    bottom: 0;

    &:hover {
      color: #54b3ff;
      background-color: #d3ecfd;
    }
  }

  .delete {
    float: right;
    color: #e01;
    cursor: pointer;
  }

  .control {
    width: 100%;
    height: 5%;
    color: #fff;
    background-color: #a8a8a8;
    position: relative;

    #upload {
      height: 100%;

      #imgform {
        width: 100%;
        height: 100%;
        float: left;

        #updiv {
          width: 100%;
          height: 100%;
          float: left;
          position: absolute;
          @include fj(space-between);
          align-items: center;
        }
      }
    }
  }

  #honor {
    width: 100%;
    height: 100%;
    float: left;
    position: relative;

    > img {
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

          > img {
            width: 100%;
            height: 78%;
          }
        }

        .contentBottom {
          width: 100%;
          height: 30%;
          position: relative;
          @include fj(center);
          align-items: flex-end;

          > div {
            width: 100%;
            height: 50%;

            .line {
              width: 100%;
              height: 0;
              position: absolute;
              top: px2rem(88);
              border: 1px solid #ffdaaa;
            }

            .deleteT {
              width: 100%;
              position: absolute;
              top: px2rem(200);
              @include fj(space-around);
            }

            .dotted {
              width: 100%;
              position: absolute;
              top: px2rem(63);
              @include fj(space-around);

              > li {
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
              margin-top: 1rem;
              @include fj(space-between);
              align-items: flex-end;

              .worldIntro {
                // @include fj(center);
                // flex-direction: column;
                // align-items: center;
                .titleFather {
                  > p.title {
                    @include fj(center);
                    align-items: center;
                    color: #ffdaaa;
                    border: 1px dotted #fff;
                  }
                }

                .content1Father {
                  > p.content1 {
                    margin-top: 2%;
                    text-align: center;
                    @include fj(center);
                    align-items: center;
                    border: 1px dotted #fff;
                    color: #ffffff;
                  }
                }

              }
            }
          }
        }
      }
    }
  }
</style>
