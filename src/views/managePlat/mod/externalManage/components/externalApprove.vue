<template>
  <div>
    <el-dialog
            width="800px"
            class='insid-user'
            :title='dialogText'
            :visible.sync="innerVisible"
            :before-close="close"
            :show-close='true'
            :close-on-click-modal='false'
            append-to-body
    >
        <el-form :model="form" ref="form" label-width="100px" class="clearfix">
            <el-tabs class="approveTabs" v-model="activeName">
                <div label="用户信息" name="first" v-if="form.typeState=='A01'">
                    <el-col :span="12">
                        <el-form-item prop="phone" label="手机号">
                            <el-input type="text" placeholder="手机号" v-model="form.phoneNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="code" label="用户名">
                            <el-input type="text" placeholder="" v-model="form.username" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="code" label='真实姓名'>
                            <el-input type="text" placeholder="" v-model="form.name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="code" label="身份证号">
                            <el-input type="text" placeholder="" v-model="form.idCardNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                  <el-col :span="24">
                    <el-form-item prop="code" label="审核结果" class="label-inline">
                      <div class="projectList">
                        <span>{{form.auditedResults}}</span>
                      </div>
                    </el-form-item>
                  </el-col>
                    <el-col :span="24">
                        <el-form-item prop="code" label="所属项目" class="label-inline">
                            <div class="projectList">
                                <span v-for="(item,index) in form.appInfoResponseList" :key="index">{{item.name}}</span>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item prop="img" label="图片" class="label-inline" style="height:200px;">
                            <div style="display: flex; justify-content: flex-start">
                            <div class="imageList">
                                <el-image class="showImg"
                                          fit="contain"
                                          :src="form.idCardPhotoFront"
                                          :preview-src-list="[form.idCardPhotoFront]">
                                </el-image>
                                <span>身份证正面</span>
                            </div>
                            <div class="imageList" style="margin-left: 12px">
                                <el-image class="showImg"
                                          fit="contain"
                                          :src="form.idCardPhotoReverse"
                                          :preview-src-list="[form.idCardPhotoReverse]">
                                </el-image>
                                <span>身份证反面</span>
                            </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </div>
                <div label="企业信息" name="second" v-if="form.typeState=='A02'">
                    <el-col :span="12">
                        <el-form-item prop="name" label="企业名称">
                            <el-input type="text" placeholder="请输入企业名称" v-model="form.companyName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="code" label="统一社会信用代码">
                            <el-input type="text" placeholder="" v-model="form.creditNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item prop="address" label="详细地址">
                            <el-input type="text" placeholder="" v-model="form.companyAddress" disabled></el-input>
                        </el-form-item>
                    </el-col>
                  <el-col :span="24">
                    <el-form-item prop="code" label="审核结果" class="label-inline">
                      <div class="projectList">
                        <span>{{form.auditedResults}}</span>
                      </div>
                    </el-form-item>
                  </el-col>
                    <el-col :span="24">
                        <el-form-item prop="img" label="营业执照" class="label-inline" style="height:200px;">
                            <el-image class="showImg"
                                      fit="contain"
                                      :src="form.businessLicense"
                                      :preview-src-list="[form.businessLicense]">
                            </el-image>
                        </el-form-item>
                    </el-col>
                </div>
            </el-tabs>
            <el-col :span="24" class="footerBtn">
                <el-button v-if="form.authenticationStatus=='1'" type="primary" class="approveBtn" @click="handleShowAudit('1')">审核通过</el-button>
                <el-button v-if="form.authenticationStatus=='1'" type="primary" class="approveBtn" @click="handleShowAudit('2')">审核拒绝</el-button>
                <el-button @click="close">返回</el-button>
            </el-col>
        </el-form>
    </el-dialog>
    <text-dialog
      @close="handleClose"
      :value="auditDialogVisible"
      widthSet='550px'
      :title="auditTitle"
      :footerShow='true'
      @btnSave="handleAudit"
    >
      <el-col :span="24" v-if="showReason">
        <el-form label-width="100px" >
          <el-form-item prop="reason" label="拒绝原因">
            <el-input  type="text" placeholder="" v-model="reason"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </text-dialog>
  </div>
</template>

<script>
    import {stateOptions} from "@config/options"
    import TextDialog from "../../../../../components/textDialog";
    import {mapState} from 'vuex'

    export default {
        name: "externalApprove",
        components: {
            TextDialog

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
                showReason:false,
                reason:'',
                auditTitle:'确认审核通过',
                auditDialogVisible:false,
                srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'],
                activeName: 'first',
                stateOptions,
                authorNameOptions: [],
                factoryOptions: [],
                options: [],
                valueSet: false,
                btnLoading: false,
                footerShow: '保存',
                handleLoadFlag: false,
                keyAdd:0,
            }
        },
        computed: {
            dialogText() {
                return   `外部用户管理-${this.form.typeState=='A01'?'用户信息':'企业信息'}`
            },
            ...mapState({
                externalManageSetting:state=>state.externalManageSetting
            }),
        },
        methods: {
            handleClose(){
                this.auditDialogVisible=false
                this.reason=''
                this.showReason=false
            },
            handleShowAudit(type){
                this.auditDialogVisible=true
               if(type=='1'){
                   this.auditTitle='确认审核通过'
                   this.showReason=false
               }else{
                   this.auditTitle='审核拒绝'
                   this.showReason=true
               }
            },
           async handleAudit(){
                let params={
                    id:this.form.id,
                    status:!this.showReason,
                    auditedResults:this.showReason?this.reason:'',
                }
               let api= this.form.typeState=='A01'?this.API.bussiness.personalAudit:this.API.bussiness.enterpriseAudit
               const res=await api(params);
                if(res.code==200){
                    this.$message({
                        message: '审核成功',
                        type: 'success'
                    });
                    this.keyAdd=this.externalManageSetting;
                    this.keyAdd++;
                    this.$store.commit('externalUpdate',this.keyAdd);
                    this.handleClose()
                    this.close()
                }
            },
            close() {
                this.$emit('close', false) //关闭
                this.$emit('input', {})
                this.$emit('modifyClose')
                this.activeName='first'
                this.$refs['form'].resetFields();
            },
            //保存
            btnSave() {
                this.btnLoading = true;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        console.log(this.paramObj.roleTypeList.indexOf(2))
                        this.btnLoading = false;
                        return;
                    } else {
                        this.btnLoading = false;
                        return false;
                    }
                });

            },
        },
        mounted() {
        },
        created() {
        }
    }
</script>
<style scoped lang="scss">
    .clearfix {
        .el-select {
            width: 100%;
        }
    }

    .showImg {
        margin-top: 12px;
        width: 190px;
        height: 120px;
    }

    .footerBtn {
        width: 100%;
        margin-bottom: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
.projectList{
    display: flex;
    flex-direction: column;
}
    .imageList{
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
<style lang="scss">

    .el-image-viewer__wrapper {
        z-index: 3000 !important;
    }

    .approveBtn.el-button {
        background: #005eeb;
        border-color: #005eeb;
        border-radius: 6px;
        box-shadow: 0px 5px 10px 0px rgba(0, 102, 255, 0.20);

        span {
            color: #fff;
        }
    }

    .approveTabs {
        .el-tabs__header .el-tabs__nav {
            display: flex;
            justify-content: center;
            align-items: center;
            float: none;
        }

        .el-tabs__item {
            font-size: 18px;
        }

        .el-tabs__active-bar {
            left: 38%;
        }
    }
  .insid-user{

    .el-col{
      padding: 0 20px;
      .el-form-item{
        margin-bottom: 10px;
        .el-form-item__label{
          float: none;
          color: #6D7278;
          font-size: 12px;
        }
        .el-form-item__content{
          margin-left: 0 !important;
          width: 100%;
          height: 36px;
          line-height: 36px;
          .el-input{
            input{
              color: #999999;
              background: #F7FAFB;
              font-size: 12px;
              border-radius: 7px;
              height: 36px;
            }
          }
        }
        &.label-inline{
          .el-form-item__label{
            float: left;
            text-align: left;
          }
          .el-form-item__content{
            margin-left: 100px;
            width: auto;
          }
        }
      }
    }

  }

</style>
