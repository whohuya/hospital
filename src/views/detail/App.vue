<template>
  <div id="appDetails" v-loading="loading">
    <div class="content">
      <h3 class="title">{{newsDetailData.title}}</h3>
      <div class="detail-content"
           @touchstart="gotouchstart($event)"
           @touchend="gotouchend($event)"
           @touchmove="gotouchmove($event)">
        <div v-html="newsDetailData.content"  ref="commentClient"></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        newsDetailData: Object,
        loading: false,
        equipments: 'web',
      }
    },
    methods: {
      // 详情
      async fn(id) {
        this.loading=true;
          const result = await this.API.bussiness.getDetail({}, id)
        if (result.success == true) {
          this.loading = false;
          this.newsDetailData = result.entity;

        } else {
          this.loading = false;
          alert(result.message.message || "网络错误")
        }
      },
      gotouchstart(e){
        let slef = this;
        clearTimeout(slef.timeOutEvent);//清除定时器
        slef.timeOutEvent = setTimeout(function(){
          //执行长按要执行的内容，
          slef.timeOutEvent = 0;
          slef.LongPressEvent(e)
        },600);//这里设置定时
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
      //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
      gotouchend(e){
        let slef = this;
        clearTimeout(slef.timeOutEvent);
        return false;
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
      //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      gotouchmove(){
        let slef = this;
        clearTimeout(slef.timeOutEvent);//清除定时器
        slef.timeOutEvent = 0;
      },
      scrollCommentEvent() {
        let commentClient = this.$refs.commentClient;
        commentClient.scrollIntoView();
      },
    },
    mounted() {
      this.fn(this.$route.query.id)
      window.scrollCommentEvent = this.scrollCommentEvent;
      // this.fn(13)
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        this.equipments = 'Android'//安卓手机
      } else if (u.indexOf('iPhone') > -1) {
        this.equipments = 'ios' //苹果手机
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/details.css";
</style>
<style lang="scss">
  body{
    margin: 0;
  }
  #appDetails{
    height: 100%;
    *{
      margin: 0;
    }
    .title{
      text-align: center;
      color: #212121;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      line-height: 25px;
    }
    .detail-content{
      margin-top:20px ;
      p{
        padding: 0 20px;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #212121;
        line-height: 22px;
      }
      img{
        width: 100%;
      }
    }
  }
</style>
