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
                <el-form-item prop="name" label="部门名称">
                    <el-input type="text" placeholder="请输入部门名称" v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <search-selector
                    :column="12"
                    label="所属组织"
                    class='label-inline'
                    prop='orgId'
                    v-model="form.orgId"
                    :options=organizeOptions
                    :multiple='false'
            />
          </el-row>
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
            <el-col :span="24">
                <el-form-item prop="note" label="备注">
                    <el-input type="textarea" rows="1" placeholder="请输入备注" v-model="form.description"></el-input>
                </el-form-item>
            </el-col>
        </el-form>
    </textDialog>
</template>

<script>
    import textDialog from "@components/textDialog"
    import {departmentAddRules} from '@utils/rules'
    import {stateOptions} from "@config/options"
    import searchSelector from "@/components/searchSelector";
    import {mapState} from 'vuex'
    export default {
        name: "departmentAdd",
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
                organizeOptions:[],
                options:[],
                valueSet:false,
                btnLoading:false,
                rules:{...departmentAddRules},
                footerShow:'保存',
                handleLoadFlag:false,
                keyAdd:0
            }
        },
        watch:{
            innerVisible:{
                handler(val){
                    if (val){
                        this.organizeOptions=[]
                        this.getOrgOption(2)
                        // this.getOrgOption(3)
                    }
                },
                immediate:true
            }

        },
        computed:{
            dialogText(){
                return this.modify?'编辑部门':'新增部门'
            },
            ...mapState({
                departmentManageSetting:state=>state.departmentManageSetting
            }),
            paramObj(){
                let {name,id,enabled,orgId,description,orgType}=this.form;
                let params=this.modify?{name,id,orgId,description,orgType:3,enabled}:{name,orgId,description,orgType:3,enabled}
                return params
            },

        },
        methods: {
            async getOrgOption(type){
                const res=await this.API.bussiness.companyList({orgType:type})
                if (res.code=='200'){
                    if (type==2){
                        res.data.map(ele=>{
                            this.organizeOptions.push({
                                label:ele.name,
                                value:ele.id
                            })
                        })
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
                    this.keyAdd=this.departmentManageSetting;
                    this.keyAdd++;
                    this.$store.commit('departUpdate',this.keyAdd);
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
