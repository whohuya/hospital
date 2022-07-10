<template>
  <div id="login">
    <div class="loginMain">
      <div class="content">
        <div class="logoTitle">
          <img
            class="logoImg"
            src="../../assets/img/tr_Logo.svg"
            alt=""
          />
          <span>信科云管理后台</span>
        </div>
        <div class="loginForm">
          <span>账户密码登录</span>

          <el-form
            :model="loginForm"
            ref="loginForm"
            :rules="rules"
            class="mainForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                maxlength="20"
                placeholder="请输入手机号"
                @change="specifiName($event)"
              >
                <i slot="prefix">
                  <img
                    style="margin-top: 10px"
                    src="../../assets/img/login_user_icon.svg"
                    alt
                  />
                </i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                maxlength="20"
                placeholder="请输入密码"
              >
                <i slot="prefix">
                  <img
                    style="margin-top: 10px"
                    src="../../assets/img/login_password_icon.svg"
                    alt
                  />
                </i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <!-- <slider status="status"></slider> -->
              <slider
                style="margin-top:5px"
                :successFun="success"
                :errorFun="fail"
              ></slider>
            </el-form-item>
            <el-form-item v-loading="btnLoading">
              <el-button
                type="primary"
                class="loginBtn"
                @click="login('loginForm')"
                :disabled="disBtn"
              >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slider from "./components/SliderVerify.vue";
export default {
  name: "Login",
  components: { slider },
  data () {
    return {
      btnLoading: false,
      status: false,
      rules: {
        username: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["blur", "change"],
          },

          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: ["blur"] }

        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },

        ],
      },
      loginForm: {},
      disBtn: true,
    };
  },
  methods: {
    specifiName (el) {
      if (el == 'admin') {
        this.rules.username = []
        console.log(el)
      } else {
        console.log('1')
      }

    },
    success () {
      this.status = true;
      this.disBtn = false;
      console.log(this.status);
      // alert('成功')
    },
    login (loginForm) {
        window.location.href = "/managePlat.html#"+'/onlineReporting/onlineReporting'

        localStorage.removeItem('accessToken')
      localStorage.removeItem('menuList')
      localStorage.removeItem('userInfo')
      this.btnLoading = true
      let params = {
        scope: "all",
        grant_type: "password",
        login_method: 'M2',
        user_type: '1',
        ...this.loginForm,
      };
      this.$refs[loginForm].validate(async valid => {
        if (valid) {
          const res = await this.API.user.login(params);
          console.log(res);
          this.btnLoading = false
          localStorage.setItem("user_telephone", JSON.stringify(res.entity.user_telephone));
          if (res.success) {
            // this.getMenus();
          }

        } else {
          this.btnLoading = false
          console.log("error submit!!");
        }
      });
    },
    async getMenus () {
      const res = await this.API.user.getMenus({
        clientId: 'ecosystem-admin',
      });
      if (res.success) {
        if (res.entity.length == 0) {
          this.$message({
            message: '该账号无访问权限',
            type: 'warning',
          });
          this.btnLoading = false
          return
        }
        localStorage.setItem("menuList", JSON.stringify(res.entity[0].menus));
        //    console.log(res.entity[0].menus)
        //  console.log("/managePlat.html#"+'/'+ JSON.parse(localStorage.getItem("menuList"))[0].code)
        //  console.log(res.entity[0].menus[0].submenu)
        if (res.entity[0].menus[0].submenu.length > 0) {
          //  console.log('不为空')
          console.log("/managePlat.html#" + '/' + res.entity[0].menus[0].code + '/' + res.entity[0].menus[0].submenu[0].code)
          window.location.href = "/managePlat.html#" + '/' + res.entity[0].menus[0].code + '/' + res.entity[0].menus[0].submenu[0].code;
        } else {
          console.log('跳转')
          window.location.href = "/managePlat.html#" + '/' + res.entity[0].menus[0].code + '/' + res.entity[0].menus[0].path;

        }

      }
    },
    fail () {
      console.log("1211");
    },
  },
  mounted () {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("menuList");
  },
};
</script>
<style scoped>
@import "~@assets/reset.css";
</style>
<style scoped lang="scss">
#login {
  width: 100%;
  height: 100%;
  position: fixed;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.loginMain {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/img/Login_bg.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.content {
  background: url("../../assets/images/login.svg") no-repeat center;
  width: 840px;
  height: 600px;
  opacity: 1;
  margin: 0 auto;
}

.logoTitle {
  width: 100%;
  padding: 45px 0 0 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .logoImg {
    width: 26px;
    height: 31px;
    margin-right: 12px;
  }

  span {
    height: 20px;
    opacity: 1;
    font-size: 20px;
    font-family: PingFang, PingFang-SC;
    font-weight: 600;
    text-align: left;
    color: #000000;
    line-height: 20px;
    letter-spacing: 0px;
  }
}

.loginForm {
  padding: 100px 0 0 70px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  span {
    font-size: 14px;
    font-family: PingFang, PingFang-SC;
    font-weight: 600;
    text-align: center;
    color: #1c2434;
    line-height: 14px;
    letter-spacing: 0px;
  }

  .mainForm {
    margin-top: 50px;

    .el-input__inner {
      border: 0px !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
    }
  }
}

#login .el-form-item {
  width: 250px;
  margin-bottom: 20px;
}

#login .el-input {
  font-size: 16px;
}

/* /deep/ .el-input__inner */
::v-deep .el-input__inner {
  height: 50px;
  line-height: 50px;
  border: none;
  border-radius: 0px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding-left: 35px;
  position: relative;
  box-shadow: inset 0 0 0 1000px #ffffff !important;
}

#login {
  .loginBtn.el-button {
    width: 100%;
    background: #005eeb;
    border-color: #005eeb;
    border-radius: 6px;
    box-shadow: 0px 5px 10px 0px rgba(0, 102, 255, 0.2);

    ::v-deep span {
      color: white !important;
    }
  }
}

::v-deep .el-form-item__error {
  padding-top: 8px;
}
</style>

