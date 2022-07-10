<template>
  <div id="menuBar">
    <div class="menu-leftbar" :class="{w50:isCollapse}">
      <div class="menu-arrow" @click="changeMenu">
        <i v-show="isCollapse" class="el-icon-right"></i> <span v-show="!isCollapse"><i class="el-icon-back"></i>收起</span>
      </div>
      <el-menu :default-active="$route.path" class="item-gr"  :collapse="isCollapse" :unique-opened="false">
        <div v-for="(ite,ind) in menuList " :key="ind">
          <el-menu-item v-if="ite.submenu.length==0" :class='`menu-${ite.code}`' :index="`/${ite.code}/${ite.path}`" @click="handleUrl(`/${ite.code}/${ite.path}`)">
            <template slot="title" >
              <i :class="`el-icon-${ite.code}`"></i>
              <span slot="title">{{ite.name}}</span>
            </template>
          </el-menu-item>
          <el-submenu v-else :class='`menu-${ite.code}`' :index="`/${ite.code}`" >
            <template slot="title">
              <i :class="`el-icon-${ite.code}`"></i>
              <span slot="title">{{ite.name}}</span>
            </template>
            <div v-for="(child,cind) in ite.submenu" :key="cind">
              <el-menu-item  v-if="child.submenu.length==0" :index="`/${ite.code}/${child.code}`" @click="handleUrl(`/${ite.code}/${child.code}`)">{{child.name}}</el-menu-item>
              <el-submenu v-else :index="`/${ite.code}/${child.code}`">
                <template slot="title">
                  <span slot="title">{{child.name}}</span>
                </template>
                <div v-for="(grandchild,gInd) in child.submenu" :key="gInd">
                  <el-menu-item :index="`/${ite.code}/${child.code}/${grandchild.code}`"  @click="handleUrl(`/${ite.code}/${child.code}/${grandchild.code}`)">{{grandchild.name}}</el-menu-item>
                </div>
              </el-submenu>
            </div>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'platfrom',
    data () {
      return {
        isCollapse: false,
        menuList:[
            {authorities: ["ADD", "UPDATE", "DELETE", "SELECT", "AUTHROLE", "MENUFUN", "ENABLE", "UPGRADE", "VERHISTORY"],
        code: "onlineReporting",
        icon: null,
        id: 96,
        name: "在线举报",
        parentId: null,
        path: "onlineReporting",
        submenu: []}

        ]
      }
    },
    created(){
      // this.menuList=JSON.parse(localStorage.getItem('menuList'))

    },
    mounted () {
      this.initData();
    },
    methods: {
      initData () {
        var self = this
        if (
                '-ms-scroll-limit' in document.documentElement.style &&
                '-ms-ime-align' in document.documentElement.style
        ) {
          // detect it's IE11
          window.addEventListener(
                  'hashchange',
                  function () {
                    var currentPath = window.location.hash.slice(1)
                    // if (store.state.route.path !== currentPath) {
                    self.$router.push(currentPath)
                    // }
                  },
                  // false
          )
        }

      },

      // handleClose (key, keyPath) {
      // },
      handleUrl (url) {
        // console.log('url',url)
        this.$router.push(url)
      },
      changeMenu () {
        this.isCollapse = !this.isCollapse
        this.$emit('checkMenu', this.isCollapse)
      }
    },


  }
</script>
<style lang='scss'>
  .menu-leftbar {
    width: 210px;
    background: rgba(255, 255, 255, 1);
    height: 100%;
    border-radius: 4px 0px 0px 4px;
    position: absolute;
    left: 0;
    top: 66px;
    padding: 0 10px;
    overflow: hidden;
    transition: all 0.3s ease-in;
    margin-top: 12px;
    .el-menu {
      border: 0;
      overflow: hidden;
      overflow-y: auto;
    }
    .el-menu-item, .el-submenu .el-menu-item{
      &.is-active{
        color: #fff;
        background: #0066FF;
        span{
          color: #fff;
        }
      }
      padding: 0;
      height: 40px;
      line-height: 40px;
      min-width: auto;
      color: #000;
      border-radius: 6px;
      font-weight: 600;
    }
    .el-menu-item,.el-submenu{
      background-position: center center;
      background-repeat: no-repeat;
      cursor: pointer;
    }
    .el-submenu__title{
      height: 40px;
      line-height: 40px;
      span{
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: left;
        color: #1c2434;
        line-height: 14px;
      }
    }
    .el-menu--collapse{
      width: 100%;
      .el-submenu{
        height: 40px;
        &:hover{
          background-color:#ecf5ff ;
        }
      }
      .el-menu-item{
        padding: 0!important;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #1c2434;
        line-height: 14px;
        &.is-active{
          color: #000;
          background: #fff;
          border-radius: 0;
        }
      }
      .el-submenu__title {
        display: none;
      }
    }

  }
  // internalManage, externalManage, projectManage,orgManage,msgManage, versionManage, contentManage, feedbackManage
  @each $icon in onlineReporting,  {
    .el-menu--collapse .menu-#{$icon},
    .el-icon-#{$icon}{
      background-image: url('../assets/images/menuIcon/#{$icon}.svg')
    }
  }
  .item-gr [class^='el-icon-'] {
    background-size: 24px auto;
    width: 24px;
    height: 24px;
  }

  .el-tooltip__popper.is-dark{
    span{
      color: #fff!important;
    }

  }

  .menu-arrow{
    width: 100%;
    height: 40px;
    padding-left: 20px;
    cursor: pointer;
    span,i{
      color: #999999;
      font-size: 12px;
      line-height: 40px;
    }
    i{
      font-size: 16px;
      font-weight: bold;
      margin-right: 10px;
    }
  }
  .w50 {
    width: 50px;
    .menu-arrow{
      padding: 0 ;
      text-align: center;
    }
  }
</style>
