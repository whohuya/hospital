<template>
    <textDialog
            class="add-dialog"
            :value="innerVisible"
            @close="close"
            widthSet='550px'
            :title='dialogText'
            :footerShow='footerShow'
            :btnLoading='btnLoading'
            :special="true"
            @btnSave='btnSave'
    >
        <el-form :model="form" ref="form" label-width="100px" :rules="rules" class="clearfix">
            <el-row>
                <el-col :span="24">
                    <el-form-item prop="name" label="APP名称" v-if='this.modify?false:true'>
                        <el-input type="text" placeholder="请输入APP名称" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item prop="version" label="版本号">
                        <el-input type="text" placeholder="请输入版本号" v-model.number="form.version" maxlength="9"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                        <div class="upload-star" >*</div>
                        <el-form-item  label="APK上传" prop="urlName" class="change-label-calss" >
                     <div> 
                        <div class="upload-apk">
                            <el-input v-model="form.urlName" placeholder="请上传apk" class="apk-name" ></el-input>
                            <el-upload
                            class="avatar-uploader"
                            action="#"
                            accept=".apk"
                            :on-change="handleChange"
                            :before-upload="beforeAvatarUpload"
                            :http-request='submitUpload'
                            :file-list="fileList"
                            :show-file-list="false"
                            
                            >
                            <el-button type="primary">上传</el-button>
                            </el-upload>
                        </div>
                        <div
                                style="color: #F56C6C;height:10px"
                                v-if="form.urlName == '' && isShow == true"
                            >
                                请上传apk
                        </div>
                    </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12"> 
                    <el-form-item prop="code" label="编码Code" v-if='this.modify?false:true'>
                        <el-input type="text" placeholder="请输入编码Code" v-model="form.code"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item prop="description" label="发版内容">
                        <el-input type="text" placeholder="请输入发版内容" v-model="form.description"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item prop="resource" label="发版时间">
                        <el-radio-group v-model="form.resource">
                        <el-radio label="实时" @change="nowTime"></el-radio>
                            <el-radio label="定时" @change="timing"></el-radio>
                            <el-date-picker
                            type="datetime"
                            v-if="!isSelect"
                            placeholder="选择时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="form.releaseTime"
                            @change='selectTime'
                            :picker-options="pickerOptions"
                            ></el-date-picker>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </textDialog>
</template>

<script>
    import textDialog from "@components/textDialog"
    import {appAddRules} from '@utils/rules'
    // import {stateOptions,typeOptions} from "@config/options"
    import upload from "@components/uploadComponent"
    import {mapState} from 'vuex'

    export default {
        name: "appAdd",
        components:{
            textDialog,upload
        },
        model: {
            prop: "form",
            event: "input"
        },
        props:{
            innerVisible: Boolean,
            modify:Boolean,
            form:Object,
        },
        data() {
            return{
                valueSet:false,
                btnLoading:false,
                rules:{...appAddRules},
                footerShow:'保存',
                handleLoadFlag:false,
                keyAdd:0,
                resource: "", //单选按钮
                releaseTime:'',
                isSelect:true,
                isShow:false,
                url:'',
                urlName:'',
                fileList: [],
                pickerOptions: {
                    // 限制发版时间不让选择今天以前的
                    disabledDate(time) {
                    return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
                    },
                },
            }
        },
        computed:{
            dialogText(){
                return this.modify?'APP版本升级':'新增App版本'
            },
            paramObj(){
                let {name,version,code,description,releaseTime,url,resource,id,fileList}=this.form;
                let params=this.modify?{
                    version:version?Number(version):'',
                    description,
                    releaseTime,
                    url,
                    resource,
                    fileList,
                    id}:{
                    name,
                    version:version?Number(version):'',
                    code,
                    description,
                    releaseTime,
                    resource,
                    fileList,
                    url}
                return params
            },
            ...mapState({
                appManageSetting:state=>state.appManageSetting
            })
        },
        methods: {
            close(){
                this.$emit('close',false) //关闭
                // location.reload()
                // this.$router.go(0)
                this.$emit('input',{})
                this.$emit('modifyClose')
                this.$refs['form'].resetFields();
            },
            //保存
            btnSave(){
                this.btnLoading=true;
                if (this.form.urlName == "") {
                    this.isShow = true;
                }
                this.$refs.form.validate((valid) => {
                    console.log('nnnnnnn',this.url)
                    if (valid) {
                        if(this.form.url==null){
                            this.$message({
                            message: "请上传正确的apk",
                            type: "fail",
                        });
                          this.btnLoading=false;
                          return false;
                        }else if(this.form.resource=='实时'){
                            this.form.releaseTime==''
                        }
                        this.handleGroup()   
                        return ;
                    } else {
                        this.btnLoading=false;
                        return false;
                    }
                });
            },
            nowTime() {
                console.log("1");
                this.isSelect=true
                this.paramObj.releaseTime=''
            },
            timing() {
                console.log("2");
                this.isSelect=false
                console.log(this.releaseTime)
            },
            selectTime(){
                console.log(this.releaseTime)
            },
            //添加||编辑
            async handleGroup(){
                let api=this.modify?this.API.bussiness.upgradeApp:this.API.bussiness.addApp
                const res=await api(this.paramObj);
                if (res.success==true){
                    this.keyAdd=this.appManageSetting;
                    this.keyAdd++;
                    this.$store.commit('appUpdate',this.keyAdd);
                    this.$emit('close',false)
                    this.$emit('input',{})
                    this.$emit('modifyClose')
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: '保存失败',
                        type: 'false'
                    });
                    this.close();
                }
                this.btnLoading=false;
            },
            async submitUpload () {
                try {
                    let config = {
                    timeout: 30000,
                    headers: {
                        "Content-Type": "multipart/form-data",//设置headers
                        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('accessToken'))['access_token']
                    }
                    };
                    const formData = new FormData()
                    formData.append('file', this.fileList[1])
                    const res = await axios.post('/ecosystem-admin/file/upload', formData, config)
                    
                    if (res.data.success == true) {
                        this.form.url = res.data.entity
                        console.log(this.form.url)
                    }
                } catch (e) {
                    this.$message.warning("报错了")
                    console.log(e)
                }
            },
            // 判断文件类型
            beforeAvatarUpload(file) {
                console.log(file, 'filefilefilefilefile')
                let fileName = file.name
                let pos = fileName.lastIndexOf('.')
                let lastName = fileName.substring(pos, fileName.length)
                if (lastName.toLowerCase() !== '.apk') {
                    this.$message.error('文件必须为.apk类型')
                    // this.resetCompressData()
                    return false
                }else {
                    this.form.urlName = file.name
                    console.log('点击上传',this.form.urlName)
                }
                // 限制上传文件的大小
                const isLt =
                file.size / 1024 / 1024 / 80 <= 1
                if (!isLt) {
                    this.$message.error('上传文件不得大于80MB!')
                    return isLt
                }
                this.fileList.push(file)
            },
            // 文件值改变时触发 change事件
            handleChange(files, fileList) {
                if (fileList.length > 0) {
                    this.fileList = [fileList[fileList.length - 1]] 
                }else{
                    this.fileList = fileList[0]
                }
                console.log('handleChange',fileList)
            }
            // 上传成功钩子函数
                // upSuccess(response, file, fileList) {
                    
                //     // this.fileList.push(file)
                //     this.$refs.file_Rule.clearValidate(); 
                //     // this.$refs.form.validateField('fileList')
                // }
        },
        mounted() {

        }
    }
</script>
<style scoped lang="scss">
    .clearfix{
        .el-select{
            width: 100%;
        }
    }
    .upload-apk{
        display: flex;
        .apk-name{
            margin-right: 20px;
        }
    }
    .upload-star{
        position: absolute;
        top: 14px;
        color: #F56C6C;
        margin-right: 10px;
    }
    // ::v-deep .el-form-item__label{
    //     // padding-left: 8px !important;
    //     color: #F56C6C !important;
    // }
    .change-label-calss /deep/ .el-form-item__label{
        padding-left: 8px !important;
    }


</style>
<style lang="scss">
    @import "~@assets/css/addDialog.scss";
</style>
