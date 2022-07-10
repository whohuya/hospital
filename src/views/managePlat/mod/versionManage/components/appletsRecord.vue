<template>
    <textDialog
                class="add-dialog"
                :value="innerVisible"
                @close="close"
                widthSet='900px'
                :title='dialogText'
                :footerShow='footerShow'
                :btnLoading='btnLoading'
                :special="false"
                @btnSave='btnSave'
               
        >
        <table-component  
                :data="param"
                :size='size' 
                v-bind="{
                    columns,
                    fn,
                    initData,
                    cData
                }">
        </table-component>
    </textDialog>
</template>

<script>
    import tableComponent from '@components/tableComponent';
    import searchPage from '@components/searchPage';
    import {appletsRecordTable} from "@config/columns";
    import textDialog from "@components/textDialog"
    import {mapState} from 'vuex'
    export default {
        components:{
            tableComponent,textDialog
        },
        name: "appletsRecordTable",
        model: {
            prop: "form",
            event: "input"
        },
        props:{
            innerVisible: Boolean,
            modify:Boolean,
            form:Object,
            data: Object,
            history:Object,
            // mes:String,
            size:String
        },
        data(){
            return{
                conditions:[],
                valueSet:false,
                btnLoading:false,
                footerShow:'关闭',
                handleLoadFlag:false,
                keyAdd:0,
                loading: false,
                columns:appletsRecordTable,
                init:true,
                appletsAddDialog:false,//新增
                appletsRecordDialog:false,//历史版本
                modifyFlag:false ,//修改
                initData:{orgType:1},//弹框数据初始化
                delDialogVisible:false,//删除
                dialogText:'',
                deleteRow:'',
                keyAdd:0,
                btnLoading:false,
                appletsRecord: false,
                artical: "",
                cData: null,
                param:[]
            }
        },
        computed:{
            // ...mapState({
            //     appletsManageSetting:(state)=>state.appletsManageSetting
            // })
        },
        methods:{
            appletsRecordFunction(param){
                console.log('000000000',param)
                this.param=param;
            },
            close(){
                this.$emit('close',false) //关闭
                this.$emit('modifyClose')
                this.$emit("btnSave")
            },
            //保存
            btnSave(){
                this.$emit('close',false) //关闭
            },
            //数据
            async fn(scope){
                console.log('1122889900998800');
                console.log(scope);
                let id = scope.id;
                console.log(id);
                const result = await this.API.bussiness.appletsRecord({}, id);
                console.log(result);
                if (result.success == true) {
                    return  {
                        result:true,
                        data:result.entity
                    }
                }
            },
        },
        mounted() {
        },
    }
</script>
<style scoped lang="scss">
    .clearfix{
        .el-select{
            width: 100%;
        }
    }
    ::v-deep  .el-dialog__footer{
        text-align: center;
    }
</style>
<style lang="scss">
    @import "~@assets/css/addDialog.scss";
</style>
