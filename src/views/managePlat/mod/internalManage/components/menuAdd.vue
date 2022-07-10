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
            <search-selector
                    :column="12"
                    label="项目名称"
                    class='label-inline'
                    prop='appId'
                    v-model="form.appId"
                    @change="handleChangeApp"
                    :options=projectOptions
                    :multiple='false'
            />
            <el-col :span="12">
                <el-form-item prop="name" label="菜单名称">
                    <el-input type="text" placeholder="请输入菜单名称" v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
                <el-form-item prop="code" label="模块编码">
                    <el-input type="text" placeholder="请输入模块编码" v-model="form.code" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="path" label="菜单地址">
                    <el-input type="text" placeholder="请输入链接地址" v-model="form.path" ></el-input>
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
            <el-col :span="12">
                <el-form-item prop="sequence" label="排序">
                  <el-input type="text" maxlength="2" v-model="form.sequence" placeholder="请输入"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <search-selector
            :column="12"
            label="上级菜单"
            class='label-inline'
            prop='parentId'
            v-model="form.parentId"
            :options=menuOptions
            :multiple='false'
          />
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
    import {menuRules} from '@utils/rules'
    import {stateOptions} from "@config/options"
    import searchSelector from "@/components/searchSelector";
    import {mapState} from 'vuex'

    export default {
        name: "menuAdd",
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
                menuOptions:[],
                projectOptions:[],
                options:[],
                valueSet:false,
                btnLoading:false,
                rules:{...menuRules},
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
        watch:{
            innerVisible:{
                handler(val){
                    if (val){
                        this.projectOptions=[]
                        this.menuOptions=[]
                        this.getProject()
                    }
                },
                immediate:true
            },
            form:{
                handler(val){
                    if(val){
                        if(this.modify){
                            this.getMenuList()
                        }
                    }

                },
                immediate:true,
                deep:true
            },

        },
        computed:{
            dialogText(){
                return this.modify?'修改菜单':'新增菜单'
            },
            paramObj(){
                let {name,enabled,id,appId,description,parentId,sequence,code,path}=this.form;

                let params=this.modify?{name,enabled,id,appId,description,parentId:parentId,sequence,code,path}:{name,enabled,appId,description,parentId:parentId,sequence,code,path}
                return params
            },
            ...mapState({
                menuManageSetting:state=>state.menuManageSetting
            })
        },
        methods: {
            handleChangeApp(){
                this.getMenuList()
            },
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
            async getMenuList(){
                this.menuOptions=[]
                const res=await this.API.bussiness.getMenu({appId:this.form.appId})
                if (res.code=='200'){
                    res.data.map(ele=>{
                        this.menuOptions.push({
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
                        this.handleMenu()
                        return ;
                    } else {
                        this.btnLoading=false;
                        return false;
                    }
                });

            },
            async handleMenu(){
                let api=this.modify?this.API.bussiness.menuUpdate:this.API.bussiness.menuCreate
                const res=this.modify?await api(this.paramObj,this.paramObj.id):await api(this.paramObj);
                if (res.code=='200'){
                    this.keyAdd=this.menuManageSetting;
                    this.keyAdd++;
                    this.$store.commit('menuUpdate',this.keyAdd);
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
