<template>
  <textDialog
    class="add-dialog"
    :value="innerVisible"
    @close="close"
    widthSet='800px'
    :title='dialogText'
    :footerShow='footerShow'
    :btnLoading='btnLoading'
    :special="true"
    @btnSave='btnSave'
  >
    <el-form
      v-loading="diaLoading" :model="form" ref="form" label-width="100px" :rules="modify?editRules:rules" class="clearfix">
      <el-col :span="8">
        <el-form-item prop="username" label="工号">
          <el-input type="text" placeholder="请输入工号" v-model="form.username"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="telephone" label="手机号">
          <el-input type="text"  maxlength="11" placeholder="请输入手机号" v-model="form.telephone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="nickname" label="真实姓名">
          <el-input type="text" placeholder="请输入联系人" v-model="form.nickname"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" v-if="!modify">
        <el-form-item prop="password" label="登录密码">
          <el-input type="text" placeholder="请输入登录密码" v-model="form.password"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" v-if="modify">
        <el-form-item prop="password" label="登录密码">
          <el-input type="text" placeholder="请输入要修改的密码" v-model="form.password"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="enabled" label="状态">
          <el-select v-model="form.enabled" filterable placeholder="请选择">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="userOrgList" label="所属组织">
          <el-cascader
            collapse-tags
            filterable
            clearable
            :props="cascaderProps"
            v-model="form.userOrgList"
            :options="deptOptions" style="width: 100%" @change="handleChangeOrg"></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="所属项目" prop="appIds">
          <el-select v-model="form.appIds" clearable multiple placeholder="请选择" @change="$forceUpdate()">
            <el-option
              v-for="item in projectList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="description" label="备注">
          <el-input type="textarea" :rows="1" resize="none" placeholder="请输入备注" v-model="form.description"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </textDialog>
</template>

<script>
    import textDialog from "@components/textDialog"
    import {userRules,userEditRules} from '@utils/rules'
    import {stateOptions, typeOptions} from "@config/options"
    import {mapState} from 'vuex'

    export default {
        name: "userAdd",
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
                editRules: {...userEditRules},
                footerShow: '保存',
                handleLoadFlag: false,
                projectList: [],
            }
        },
        watch: {
            innerVisible: {
                handler(val) {
                    if (val) {
                        this.deptOptions = []
                        this.projectList = []
                        this.getProject()
                        this.getDept()
                    }
                },
                immediate: true
            },
            form: {
                handler(val) {
                    if (val) {
                        if (this.modify) {
                            if (this.form.id) {
                                let arr = []
                                this.form.appIds = []
                                this.form.orgInfos.map(item => {
                                    if(item.crumbs){
                                        let newArr = item.crumbs.split('|')
                                        newArr.push(item.id.toString())
                                        arr.push(newArr)
                                    }else{
                                        let newArr =[]
                                        newArr.push(item.id.toString())
                                        arr.push(newArr)
                                    }
                                })
                                this.form.appInfos.map(item => {
                                    this.form.appIds.push(item.appId)
                                })
                                this.$set(this.form,'userOrgList',arr)
                                this.$forceUpdate()
                            }
                        } else{
                            this.$set(this.form,'password','123456')
                        }
                    }
                },
                immediate: true
            },
        },
        computed: {
            dialogText() {
                return this.modify ? '编辑用户' : '新增用户'
            },
            paramObj() {
                let {appIds, enabled, id, description, nickname, password, telephone, userOrgList, username} = this.form;
                let arr = []
                for (let i = 0; i < userOrgList.length; i++) {
                    arr.push(userOrgList[i][(userOrgList[i].length) - 1])
                }
                let params = this.modify ? {
                    userType: 1,
                    appIds,
                    enabled,
                    id,
                    description,
                    nickname,
                    password:password==''?undefined:password,
                    telephone,
                    deptList: arr,
                    username
                } : {userType: 1, appIds, enabled, description, nickname, password, telephone, deptList: arr, username}
                return params
            },
            ...mapState({
                userSetting: state => state.userSetting
            })
        },
        methods: {
            handleChangeOrg(val) {
              this.$forceUpdate()
            },
            close() {
                this.$emit('close', false) //关闭
                this.$emit('input', {})
                this.$emit('modifyClose')
                this.$refs['form'].resetFields();
            },
            async getProject() {
                const res = await this.API.bussiness.getProject();
                if (res.code == '200') {
                    this.projectList = res.data
                }
            },

            async getDept() {
                this.diaLoading = true
                const res = await this.API.bussiness.getOgrInfoTree();
                if (res.code == '200') {
                    let arr = this.getTreeData(res.data)
                    this.deptOptions = arr
                    this.diaLoading = false
                }
            },
            getTreeData(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].children.length < 1) {
                        // children若为空数组，则将children设为undefined
                        data[i].children = undefined;
                    } else {
                        // children若不为空数组，则继续 递归调用 本方法
                        this.getTreeData(data[i].children);
                    }
                }
                return data;
            },
            //保存
            btnSave() {
                console.log(this.form)
                this.btnLoading = true;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.handleUser()
                        return;
                    } else {
                        this.btnLoading = false;
                        return false;
                    }
                });

            },
            async handleUser() {
                let api = this.modify ? this.API.bussiness.updateUser : this.API.bussiness.createUser
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
</style>
<style lang="scss">
  @import "~@assets/css/addDialog.scss";
</style>
