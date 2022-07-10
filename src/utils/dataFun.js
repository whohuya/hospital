function deleteNull (target) {
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            const e = target[key]
            if (e === null) {
                delete target[key]
            }
        }
    }
    return target
}
function checkNumber(n,flag=2,special=0) {
  //let a = n.replace(/[^\d.]/g,"");
 let a = n.replace(/[^\d|.]|^\./gi, "");
  const e = a.split("");
  const el = e.length;
  if (el === 2) {
    if (e[0] === "0" && /[^.]/.test(e[1])) {
      a = e[1]
    }
  }
  if (el === 4 && flag==2) {
    if (e[0] === "0" && e[1] === "." && e[2] === "0") {
      a = "0.0" + e[3].replace(/[.0]/, "");
    }
  }
  if (el >= 5 && flag!==2) {
    // console.log("我在这里啦",el)
    if (e[0] === "0" && e[1] === "." && e[2] === "0"&& e[4] === "0") {
      a = "0.00" + e[4].replace(/[.0]/, "");
    }
  }
  // 删除多余小数点
  const l = a.match(/\./g) && a.match(/\./g).length;
  if (l > 1) a = a.slice(0, -1);
  // 保留两位小数
  a = flag==2?special?a.match(/\d*(\.\d{0,2})?/):a.match(/\d{1,}(\.\d{0,2})?/):a.match(/\d{1,}(\.\d{0,3})?/);
  return a ? a[0] : null;
}
function checkNumberOne(n) {
  //let a = n.replace(/[^\d.]/g,"");
 let a = n.replace(/[^\d|.]|^\./gi, "");
  const e = a.split("");
  const el = e.length;
  if (el === 2) {
    if (e[0] === "0" && /[^.]/.test(e[1])) {
      a = e[1]
    }
  }
  // 删除多余小数点
  const l = a.match(/\./g) && a.match(/\./g).length;
  if (l > 1) a = a.slice(0, -1);
  // 保留两位小数
  a = a.match(/\d{1,4}(\.\d{0,1})?/);
  return a ? a[0] : null;
}
function checkPhone(val){
  return String(val).replace(/[^\d.]/g,"").replace(/^(\d{11}).*$/,'$1')
}
function checkCode(val){
  return String(val).replace(/[^\d.]/g,"").replace(/^(\d{6}).*$/,'$1')
}
function checkCode6(val){
  return String(val).replace(/[^\d.]/g,"").replace(/^(\d{6}).*$/,'$1')
}
function deleteEmpty (target) {
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            const e = target[key]
            if (e === null || e === '') {
                delete target[key]
            }
        }
    }
    return target
}
function valueIsexist(paramOut,paramIn){//比较一个对象是否在数组里面
    if(!paramOut || !paramIn) return false;
    let c = paramOut.some((item)=>item.id==paramIn.id)
    return c
}
function formatConditions (target, deleteEmpty) {
  // console.log("我我哦我",target)
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            let e = target[key]
            if (Array.isArray(e)) {

                target[key] = e.join(',')
                // console.log('我在这里呀')
            }
            e = target[key]
            if (deleteEmpty && (e === null || e === '')) {
                delete target[key]
            }
        }
    }
    return target
}

function deepCopy (target) {
    let copyedObjs = []
    function _deepCopy (target) {
        if (typeof target !== 'object' || !target) return target
        const copyedLength = copyedObjs.length
        for (let i = 0; i < copyedLength; i++) {
            if (copyedObjs[i] === target) {
                return copyedObjs[i].copyTarget
            }
        }
        let obj = {}
        if (Array.isArray(target)) obj = []
        copyedObjs.push({ target, copyTarget: obj })
        Object.keys(target).forEach(key => {
            if (obj[key]) return
            obj[key] = _deepCopy(target[key])
        })
        return obj
    }
}
function getSearchString(key, Urls) {
    let Url=Urls && decodeURIComponent(Urls);
    if(Url && Url.indexOf('?')<0) return ''
    let num=Url.indexOf('?');
      let str = Url.substring(num+1, Url.length); // 获取URL中?之后的字符（去掉第一位的问号）
      // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
      var arr = str.split("&");
      var obj = new Object();

      // 将每一个数组元素以=分隔并赋给obj对象
      for (var i = 0; i < arr.length; i++) {
          var tmp_arr = arr[i].split("=");
          obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
      }
      return obj[key];
  }
  function debounce(fn, wait = 1000) {//防抖
    var timeout = null;
    return () => {
      if (timeout !== null){
        clearTimeout(timeout);
      }

      timeout = setTimeout(function(){
        fn()
      }, wait);
    }

  }
  function getJSON(s) {
    if (s) {
      return JSON.parse(s)
    } else {
      return {}
    }
  }
  function convertCanvasToImage(canvas){
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
  }
  function emptyObject(o) {
    return JSON.stringify(o) === '{}'
  }
  function insertScript(url) {
    return new Promise((resolve, reject) => {
      var script = document.createElement("script");
      script.src = url;
      script.onload = resolve
      script.onerror = reject
      document.body.appendChild(script);
    })
  }
//本地和不同入口跳转
function HandleUrl(url) {
    let host = location.hostname;
    let url_sub='';
    if (url.length) {
            // this.$router.push(url)17
          if (host == 'localhost' || host == '127.0.0.1' || !host){
            url_sub=url.substring(17);
            location.href = location.origin + url_sub
          }else{
            location.href = location.origin + url
          }
    }
  }
  function backHandle(fn){//返回处理
    if (typeof window.addEventListener != "undefined") {
        window.addEventListener("popstate", function(e) {
        // console.log("后退了12")
            fn()
            // console.log("后退了2")
        }, false);
      } else {
        window.attachEvent("popstate", function(e) {
        // console.log("后退了")
            fn()
        });
      }
  }
//日期不能超过现在
function dateLittle(str){
    if(!str) return false;
    var errText='';
    var en = getCurrentDate();
    var a=en.split('-')[0] -str.split('-')[0];//年
    var b=en.split('-')[1] -str.split('-')[1];//月
    if(a<=0 && b<0){
      errText='月份选择不能大于现在时间！';
    }
    return errText

  }
  function setLocal(key, value) {
    const v = encodeURI(JSON.stringify(value))
    localStorage.setItem(key, v)
  }
  function getLocal(key, default_value = {}) {
    const v = decodeURI(localStorage.getItem(key))
    return JSON.parse(v) || default_value
  }
  function integer(v) {
    return v ? parseInt(v) : 0;
  }
  function decimal(v) {
    const n = Number(v).toString();
    const d = n && n.split(".")[1];
    return d ? d.slice(0, 2) : 0;
  }
  function decimalWithDot(v) {
    const d = decimal(v)
    return `.${d ? d : '00'}`
  }
 function getUserName () {
    var user = localStorage.getItem('user')
    if (user) {
        return JSON.parse(user).name
    }
}
function money(val,decimal=2){
  if(!val){
      val=0;
      return val.toFixed(2)
  }else{
    if (typeof val === 'undefined') return val;
    const prepared = parseFloat(val);
    if (Number.isNaN(prepared)) return val;
    return prepared.toLocaleString('zh-Hans-CN', {currency:'CNY', minimumFractionDigits:decimal});
  // return val.toLocaleString()
  }
}
function formatterMoney(val){
  if(!val){
      val=0;
      return val.toFixed(2)
  }else{
    //toLocaleString('zh-Hans-CN',{style:'currency',currency:'CNY'})//带￥，
  return val.toLocaleString('zh-Hans-CN',{minimumFractionDigits:2,maximumFractionDigits:2})//保留两位
  }
}
function format_bankCard(str){
  if(!str){
      return ''
  }else{
    str = str.toString(); // 必须是字符串
    if(str.length<4){
      return str
    }else{
        var yushu = str.length % 4;
        if(yushu > 0){
            return str.match(/\d{4}/g).join(' ') + " " + str.substr(-yushu, yushu);
        } else {
            return str.match(/\d{4}/g).join(' ');
        }
    }
  }

}
function isJSON(str) {
  if (typeof str == 'string') {
      try {
          var obj=JSON.parse(str);
          if(typeof obj == 'object' && obj ){
              return true;
          }else{
              return false;
          }

      } catch(e) {
          console.log('error：'+str+'!!!'+e);
          return false;
      }
  }
}
  function  getDistance(p1,p2){
    return  new Promise((resolve,reject) => {
          AMap.plugin('AMap.TruckDriving',  function(){
            var truckDriving = new AMap.TruckDriving({
                policy: 7, // 规划策略
                size: 1, // 车型大小
                width: 2.5, // 宽度
                height: 2, // 高度
                load: 1, // 载重
                weight: 12, // 自重
                axlesNum: 2, // 轴数
            })
            var path = []
            path.push({lnglat:p1});//起点
            path.push({lnglat:p2});//终点
            let c=0
                truckDriving.search(path,  function(status, result) {
                  // console.log("玛丽隔壁",result,status)
                  if (status === 'complete') {
                      let c=  result.routes.length &&  result.routes[0].distance;
                      // console.log("周六喽")
                      resolve(c)

                  } else {
                    reject(-1)
                      return 0
                  }
              })


        })
      })
}
  function  getDistance2(p1,p2){
    return  new Promise((resolve,reject) => {
          AMap.plugin('AMap.TruckDriving',  function(){
            var truckDriving = new AMap.TruckDriving({
                policy: 7, // 规划策略
                size: 1, // 车型大小
                width: 2.5, // 宽度
                height: 2, // 高度
                load: 1, // 载重
                weight: 12, // 自重
                axlesNum: 2, // 轴数
            })
            // console.log("先走着留3")
        var path = []
        path.push({lnglat:p1});//起点
        path.push({lnglat:p2});//终点
        let c=0
            truckDriving.search(path,  function(status, result) {
              // console.log("先走着留1")
              if (status === 'complete') {
                // console.log("先走着留2")
                  let c=  result.routes.length &&  result.routes[0].distance;
                  resolve(c)
                  // console.log("先走着留3")
                  // console.log("结果是",(result.routes[0].distance/1000).toFixed(1),result.routes.length &&  result.routes[0].distance)
                  // console.log("测试下结果",c)

              } else {
                // console.log("在这里啦")
                reject(-1)
                  return 0
              }
          })


        })
      })
}
export {
    deleteNull,
    deleteEmpty,
    deepCopy,
    formatConditions,
    valueIsexist,
    getSearchString,
    debounce,
    getJSON,
    convertCanvasToImage,
    emptyObject,
    insertScript,
    HandleUrl,
    backHandle,
    dateLittle,
    setLocal,
    getLocal,
    integer,
    decimal,
    decimalWithDot,
    getUserName,
    checkNumber,
    money,
    format_bankCard,
    isJSON,
    checkPhone,
    checkCode,
    checkCode6,
    getDistance,
    formatterMoney,
    checkNumberOne


}
