<template>
  <textDialog
    class="add-dialog"
    :value="innerVisible"
    @close="close"
    widthSet='750px'
    :title='dialogText'
    :footerShow='footerShow'
    :btnLoading='btnLoading'
    :special="true"
    @btnSave='btnSave'
  >
    <div class="role-content">
      <el-row>
        <el-col :span="24">
          <el-select v-model="projectValue" filterable placeholder="请选择项目" @change="handleGetRoleAllList">
            <el-option
              v-for="item in form.appInfos"
              :key="item.appId"
              :label="item.appName"
              :value="item.appId"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 12px">
        <el-col :span="24">
          <el-transfer
            :props="transferType.props"
            v-model="transferValue" :data="transferData" :titles="transferType.title"></el-transfer>
        </el-col>
      </el-row>
    </div>
  </textDialog>
</template>

<script>
    import textDialog from "@components/textDialog"
    import {userRules} from '@utils/rules'
    import {stateOptions, typeOptions} from "@config/options"
    import {mapState} from 'vuex'

    export default {
        name: "userRole",
        components: {
            textDialog
        },
        model: {
            prop: "form",
            event: "input"
        },
        props: {
            innerVisible: Boolean,
            modify: Boolean,
            form: Object,
        },
        data() {
            return {
                transferType: {
                    props: {
                        key: 'id',
                        label: 'name'
                    },
                    title: ['所有角色', '已选角色']
                },
                projectValue: '',
                transferValue: [],
                transferData: [],
                loading: false,
                diaLoading: false,
                cascaderProps: {
                    multiple: true,
                    value: 'id',
                    label: 'name',
                },
                stateOptions,
                typeOptions,
                deptOptions: [],
                options: [],
                valueSet: false,
                btnLoading: false,
                rules: {...userRules},
                footerShow: '保存',
                handleLoadFlag: false,
                projectList: [],
            }
        },
        watch: {
            innerVisible: {
                handler(val) {
                    if (val) {
                        this.projectList = []
                        this.getProject()
                    }
                },
                immediate: true
            },
            form: {
                handler(val) {
                    if (val) {

                    }
                },
                immediate: true
            },
        },
        computed: {
            dialogText() {
                return '角色授权'
            },
            paramObj() {
                let {id} = this.form
                let param = {userId: id, appId: this.projectValue, roleIds: this.transferValue}
                return param
            },
            ...mapState({
                userSetting: state => state.userSetting
            })
        },
        methods: {
            handleGetRoleAllList(row) {
                this.transferValue = []
                this.transferData = []
                this.handleGetChoseRoleList(row)
                this.handleGetRoleList(row)

            },
            async handleGetRoleList(row) {
                const res = await this.API.bussiness.getRoleListByAppId({}, row);
                if (res.code == '200') {
                    this.transferData = res.data

                }
            },
            async handleGetChoseRoleList(row) {
                console.log(this.form)
                const res = await this.API.bussiness.getAuthorizedRole({}, row + '/' + this.form.id);
                if (res.code == '200') {
                    this.transferValue = res.data.map(item => {
                        return item.id
                    })
                }
            },
            close() {
                this.$emit('close', false) //关闭
                this.$emit('input', {})
                this.$emit('modifyClose')
                this.projectValue = ''
                this.transferValue = []
                this.transferData = []
            },
            async getProject() {
                const res = await this.API.bussiness.getProject();
                if (res.code == '200') {
                    this.projectList = res.data
                }
            },

            //保存
            btnSave() {
                if (this.projectValue == '' || this.projectValue == null) {
                    this.$message({
                        message: '请选择项目',
                        type: 'error'
                    });
                    return;
                }
                this.btnLoading = true;
                this.handleUser()
            },
            async handleUser() {
                console.log(this.paramObj)
                let api = this.API.bussiness.roleAuthorize
                const res = await api(this.paramObj);
                if (res.code == '200') {
                    this.keyAdd = this.userSetting;
                    this.keyAdd++;
                    this.$store.commit('userSet', this.keyAdd);
                    this.$emit('close', false)
                    this.$emit('input', {})
                    this.$emit('modifyClose')
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                }
                this.btnLoading = false;
            },
        },
        mounted() {
        }
    }
</script>
<style scoped lang="scss">
  .clearfix {
    .el-select {
      width: 100%;
    }
  }

  .add-input {
    font-size: 24px;
    /*position: absolute;*/
    /*right: 10px;*/
    /*top: 290px;*/
  }

  .role-content {
    width: 90%;
    margin: 0 auto;

    /deep/ .el-transfer__buttons span i {
      color: white;

    }
  }
</style>
<style lang="scss">
  @import "~@assets/css/addDialog.scss";
</style>
