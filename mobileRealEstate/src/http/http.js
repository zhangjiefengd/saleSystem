import axios from 'axios'
import qs from 'qs'
// axios 配置
const newBaseUrl = 'https://xymind.net:3000'
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://118.24.113.182:8080/demonstration/'; 
var Content_Type = 'application/json;charset=utf-8';
//http request 拦截器 
axios.interceptors.request.use(
    config => {
        if(axios.defaults.baseURL == newBaseUrl){
        config.headers = {
            'Content-Type':'application/json;charset=utf-8'
        }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// http response 拦截器
// 响应拦截，先剥离一层data
axios.interceptors.response.use(
  response => {
//如果返回402（自定义），说明没有token，跳转回登录页
// console.log(response)
if(response.data.status == 402){
console.log('需要重定向')
}
if(axios.defaults.baseURL == newBaseUrl){	
return response.data;
}
    return response;
  },
  error => {
console.log(error+"err")
    return Promise.reject(error.response)
 });
/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}, newUrl, dataType) {
 	if(newUrl){
		axios.defaults.baseURL = newUrl
	}else{
		axios.defaults.baseURL = baseUrl
	}
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
    .then(response => {
      resolve(response);
    },err => {
      reject(err);
    })
  })
}
/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, newUrl, dataType) {
	// if(dataType == 'formdata'){
	// 	data = qs.stringify(data);
	// 	Content_Type = 'application/x-www-form-urlencoded;charset=utf-8';
	// }else{
	// 	Content_Type = 'application/json;charset=utf-8';
	// }
	// data = qs.stringify(data);
	if(newUrl){
		axios.defaults.baseURL = newUrl
	}else{
		axios.defaults.baseURL = baseUrl
  }
  	return new Promise((resolve, reject) => {
	    axios.post(url, data)
	      .then(response => {
	        resolve(response);
	      }, err => {
	        reject(err);
	      })
  })
}
