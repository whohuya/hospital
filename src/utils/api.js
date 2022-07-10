import Vue from 'vue';
import axios from 'axios';
import portList from '../config/ports';
import qs from 'qs';
import { Message } from 'element-ui';
// axios.defaults.baseURL = '/web'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
// axios.defaults.timeout = 2500
// axios.defaults.withCredentials = true; // 是否允许带cookie这些
// axios.defaults.responseType = "json"; // 是否允许带cookie这些

// let webBase = 'http://doclever.cn:8090/mock/5aa0f1c9e8c992085a99fce6/api'
const AJAX = axios.create({
  timeout: 60000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: 'Basic ZWNvc3lzdGVtLWFkbWluOnRyeGsvZWNvc3lzdGVtLWFkbWluQDIwMjE=',
    'Accept-Language':'zh-CN',
  },
});
// POST传参序列化(添加请求拦截器)
AJAX.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    let token =
      (JSON.parse(localStorage.getItem('accessToken')) &&
        JSON.parse(localStorage.getItem('accessToken'))['access_token']) ||
      '';
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    if (config.url.indexOf('/excel') !== -1) {
      config.responseType = 'blob';
    } else {
      config.responseType = 'json';
    }

    if (config.method == 'post' || config.method == 'put') {
      if (config.headers['Content-Type'].indexOf('x-www-form-urlencoded') > 0) {
        config.data = qs.stringify(config.data, { indices: false });
      } else {
        if (config.data) {
          config.data = JSON.stringify(config.data);
        }
      }
    }
    return config;
  },
  error => {
    console.log(`发送请求错误！${error}`);
  }
);
// 返回状态判断(添加响应拦截器)
AJAX.interceptors.response.use(
    res => {
      // 对响应数据做些事
      let data = res
      if (res.config.url.indexOf('/excel') !== -1) {
        res.entity.$dayifilename = res.headers['content-disposition'].split('\;')[1].split('filename=')[1];
        // return res
      }
      // 17737936369
      if (res.status == 200) {
        if(!res.data.success){
          Message({
            message: res.data.message.message || '服务器异常',
            type: 'warning',
          });
          if (res.data.message.code=='invalid_token'){
            // Message({
            //   message: res.data.message.message || '服务器异常',
            //   type: 'warning',
            // });
            setTimeout(()=>{
              window.location.href = location.protocol + '//' + location.host + '/login.html'
            },2000)
          }
        }
        data = res.data
      }else if(res.status == 401){
        Message({
          message: res.data.message.message,
          type: 'warning',
        });
        setTimeout(()=>{
          window.location.href = location.protocol + '//' + location.host + '/login.html'
        },3000)
      }else{
        Message({
          message: '服务器异常',
          type: 'warning',
        });
      }
      return data
    },
    error => {
      if (error.response.status=='401'){
        Message({
          message: '登录失效，请重新登录',
          type: 'warning',
        });
        setTimeout(()=>{
          window.location.href = location.protocol + '//' + location.host + '/login.html'
        },2000)
      }else if (error.response.status=='500') {
        Message({
          message: '服务器异常',
          type: 'warning',
        });
      }
      return Promise.reject(error)
    }
)

// ----------------初始化API实例-----------------------
let API = {};

function run(note) {
  if (typeof note === 'function') {
    return note;
  }

  // 组装地址
  let gate = note.gate == undefined ? portList.gate : note.gate;
  let module = note.module == undefined ? portList.module : note.module;
  let version = note.version == undefined ? portList.version : note.version;
  // let url = ''
  let type = (note.type || 'post').toLocaleLowerCase();
  let key = portList.key || note.key;
  let contentType = note.contentType || 'application/json; charset=utf-8';
  return function(da, paramId = '') {
    let url = '';
    if (gate) {
      if (gate == '/') {
        url += '';
      } else {
        url += '/' + gate;
      }
    }
    if (module) {
      if (module == '/') {
        url += '';
      } else {
        url += '/' + module;
      }
    }
    if (version) {
      if (version == '/') {
        url += '';
      } else {
        url += '/' + version;
      }
    }
    url += typeof note.url === 'function' ? note.url() : note.url;

    if (key) {
      url += '?' + key;
    }
    let re = AJAX;
    if (paramId) {
      url = `${url}/${paramId}`;
    }
    if (type == 'post') {
      re = new Promise((resolve, reject) => {
        AJAX.post(url, da, { headers: { 'Content-Type': contentType } }).then(
          res => {
            resolve(typeof note.filter === 'function' ? note.filter(res) : res);
          },
          err => {
            reject(err);
          }
        );
      });
      // re = AJAX.post(url, da)
    }
    if (type == 'get') {
      // da.time = Date.now()
      re = new Promise((resolve, reject) => {
        AJAX.get(url, { params: da }).then(
          res => {
            resolve(typeof note.filter === 'function' ? note.filter(res) : res);
          },
          err => {
            reject(err);
          }
        );
      });
      // re = AJAX.get(url, da)
    }
    if (type == 'put') {
      re = new Promise((resolve, reject) => {
        AJAX.put(url, da, { headers: { 'Content-Type': contentType } }).then(
          res => {
            resolve(typeof note.filter === 'function' ? note.filter(res) : res);
          },
          err => {
            reject(err);
          }
        );
      });
      // re = AJAX.put(url, da)
    }
    if (type == 'delete') {
      // da.time = Date.now()
      re = new Promise((resolve, reject) => {
        AJAX.delete(url, { params: da }).then(
          res => {
            resolve(typeof note.filter === 'function' ? note.filter(res) : res);
          },
          err => {
            reject(err);
          }
        );
      });
      // re = AJAX.get(url, da)
    }
    return re;
  };
}

for (let p in portList.list) {
  API[p] = {};
  for (let l in portList.list[p]) {
    API[p][l] = run(portList.list[p][l]);
  }
}
// API.host='http://trgroup.test.da156.cn:8070';
API.init = function(yes, no) {
  let token = window.localStorage.getItem('token');
  if (token) {
    if (typeof yes === 'string') {
      window.location.href = yes;
      return;
    }
    if (typeof yes === 'function') {
      yes();
    }
  } else {
    if (typeof no === 'string') {
      window.location.href = no;
      return;
    }
    if (typeof no === 'function') {
      no();
    }
  }
};

/* ---------------------初始化默认参数----------------------- */

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, 'API', {
      value: API,
    });
  },
  init: API.init,
};

// 下载Excel
Vue.prototype.$downloada = function(data, name) {
  let eleLink = document.createElement('a');

  // eleLink.download =  decodeURIComponent(data.$dayifilename) || `${name}.xlsx`
  eleLink.style.display = 'none';

  // 触发点击
  document.body.appendChild(eleLink);
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(data, data.$dayifilename);
  } else {
    eleLink.download = decodeURIComponent(data.$dayifilename) || `${name}.xlsx`;
    eleLink.href = URL.createObjectURL(data);
    eleLink.click();
  }

  document.body.removeChild(eleLink);
};
Vue.prototype.$download = function(data, name) {
  // let data = new Blob([res],{type:'application/vnd.ms-excel;charset=UTF-8'})
  let eleLink = document.createElement('a');
  // let file = new File(data, data.$dayifilename);

  eleLink.download = decodeURIComponent(data.$dayifilename) || `${name}.xlsx`;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  // let blob = new Blob([data],{type:'application/vnd.ms-excel;charset=UTF-8'})
  // eleLink.href = URL.createObjectURL(file);
  eleLink.href = URL.createObjectURL(data);

  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};

Vue.prototype.$exportPdf = function(data, name) {
  let eleLink = document.createElement('a');
  eleLink.download = data.$dayifilename || name;
  eleLink.style.display = 'none';
  let blob = new Blob([data], {
    type: 'application/pdf', // word文档为msword,pdf文档为pdf
  });
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};

Vue.prototype.$openUrl = function(data) {
  let eleLink = document.createElement('a');
  // eleLink.download = name
  eleLink.target = '_blank';
  eleLink.style.display = 'none';
  // let blob = new Blob([data], {
  //     type: 'application/pdf' // word文档为msword,pdf文档为pdf
  // })
  eleLink.href = data;
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};
