<template>
  <div class="page-container">
    <div class="add-container">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>
            <span>{{
              this.$route.query.id ? "修改文章" : "新增文章"
            }}</span></span>
        </div>
        <div class="content-container">
          <el-form
            ref="ruleForm"
            :model="form"
            label-width="80px"
            class="el-form"
            :rules="rules"
          >
            <el-form-item
              label="文章位置"
              prop="type"
            >
              <el-select
                v-model="form.type"
                placeholder="请选择位置"
                :disabled="this.$route.query.id?true:false"
              >
                <el-option
                  label="banner详情页"
                  :value="1"
                ></el-option>
                <el-option
                  label="常见问题答案"
                  :value="2"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="文章名称"
              prop="title"
            >
              <el-input
                v-model="form.title"
                :disabled="this.$route.query.id?true:false"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="文章内容"
              prop="content"
            >
              <div>
                <tinymce
                  v-model="form.content"
                  :height="260"
                />
              </div>
              <div
                style="color: #F56C6C;height:10px"
                v-if="form.content == '' && isShow == true"
              >
                请输入文章内容
              </div>
            </el-form-item>
            <el-form-item
              label="文章排序"
              prop="sequence"
            >
              <el-input v-model="form.sequence"></el-input>
            </el-form-item>
            <el-form-item
              label="文章来源"
              prop="source"
            >
              <el-input v-model="form.source"></el-input>
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
              :loading="submitLoading"
              class="save"
            >保 存</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import Tinymce from "../../../../../../components/Tinymce/";
export default {
  components: {
    Tinymce,
  },
  props: ["id", "refs", "quillContent"],
  data () {
    return {
      isShow: false,
      form: {
        content: "", //正文
        enabled: "", // 启用/禁用
        redirectUri: "", //跳转地址
        title: "", //标题
        type: "", //文章类型 1：banner 2:常见问题答案
        sequence: "", //排序序号
        source: "", //文章来源
      },
      submitLoading: false,
      rules: {
        type: [
          {
            required: true,
            message: "请输入文章位置",
            trigger: ["blur", "change"],
          },
        ],
        title: [
          {
            required: true,
            message: "请输入文章名字",
            trigger: ["blur", "change"],
          },
          { max: 50, message: "最长为50个字符", trigger: "blur" },
        ],
        content: [
          { required: true, message: ' ' },
        ],
        source: [
          { max: 50, message: "最长为50个字符", trigger: ["blur", "change"] },
        ],
        sequence: [
          {
            pattern: /^\d+$|^\d+[.]?\d+$/,
            message: "排序只能为数字",
            trigger: "blur",
          },
        ],
        enabled: [
          {
            required: true,
            message: "请输入文章状态",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created () {
    if (this.$route.query.id) {
      this.getArticleDetail(this.$route.query.id);
    }
  },
  // mounted () {
  //   console.log(this.$route.query.id)
  //   if (this.$route.query.id) {
  //     this.getArticleDetail(this.$route.query.id)
  //   }

  // },
  methods: {
    onSubmit (formName) {
      if (this.form.content == "") {
        this.isShow = true;
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.$route.query.id) {
            const conditions = { ...this.form, id: this.$route.query.id };
            const result = await this.API.bussiness.editArticle(conditions);
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
            const conditions = { ...this.form };
            const result = await this.API.bussiness.addArticle(conditions);
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

    close () {
      this.$router.push({ path: "/contentManage/articleManage" });
    },
    async getArticleDetail (id) {
      const result = await this.API.bussiness.getArticleDetail({}, id);
      if (result.success === true) {
        this.form = {
          content: result.entity.content, //正文
          enabled: result.entity.enabled, // 启用/禁用
          redirectUri: result.entity.redirectUri, //跳转地址
          title: result.entity.title, //标题
          type: result.entity.type, //文章类型 1：banner 2:常见问题答案
          sequence: result.entity.sequence, //排序序号
          source: result.entity.source, //文章来源
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.add-container {
  height: 100%;
  overflow-y: auto;
  .content-container {
    height: 100%;
    overflow-y: auto;
  }
  .el-card__body {
    height: 95%;
    overflow-y: auto;
  }
  .el-form {
    width: 60%;
  }
  .bottom-button {
    margin-left: 80px;
    .cancel {
      margin-right: 80px;
    }
  }
}
</style>

