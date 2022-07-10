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
            <el-col :span="12">
                <el-form-item prop="name" label="组织名称">
                    <el-input type="text" placeholder="请输入组织名称" v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="address" label="地址">
                    <el-input type="text" placeholder="请输入地址" v-model="form.address"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
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
          </el-row>
          <el-row>
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
                    label="所属集团"
                    class='label-inline'
                    prop='groupId'
                    valueProp="id"
                    labelProp="name"
                    searchKey="id"
                    v-model="form.groupId"
                    :fn="getCompany"
                    initList
            />
          </el-row>
          <el-row>
            <search-selector
              :column="12"
              label="上级组织"
              class='label-inline'
              prop='orgId'
              valueProp="id"
              labelProp="name"
              searchKey="id"
              v-model="form.orgId"
              :options=orgList
            />
          </el-row>
        </el-form>
    </textDialog>
</template>

<script>
    import textDialog from "@components/textDialog"
    import {organizeAddRules} from '@utils/rules'
    import {stateOptions} from "@config/options"
    import searchSelector from "@/components/searchSelector";
    import {mapState} from 'vuex'
    import { getResult } from "@/config/interface";
    export default {
        name: "organizeAdd",
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
                orgList:[],
                stateOptions,
                companyOptions:[],
                valueSet:false,
                btnLoading:false,
                rules:{...organizeAddRules},
                footerShow:'保存',
                handleLoadFlag:false,
                keyAdd:0
            }
        },
        computed:{
            dialogText(){
                return this.modify?'编辑组织':'新增组织'
            },
            paramObj(){
                let {name,address,contactPerson,contactNumber,enabled,id,groupId,orgType,orgId}=this.form;
                let params=this.modify?{name,address,contactPerson,contactNumber,enabled,id,groupId,orgType:2,orgId:orgId==''?undefined:orgId}:{name,address,contactPerson,contactNumber,enabled,groupId,orgType:2,orgId:orgId==''?undefined:orgId}
                return params
            },
            ...mapState({
                organizeManageSetting:state=>state.organizeManageSetting
            })
        },
        watch:{
            innerVisible:{
                handler(val){
                    if (val){
                      this.getOrgList()
                    }
                },
                immediate:true
            }

        },
        methods: {
            async getOrgList(){
                const res=await this.API.bussiness.companyList({orgType:2})
                if (res.code=='200'){
                    let arr=[]
                    res.data.map(ele=>{
                        if(ele.id!=this.form.id){
                            arr.push(ele)
                        }
                    })
                    this.orgList= arr
                }
            },
            getCompany(){
                return getResult(this, "bussiness", "companyList", {orgType:1});
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
