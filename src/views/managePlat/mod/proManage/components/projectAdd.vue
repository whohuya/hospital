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
                <!--            <el-col :span="12">-->
                <!--                <el-form-item prop="code" label="项目编号">-->
                <!--                    <el-input type="text" placeholder="请输入项目编号" v-model="form.code" :disabled="modify"></el-input>-->
                <!--                </el-form-item>-->
                <!--            </el-col>-->
                <el-col :span="24">
                    <el-form-item prop="name" label="项目名称">
                        <el-input type="text" placeholder="请输入项目名称" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="adminUser" label="超管姓名" >
                        <el-select v-model="form.adminUser"
                                   filterable
                                   remote
                                   placeholder="请选择"
                                   :remote-method="hangdleGetUser"
                                   @change="handleChoseName"
                                   :loading="selectLoading">
                            <el-option
                                    v-for="item in authorNameOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="telePhone" label="超管手机号">
                        <el-input type="text" v-model="form.adminUserTelephone" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="serviceId" label="service-id">
                        <el-input type="text" v-model="form.serviceId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="description" label="备注">
                        <el-input type="textarea"  placeholder="请输入备注" v-model="form.description"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </textDialog>
</template>

<script>
    import textDialog from "@components/textDialog"
    import {projectAddRules} from '@utils/rules'
    import {stateOptions} from "@config/options"
    import {mapState} from 'vuex'

    export default {
        name: "projectAdd",
        components:{
            textDialog
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
                selectLoading:false,
                stateOptions,
                authorNameOptions:[],
                factoryOptions:[],
                options:[],
                valueSet:false,
                btnLoading:false,
                rules:{...projectAddRules},
                footerShow:'保存',
                handleLoadFlag:false,
            }
        },
        computed:{
            dialogText(){
                return this.modify?'修改项目':'新增项目'
            },
            paramObj(){
                let {name,adminUser,id,description,adminUserTelephone,serviceId}=this.form;
                if(this.modify){
                    this.authorNameOptions.forEach(ele=>{
                        if (ele.name==adminUser){
                            adminUser=ele.id;
                        }
                    })
                }
                let params=this.modify?{name,adminUser,adminUserTelephone,id,description,serviceId}:{name,adminUser,description,serviceId}
                return params
            },
            ...mapState({
                projectManageSetting:state=>state.projectManageSetting
            })
        },
        methods: {
            handleChoseName(val){
                this.authorNameOptions.forEach(ele=>{
                    if (ele.id==val){
                        this.form.adminUserTelephone=ele.telephone;
                    }
                })
            },
            async handleGetUserId(name){
                let id
                const result =await  this.API.bussiness.getadmainUser({likeName:name});
                if (result.code == '200') {
                    id=result.data[0].id
                }
                return id
            },
            async hangdleGetUser(query){
                this.selectLoading=true
                if (query==''||this.modify==true) {
                    const res = await this.API.bussiness.getadmainUser();
                    if (res.code == '200') {
                        this.authorNameOptions = res.data
                        this.selectLoading = false
                    }
                }
                else  if (query !== '') {
                    const result = await this.API.bussiness.getadmainUser({likeName: query});
                    if (result.code == '200') {
                        this.authorNameOptions = result.data
                        this.selectLoading = false
                    }
                }
            },
            close(){
                this.$emit('close',false) //关闭
                this.$emit('input',{})
                this.$emit('modifyClose')
                this.$refs['form'].resetFields();
            },
            //保存
            btnSave(){
                this.btnLoading=true;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.handleProject()
                        return ;
                    } else {
                        this.btnLoading=false;
                        return false;
                    }
                });

            },
            async handleProject(){
                let api=this.modify?this.API.bussiness.projectEdit:this.API.bussiness.projectCreate
                const res=this.modify?await api(this.paramObj,this.paramObj.id):await api(this.paramObj);
                if (res.code=='200'){
                    this.keyAdd=this.projectManageSetting;
                    this.keyAdd++;
                    this.$store.commit('projectUpdate',this.keyAdd);
                    this.$emit('close',false)
                    this.$emit('input',{})
                    this.$emit('modifyClose')
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                }
                this.btnLoading=false;
            },
        },
        mounted() {
            this.hangdleGetUser(this.form.adminUser)
        },
        created() {
        }
    }
</script>
<style scoped lang="scss">
    .clearfix{
        .el-select{
            width: 100%;
        }
    }
</style>
<style lang="scss">
    @import "~@assets/css/addDialog.scss";
</style>
