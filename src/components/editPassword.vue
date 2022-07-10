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
                <el-form-item prop="oldPsw" label="旧密码">
                    <el-input type="password" placeholder="请输入旧密码" v-model="form.oldPsw"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item prop="newPsw" label="新密码">
                    <el-input type="password" placeholder="请输入新密码" v-model="form.newPsw" ></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item prop="rePsw" label="确认密码">
                  <el-input type="password" placeholder="确认密码" v-model="form.rePsw" ></el-input>
                </el-form-item>
            </el-col>
          </el-row>

        </el-form>
    </textDialog>
</template>

<script>
    import textDialog from "@components/textDialog"
    import {editPasswordRules} from '@utils/rules'
    import {stateOptions} from "@config/options"
    import {mapState} from 'vuex'

    export default {
        name: "editPassword",
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
                menuOptions:[],
                projectOptions:[],
                options:[],
                valueSet:false,
                btnLoading:false,
                rules:{...editPasswordRules},
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
                            this.menuOptions=[]
                            if(this.form.appId!=''&&this.form.appId!=null){
                                this.getMenuList()
                            }else{
                                this.menuOptions=[]
                            }

                        }
                    }

                },
                immediate:true
            },

        },
        computed:{
            dialogText(){
                return'修改密码'
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
                this.$set(this.form,'parentId','')

                if(this.form.appId==''||this.form.appId==null){
                    this.menuOptions=[]
                }else{
                    this.getMenuList()
                }
                this.$forceUpdate()
            },
            async getProject(){
                const res=await this.API.bussiness.getProject()
                if (res.success){
                    res.entity.map(ele=>{
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
                if (res.success){
                    res.entity.map(ele=>{
                        if(ele.id!=this.form.id){
                            this.menuOptions.push({
                                label:ele.name,
                                value:ele.id
                            })
                        }

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
                        if(this.form.newPsw!==this.form.rePsw){
                            this.$message.warning('两次密码输入不一致！')
                            this.btnLoading=false;
                            return
                        }
                        this.handleMenu()
                        return ;
                    } else {
                        this.btnLoading=false;
                        return false;
                    }
                });

            },
            async handleMenu(){
                let api=this.API.user.updatePassword
                const res=await api({
                    newPassword:this.form.newPsw,
                    oldPassword:this.form.oldPsw,
                    userId:localStorage.getItem('userId')
                })
                if (res.success){
                    this.$message({
                        message: '密码修改成功,请重新登录',
                        type: 'success'
                    });
                    this.$emit('close', false)
                    this.$emit('input', {})
                    this.$emit('modifyClose')
                    setTimeout(()=>{
                        window.location.href = "/login.html"
                        localStorage.clear();
                    },1000)
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
