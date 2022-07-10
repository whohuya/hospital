
<template>
  <iframe id="iframeExhibition" :src="srcUrl" :style="{width: previewW,height:previewH}"></iframe>
</template>

<script>
  export default {
    name: "failLog",
    data(){
      return{
        srcUrl:'',
        previewW:window.innerWidth + 'px',
        previewH:window.innerHeight-78 + 'px',
      }
    },
    created() {
      let token=(JSON.parse(localStorage.getItem('accessToken'))&&JSON.parse(localStorage.getItem('accessToken'))['access_token'])
      this.srcUrl='http://172.19.4.83:9101/outerBussinessCenter.html#/internalManage/outerFailLog?projectId=4&service=ecosystem-admin&ztToken='+token
      // this.srcUrl='http://172.19.4.83:9101/bussinessCenter.html#/internalManage/outerFailLog?projectId=4&ztToken='+token
    },
  }
</script>
<style lang="scss" scoped>
  .pubContent {
    overflow: scroll;

    height: auto;
  }
</style>



