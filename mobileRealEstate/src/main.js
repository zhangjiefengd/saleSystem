// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import fontSize from './utils/fontSize'
import global from './http/Global.vue'
import getElement from './utils/getElement'
import $ from 'jquery'
import VideoPlayer from 'vue-video-player'
import FastClick from 'fastclick'

Vue.use(VideoPlayer);

FastClick.attach(document.body);
FastClick.prototype.needsClick = function (target) {
  setTimeout(() => {
    return ((/\bneedsclick\b/).test(target.className) || (/\bvjs/).test(target.className));
  })
}


import {post,get} from './http/http.js'
Vue.prototype.$post = post;
Vue.prototype.$get = get;

Vue.prototype.$get = getElement

Vue.prototype.GLOBAL = global
Axios.defaults.baseURL = global.BASE_URL
Axios.defaults.withCredentials = false;
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
