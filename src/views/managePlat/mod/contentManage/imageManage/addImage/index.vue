<template>
  <div class="page-container">
    <div class="add-container">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span><span>
              <span>{{
                this.$route.query.id ? "修改图片" : "新增图片"
              }}</span></span></span>
        </div>
        <div>
          <el-form
            ref="ruleForm"
            :model="form"
            label-width="80px"
            class="el-form"
            :rules="rules"
          >
            <el-form-item
              label="图片位置"
              prop="type"
            >
              <el-select
                v-model="form.type"
                placeholder="请选择图片位置"
                :disabled="this.$route.query.id?true:false"
              >
                <el-option
                  label="首页banner"
                  :value="1"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="图片名称"
              prop="name"
            >
              <el-input
                v-model="form.name"
                :disabled="this.$route.query.id?true:false"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="上传图片"
              prop="originName"
            >
              <div class="upload-img">
                <el-input
                  v-model="form.originName"
                  class="img-name"
                ></el-input>
                <el-upload
                  class="avatar-uploader"
                  action=""
                  accept=".jpg, .jpeg, .png"
                  :before-upload="beforeAvatarUpload"
                  :http-request="submitUpload"
                  :file-list="fileList"
                  :show-file-list="false"
                >
                  <el-button type="primary">上传</el-button>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="图片预览">
              <div class="pre-view">
                <img
                  :src="form.preview"
                  width="250px"
                  height="250px"
                  v-if="form.preview"
                />
              </div>
            </el-form-item>
            <el-form-item
              label="跳转地址"
              prop="redirectUri"
            >
              <el-input v-model="form.redirectUri"></el-input>
            </el-form-item>
            <el-form-item
              label="图片排序"
              prop="sequence"
            >
              <el-input v-model="form.sequence"></el-input>
            </el-form-item>
            <el-form-item
              label="状态"
              prop="enabled"
            >
              <el-select
                v-model="form.enabled"
                placeholder="请选择状态"
              >
                <el-option
                  label="启用"
                  :value="true"
                ></el-option>
                <el-option
                  label="停用"
                  :value="false"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="bottom-button"
          >
            <el-button
              @click="close"
              class="cancel"
            >取 消</el-button>
            <el-button
              type="primary"
              @click="onSubmit('ruleForm')"
              class="save"
              :loading="submitLoading"
            >保 存</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  props: ["id", "refs", "quillContent"],
  data () {
    return {
      form: {
        position: "文章位置",
        enabled: "",
        name: "",
        redirectUri: "",
        type: "",
        url: "",
        sequence: "",
        preview: "",
        originName: "",
      },
      fileList: [],
      submitLoading: false,
      rules: {
        type: [
          { required: true, message: "请选择图片位置", trigger: "change" },
        ],
        name: [
          {
            required: true,
            message: "请输入图片名称",
            trigger: ["blur", "change"],
          },
          { max: 20, message: "最长为20个字符", trigger: "blur" },
        ],
        originName: [
          {
            required: true,
            message: "请上传图片",
            trigger: ["blur", "change"],
          },
        ],
        redirectUri: [
          {
            required: true,
            message: "请输入跳转地址",
            trigger: ["blur", "change"],
          },
          { max: 100, message: "最长为100个字符", trigger: "blur" },
        ],
        sequence: [
          {
            pattern: /^\d+$|^\d+[.]?\d+$/,
            message: "排序只能为数字",
            trigger: ["blur", "change"],
          },
        ],
        enabled: [
          {
            required: true,
            message: "请选择状态",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created () {
    if (this.$route.query.id) {
      this.getImgDetail(this.$route.query.id);
    }
  },
  mounted () { },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.$route.query.id) {
            const conditions = {
              type: this.form.type ? Number(this.form.type) : "",
              name: this.form.name,
              url: this.form.preview,
              redirectUri: this.form.redirectUri,
              enabled: this.form.enabled,
              id: this.$route.query.id,
              sequence: this.form.sequence ? Number(this.form.sequence) : "",
            };
            const result = await this.API.bussiness.editPicture(conditions);
            if (result.success === true) {
              this.$message({
                message: "编辑成功",
                type: "success",
              });

              this.close();
            } else {
              this.submitLoading = false;
            }
          } else {
            const conditions = {
              type: this.form.type ? Number(this.form.type) : "",
              name: this.form.name,
              url: this.form.preview,
              redirectUri: this.form.redirectUri,
              sequence: this.form.sequence ? Number(this.form.sequence) : "",
              enabled: this.form.enabled ? true : false,
            };
            const result = await this.API.bussiness.addPicture(conditions);
            if (result.success === true) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.close();
            } else {
              this.submitLoading = false;
            }
          }
        }
      });
    },
    async submitUpload () {
      try {
        let config = {
          timeout: 20000,
          headers: {
            "Content-Type": "multipart/form-data", //设置headers
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("accessToken"))["access_token"],
          },
        };
        const formData = new FormData();
        formData.append("file", this.fileList[this.fileList.length - 1]);
        const res = await axios.post(
          "/ecosystem-admin/file/upload",
          formData,
          config
        );
        if (res.data.success == true) {
          this.form.preview = res.data.entity;
        }
      } catch (e) {
        this.$message.warning("报错了");
      }
    },
    // 判断文件类型
    beforeAvatarUpload (file) {
      let types = ["image/jpeg", "image/jpg", "image/png"];
      const isImage = types.includes(file.type);
      if (!isImage || file.size / 1024 / 1024 > 5) {
        this.$message.error("只能上传小于5M的图片!");
        return false
      }
      else {
        this.form.originName = file.name;
        this.fileList.push(file);
      }
    },
    close () {
      this.$router.push({ path: "/contentManage/imageManage" });
    },
    async getImgDetail (id) {
      const result = await this.API.bussiness.getImgDetail({}, id);
      if (result.success === true) {
        this.form = {
          enabled: result.entity.enabled, // 启用/禁用
          name: result.entity.name,
          redirectUri: result.entity.redirectUri,
          type: result.entity.type,
          sequence: result.entity.sequence,
          preview: result.entity.url,
          originName: result.entity.url ? result.entity.url.split("/")[5] : "",
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.add-container {
  height: 100%;
}
.box-card {
  width: 100%;
  height: 100%;
}
.el-form {
  width: 40%;
}
.el-form-item {
  // width: 700px;
}
.upload-img {
  display: flex;
  .img-name {
    width: 500px;
    margin-right: 20px;
  }
  .pre-view {
    width: 200px;
    height: 200px;
  }
}
.bottom-button {
  margin-left: 80px;
  .cancel {
    margin-right: 80px;
  }
}
</style>

