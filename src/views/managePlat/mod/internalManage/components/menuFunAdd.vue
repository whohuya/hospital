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
      <el-col :span="24">
        <el-form-item prop="code" label="功能编码">
          <el-input type="text" placeholder="请输入功能编码" v-model="form.code" :disabled="modify"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="name" label="功能名称">
          <el-input type="text" placeholder="请输入功能名称" v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </textDialog>
</template>

<script>
    import textDialog from "@components/textDialog"
    import {menuFunRules} from '@utils/rules'
    import {stateOptions} from "@config/options"
    import {mapState} from 'vuex'

    export default {
        name: "menuFunAdd",
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
                rules:{...menuFunRules},
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
                return this.modify?'修改菜单功能':'新增菜单功能'
            },
            paramObj(){
                let {name,id,code}=this.form;
                let params=this.modify?{name,id,code,type:2}:{name,code,type:2}
                return params
            },
            ...mapState({
                menuFunManageSetting:state=>state.menuFunManageSetting
            })
        },
        methods: {

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
                let api=this.modify?this.API.bussiness.menuFunUpdate:this.API.bussiness.menuFunCreate
                const res=this.modify?await api(this.paramObj,this.paramObj.id):await api(this.paramObj);
                if (res.code=='200'){
                    this.keyAdd=this.menuFunManageSetting;
                    this.keyAdd++;
                    this.$store.commit('menuFunUpdate',this.keyAdd);
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
