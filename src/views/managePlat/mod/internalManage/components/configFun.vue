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
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="code"
          label="功能编码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="功能名称"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
  </textDialog>
</template>

<script>
    import textDialog from "@components/textDialog"
    import {menuFunRules} from '@utils/rules'
    import {stateOptions} from "@config/options"
    import {mapState} from 'vuex'

    export default {
        name: "configFun",
        components:{
            textDialog
        },
        model: {
            prop: "form",
            event: "input"
        },
        props:{
            innerVisible: Boolean,
            form:Object,
        },
        data() {
            return{
                pushData:[],
                tableData:[],
                stateOptions,
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
        watch:{
            innerVisible:{
                handler(val){
                    if (val){

                        this.getMenuConfig()
                    }
                },
                immediate:true
            }

        },
        computed:{
            dialogText(){
                return '配置功能'
            },
            paramObj(){
                let arr=[]
                this.pushData.map(item=>{
                    arr.push(item.code)
                })
                return arr
            },
            ...mapState({
                menuManageSetting:state=>state.menuManageSetting
            })
        },
        methods: {
            async getMenuConfig(){
                const res=await this.API.bussiness.getMenuConfig({},this.form.id+'/funcs')
                if (res.code=='200'){
                   this.tableData=res.data
                    this.$nextTick(()=>{
                        this.tableData.forEach(row => {
                            this.$refs.multipleTable.toggleRowSelection(row,row.select);
                        })
                    })
                    }
            },
            close(){
                this.$emit('close',false) //关闭
                this.$emit('input',{})
                this.$emit('modifyClose')
            },

            handleSelectionChange(val) {
                console.log(val)
                this.pushData=val
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
                 this.handleMenu()
                  return ;
            },
            async handleMenu(){
                let api=this.API.bussiness.configFun
                const res=await api(this.paramObj,this.form.id+'/funcs')
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
