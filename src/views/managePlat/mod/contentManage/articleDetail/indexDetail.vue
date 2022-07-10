<template>
  <div class="pageBox" >
    <div class="loding" v-if="loading"></div>
    <div class="picImg" id="picWrap" v-show="hidePicWrap">
      <!--      <p style="color: red">{{store.scale}}<br />{{store.nw}}</p>-->
      <div id="imgBox">
        <div id="photoBox">
          <img id="picImg" :src="picImgUrl" alt="">

        </div>
      </div>
    </div>
    <div class="content" v-show="!hidePicWrap">

      <h3 class="title">{{newsDetailData.title}}</h3>
      <!-- <h6 class="timer"><span>浏览量 {{this.newsDetailData.view + 1||"1"}}</span><span>{{this.formatDate(this.newsDetailData.publishDate||1611294041)}}</span></h6> -->
      <!--@click="imageChgange($event)"-->
      <div class="detail-content">
        <div v-html="newsDetailData.content"></div>
      </div>
      <iframe id="iframeCont" ref="iframeCont" class="detail-iframe" v-show="newsDetailData.type == 4" :src="newsDetailData.linkUrl" width="100%"  frameborder='0'></iframe>
    </div>

  </div>
</template>

<script>
  // import './assets/js/reset';
  // import male from './assets/img/male.svg';
  // import avatar from './assets/img/avatar.svg';

  export default {
    name: 'App',
    data() {
      return {
        newsDetailData: Object,
        newsCommentsData: Object,
        newsCommentsList: [],
        CommenNo: false,
        hidePicWrap: false,
        picImgUrl: '',
        commentCmoreBut: true,
        IsWhole: false,
        loading: true,
        store: {
          scale: 1,
          pageX: 0,
          pageY: 0,
          moveable: false,
          pageX2: 0,
          pageY2: 0,
          originScale: 1,
        },
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        equipments: 'web',
        pageNum: 1,
        pageSize: 10,
        scrollHeight: 0,
        scrollTop: 0,
        clientHeight: 0,
        timeOutEvent: 0,
        scrollY: 0,
        // male,
        // avatar
      }
    },
    methods: {
      // 详情
      async fn(id) {
        // const result = await this.API.news.newsDetail({}, id)
          const result = await this.API.bussiness.getDetail({}, id)

        if (result.success == true) {

          this.newsDetailData = result.entity;
           console.log( this.newsDetailData)
          //  this.picImgUrl=this.newsDetailData.redirectUri
          // this.newsComments(result.entity.id);
          this.loading = false;
        } else {
          alert(result.message.message || "网络错误")
        }
      },
      formatDate(date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
      },
      formatDateMDHM(date) {
        var date = new Date(date);
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        return MM + DD + " " + hh + mm;
      },
      turnUrl(url) {
        let num = url.indexOf("?");
        url = url.substring(num + 1);
        let arr = url.split("&");
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
          let newArr = arr[i].split("=");
          obj[newArr[0]] = newArr[1];
        }
        return obj;
      },
      //超时登录
      startOvertime(code) {
        if (this.equipments == "Android") {
          window.android.startOvertimes(code)
        }
        if (this.equipments == "ios") {
          window.webkit.messageHandlers.startOvertimes.postMessage(code);
        }
      },

      //ios 点击图片以外的事件
      IosOnEvent() {
        if (this.equipments == "ios") {
          window.webkit.messageHandlers.IosOnEvents.postMessage("e");
        }
      },
      //安卓IOS长按事件
      LongPressEvent(e) {
        if (this.equipments == "Android") {
          window.android.upLongPic(e.target.currentSrc)
        }
        if (this.equipments == "ios") {
          window.webkit.messageHandlers.upLongPic.postMessage(e.target.currentSrc);
        }
      },
      AndroidAndIos(t) {
        this.hidePicWrap = t;
        if (this.equipments == "Android") {
          // window.android.isComment(t)
        }
        if (this.equipments == "ios") {
          // window.webkit.messageHandlers.isComment.postMessage(t);
        }
      },
    },
    // watch:{
    //   hidePicWrap: function(newVal,oldVal){
    //     if(newVal){
    //       document.getElementsByClassName('content').setAttribute('style', 'overflow:hidden;')
    //     }else{
    //       document.getElementsByClassName('content').setAttribute('style', 'overflow:auto;')
    //     }
    //   }
    // },
    mounted() {
      let obj = this.turnUrl(window.location.href)
        , slef = this;
      // this.fn(obj.id);
      console.log(this.$route.query.id)
      // this.fn(this.$route.query.id);
      this.fn(4)
      // window.newsComments = this.newsComments;
      window.scrollCommentEvent = this.scrollCommentEvent;
      // this.imgArray();
      // this.touchPic();

      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        this.equipments = 'Android'//安卓手机
      } else if (u.indexOf('iPhone') > -1) {
        this.equipments = 'ios' //苹果手机
      }

      (function () {
        window.alert = function (name) {
          var iframe = document.createElement("IFRAME");
          iframe.style.display = "none";
          iframe.setAttribute("src", 'data:text/plain');
          document.documentElement.appendChild(iframe);
          window.frames[0].window.alert(name);
          iframe.parentNode.removeChild(iframe);
        }
      })();
    }
  }
</script>
<style scoped="scoped">
  @import "../../../../../assets/css/reset.css";
  .detail-iframe{
    min-height: 100vh;
    padding-bottom: 10px;
  }
  .picImg{
    touch-action: none;
  }


</style>
