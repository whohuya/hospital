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
              <search-selector
                :column="12"
                label="项目名称"
                class='label-inline'
                prop='appId'
                v-model="form.appId"
                :options=projectOptions
                :multiple='false'
                />
            <el-col :span="12">
                <el-form-item prop="name" label="角色名称">
                    <el-input type="text" placeholder="请输入角色名称" v-model="form.name"></el-input>
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
            <el-col :span="24">
                <el-form-item prop="description" label="描述">
                    <el-input type="text" placeholder="请输入备注" v-model="form.description"></el-input>
                </el-form-item>
            </el-col>
        </el-form>
    </textDialog>
</template>

<script>
    import textDialog from "@components/textDialog"
    import {roleRules} from '@utils/rules'
    import {stateOptions} from "@config/options"
    import SearchSelector from "../../../../../components/searchSelector";
    import {mapState} from 'vuex'

    export default {
        name: "roleAdd",
        components:{
            SearchSelector,
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
                projectOptions:[],
                options:[],
                valueSet:false,
                btnLoading:false,
                rules:{...roleRules},
                footerShow:'保存',
                handleLoadFlag:false,
                defaultProps:{
                    children: 'children',
                    label: 'menuName'
                },
                menuList:[],
                checked:[],
            }
        },
        computed:{
            dialogText(){
                return this.modify?'修改角色':'新增角色'
            },
            paramObj(){
                let {name,enabled,id,appId,description}=this.form;

                let params=this.modify?{name,enabled,id,appId,description}:{name,enabled,appId,description}
                return params
            },
            ...mapState({
                roleManageSetting:state=>state.roleManageSetting
            })
        },
        watch:{
            innerVisible:{
                handler(val){
                    if (val){
                        this.projectOptions=[]
                        this.getProject()
                    }
                },
            }
        },
        methods: {
            async getProject(){
                const res=await this.API.bussiness.getProject()
                if (res.code=='200'){
                    res.data.map(ele=>{
                        this.projectOptions.push({
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


            checkMenu(val,data){
                let harfChecked=[];
                let checkedList=[];
                data.checkedNodes.forEach(ele=>{
                    checkedList.push(ele.id);
                    if (ele.parentId){
                        checkedList.push(ele.parentId);
                    }
                })
                this.$nextTick(()=>{
                    harfChecked=this.$refs.tree.getHalfCheckedNodes()
                    harfChecked.forEach(ele=>{
                        checkedList.push(ele.id)
                    })
                    this.checked=[...new Set(checkedList)];
                })
            },
            //保存
            btnSave(){
                this.btnLoading=true;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.handleRole()
                        return ;
                    } else {
                        this.btnLoading=false;
                        return false;
                    }
                });

            },

            async handleRole(){
                let api=this.modify?this.API.bussiness.roleUpdate:this.API.bussiness.roleCreate
                const res=this.modify?await api(this.paramObj,this.paramObj.id):await api(this.paramObj);
                if (res.code=='200'){
                    this.keyAdd=this.roleManageSetting;
                    this.keyAdd++;
                    this.$store.commit('roleUpdate',this.keyAdd);
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
