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
                <el-form-item prop="name" label="厂区名称">
                    <el-input type="text" placeholder="请输入厂区名称" v-model="form.name"></el-input>
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
            <search-selector
                    :column="12"
                    label="所属组织"
                    class='label-inline'
                    prop='orgId'
                    v-model="form.orgId"
                    :options=companyOptions
                    :multiple='false'
            />
        </el-form>
    </textDialog>
</template>

<script>
    import textDialog from "@components/textDialog"
    import {factoryAddRules} from '@utils/rules'
    import {stateOptions} from "@config/options"
    import searchSelector from "@/components/searchSelector";
    import {mapState} from 'vuex'
    export default {
        name: "factoryAdd",
        components:{
            textDialog,searchSelector
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
                companyOptions:[],
                options:[],
                valueSet:false,
                btnLoading:false,
                rules:{...factoryAddRules},
                footerShow:'保存',
                handleLoadFlag:false,
                keyAdd:0
            }
        },
        watch:{
            innerVisible:{
                handler(val){
                    if (val){
                        this.companyOptions=[]
                        this.getCompany()
                    }
                },
                immediate:true
            }

        },
        computed:{
            dialogText(){
                return this.modify?'编辑厂区':'新增厂区'
            },
            paramObj(){
                let {name,address,contactPerson,contactNumber,enabled,id,orgId,orgType}=this.form;
                let params=this.modify?{name,address,contactPerson,contactNumber,enabled,orgId,id,orgType}:{name,address,contactPerson,contactNumber,enabled,orgId,orgType}
                return params
            },
            ...mapState({
                factoryManageSetting:state=>state.factoryManageSetting
            })
        },
        methods: {
            async getCompany(){
                const res=await this.API.bussiness.companyList({orgType:3})
                if (res.code=='200'){
                    res.data.map(ele=>{
                        this.companyOptions.push({
                            label:ele.name,
                            value:ele.id
                        })
                    })
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
                        this.handleOrg()
                        return ;
                    } else {
                        this.btnLoading=false;
                        return false;
                    }
                });

            },
            //添加||编辑
            async handleOrg(){
                let api=this.modify?this.API.bussiness.organizeEdit:this.API.bussiness.organizeCreate
                const res=await api(this.paramObj);
                if (res.code=='200'){
                    this.keyAdd=this.organizeManageSetting;
                    this.keyAdd++;
                    this.$store.commit('orgUpdate',this.keyAdd);
                    this.$emit('close',false)
                    this.$emit('input',{})
                    this.$emit('modifyClose')
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                }
                this.btnLoading=false;
            }
        },
        mounted() {
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
