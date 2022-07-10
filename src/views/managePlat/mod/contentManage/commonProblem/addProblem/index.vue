<template>
  <div class="page-container">
    <div class="add-container">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>{{this.$route.query.id?'编辑常见问题':'新增常见问题'}}</span>

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
              label="问题名称"
              prop="name"
            >
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item
              label="问题排序"
              prop="sequence"
            >
              <el-input v-model="form.sequence"></el-input>
            </el-form-item>
            <el-form-item
              label="跳转地址"
              prop="redirectUri"
            >
              <el-input v-model="form.redirectUri"></el-input>
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
            >保 存</el-button>
          </div>
        </div>

      </el-card>

    </div>
  </div>
</template>
<script>
export default {

  components: {
  },
  props: ['id', 'refs', 'quillContent'],
  data () {
    return {
      form: {
        name: '',//问题名称
        // content: '文章内容',
        sequence: '',//问题排序
        redirectUri: '',//跳转地址
        enabled: '',//状态
      },
      submitLoading: false,
      rules: {
        name: [
          { required: true, message: '请输入问题名称', trigger: ['blur', 'change'] },
          { max: 50, message: '最长为50个字符', trigger: 'blur' }
        ],
        redirectUri: [
          { required: true, message: '请输入跳转地址', trigger: ['blur', 'change'] },
          { max: 100, message: '最长为100个字符', trigger: ['blur', 'change'] }
        ],
        sequence: [
          { pattern: /^\d+$|^\d+[.]?\d+$/, message: '排序只能为数字', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '请选择状态', trigger: ['blur', 'change'] },

        ],
      }

    }
  },
  created () {
    if (this.$route.query.id) {
      this.getProblemDetail(this.$route.query.id)
    }
  },
  mounted () {


  },
  methods: {
    onSubmit (formName) {

      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          if (this.$route.query.id) {
            const conditions = { ...this.form, id: this.$route.query.id }
            const result = await this.API.bussiness.editProblem(conditions);
            if (result.success === true) {
              this.$message({
                message: "编辑成功",
                type: "success",
              });

              this.close()
            } else {
              this.submitLoading = false
            }
          } else {
            const conditions = { ...this.form }
            const result = await this.API.bussiness.addProblem(conditions);
            if (result.success === true) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.close()
            } else {
              this.submitLoading = false
            }
          }
        }

      })
    },
    close () {
      this.$router.push({ path: '/contentManage/problemManage', })
    },
    async getProblemDetail (id) {
      const result = await this.API.bussiness.getProblemDetail({}, id);
      if (result.success === true) {
        this.form = {
          name: result.entity.name,//问题名称
          sequence: result.entity.sequence,//问题排序
          redirectUri: result.entity.redirectUri,//跳转地址
          enabled: result.entity.enabled,//状态
        }
      }
    }
  },



}





</script>
<style lang="scss" scoped >
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
.bottom-button {
  margin-left: 80px;
  .cancel {
    margin-right: 80px;
  }
}
</style>

