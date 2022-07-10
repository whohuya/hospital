<template>
  <div id="header">
    <div class="header_left">
      <div>
        <img src="../assets/logo.svg" alt=""/>
      </div>
      <p>信科云管理后台</p>
    </div>
    <div class="header_center">
      <el-menu
        :default-active="defaultPath"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        style="border: 0"
      >
        <el-menu-item
          v-for="(nav, nind) in navList.filter((ele) => ele.url != '')" :key="nind" :index="nav.url"
          v-if="shouye =='externalManage'"
        ><a :href="nav.url">{{ nav.name }}</a></el-menu-item
        >
      </el-menu>
    </div>
    <div class="header_right">
      <div class="loginOut clearfix">
        <el-dropdown class="user-opera">
          <span class="el-dropdown-link">
            <img src="../assets/avatar.svg" alt=""/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!--                        <el-dropdown-item><p >个人资料</p> </el-dropdown-item>-->
            <el-dropdown-item><p @click="changepwd">修改密码</p></el-dropdown-item>
            <el-dropdown-item
            ><p @click="loginOut">退出登录</p></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <div class="fl user-name">
          {{ userName }}
        </div>
      </div>
    </div>
    <edit-password
      @close='editDialog=false'
      :innerVisible="editDialog"
      v-model="initData"
      @modifyClose='modifyFlag=false'
    ></edit-password>
  </div>
</template>

<script>
    // import {mapState} from 'vuex';
    import EditPassword from "./editPassword";
    export default {
        name: "pubheader",
        components: {EditPassword},
        data() {
            return {
                initData:{},
                editDialog: false,
                userName: localStorage.getItem("userInfo"),
                defaultPath: "",
                navList: [
                    {name: "首页", url: "/managePlat.html"},
                    // {name:'生产中心',url:''},
                    // {name:'物流中心',url:''},
                    // {name:'矿山中心',url:''},
                    // {name:'财务中心',url:''},
                    // {name:'设备中心',url:''},
                    // {name:'安全中心',url:''},
                    // // {name:'业务中台',url:'/managePlat.html'},
                    // {name:'数据中台',url:''},
                    // {name:'研发中台',url:''},
                ],
                shouye: ''
            };
        },
        computed: {},
        mounted() {
            this.defaultPath = window.location.pathname;
            this.shouye = 'managePlat'
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            loginOut() {
                window.location.href = "/login.html";
                // this.API.carUser.logout({}).then((res) => {
                //     if (res.code == 200) {
                //         this.$message.success("登出成功！");
                //     }
                // });
            },
            changepwd() {
                this.editDialog = true
            },
        },
    };
</script>

<style lang='scss' scoped>
  #header {
    height: 66px;
    background: #fff;
    width: 100%;
    padding: 0 30px;
    position: relative;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.08);
    z-index: 100;

    .header_left {
      width: 300px;
      height: 66px;
      display: flex;
      align-items: center;

      p {
        font-size: 20px;
        margin-left: 12px;
      }
    }

    .header_center {
      width: 800px;
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -400px;
      line-height: 66px;
      font-size: 12px;
      color: #999;
    }

    .header_right {
      position: absolute;
      color: #fff;
      top: 0;
      right: 0;
      padding-left: 30px;

      .loginOut {
        display: flex;
        width: 180px;
        height: 66px;
        text-align: left;
        align-items: center;

        .user-opera {
          font-size: 20px;
          display: inline-block;

          .el-dropdown-link {
            width: 36px;
            height: 36px;
            cursor: pointer;
            display: block;

            img {
              width: 100%;
              height: auto;
            }
          }
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          margin-left: 10px;
        }
      }
    }
  }
</style>
