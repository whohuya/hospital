<template>
  <div style="height: 100%;width: 100%;">
    <common-page>
      <keep-alive>
        <router-view v-if="keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!keepAlive"></router-view>
    </common-page>
  </div>

  <!-- <div id="app">
    <router-view />
  </div> -->
</template>
<script>
  import CommonPage from "@components/CommonPage";
  export default {
    name: "App",
    computed: {
      keepAlive() {
        return this.$route && this.$route.meta && this.$route.meta.keepAlive;
      },
    },
    mounted(){
        window.addEventListener('message',function(e){
            if(e.data=='notToken'){
                setTimeout(()=>{
                    window.location.href = location.protocol + '//' + location.host + '/login.html'
                },1000)

            }
        })
    },
    components: {
      CommonPage,
    },
  };
</script>
<style scoped>
  @import "~@assets/reset.css";
</style>
