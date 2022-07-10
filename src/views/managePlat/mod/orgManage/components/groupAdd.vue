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
            <el-col :span="12">
                <el-form-item prop="name" label="集团名称">
                    <el-input type="text" placeholder="请输入集团名称" v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="address" label="地址">
                    <el-input type="text" placeholder="请输入地址" v-model="form.address"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="contactPerson" label="联系人">
                    <el-input type="text" placeholder="请输入联系人" v-model="form.contactPerson"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="contactNumber" label="联系电话">
                    <el-input type="text" placeholder="请输入联系电话" v-model="form.contactNumber"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
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
            <el-col :span="12">
                <el-form-item prop="type" label="集团性质" class="label-inline">
                    <el-select v-model="form.type" filterable placeholder="请选择">
                        <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-form>
    </textDialog>
</template>

<script>
    import textDialog from "@components/textDialog"
    import {groupAddRules} from '@utils/rules'
    import {stateOptions,typeOptions} from "@config/options"
    import {mapState} from 'vuex'

    export default {
        name: "groupAdd",
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
                stateOptions,
                typeOptions,
                valueSet:false,
                btnLoading:false,
                rules:{...groupAddRules},
                footerShow:'保存',
                handleLoadFlag:false,
                keyAdd:0
            }
        },
        computed:{
            dialogText(){
                return this.modify?'编辑集团':'新增集团'
            },
            paramObj(){
                let {name,address,contactPerson,contactNumber,enabled,type,orgType,id}=this.form;
                let params=this.modify?{name,address,contactPerson,contactNumber,enabled,type,orgType:1,id}:{name,address,contactPerson,contactNumber,orgType:1,enabled,type}
                return params
            },
            ...mapState({
                groupManageSetting:state=>state.groupManageSetting
            })
        },
        methods: {
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
                        this.handleGroup()
                        return ;
                    } else {
                        this.btnLoading=false;
                        return false;
                    }
                });

            },
            //添加||编辑
            async handleGroup(){
                let api=this.modify?this.API.bussiness.organizeEdit:this.API.bussiness.organizeCreate
                const res=await api(this.paramObj);
                if (res.code=='200'){
                    this.keyAdd=this.groupManageSetting;
                    this.keyAdd++;
                    this.$store.commit('groupUpdate',this.keyAdd);
                    this.$emit('close',false)
                    this.$emit('input',{})
                    this.$emit('modifyClose')
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                }
                // this.btnLoading=false;
            }
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
</style>
<style lang="scss">
    @import "~@assets/css/addDialog.scss";
</style>
