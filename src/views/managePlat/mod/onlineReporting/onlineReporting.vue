<template>
  <div v-loading="loading" class="page-container" :key="appManageSetting">
    <search-page
      v-bind="{
        conditions,
        paramsRebuild,
        columns,
        init,
        fn,
        defineBtn
      }"
    >
      <template slot="table" slot-scope="scope">
        <!--  -->
        <span class="opera-info" @click="editDialog(scope.row)"
        >升级</span
        >
        <span
          class="opera-info"
          @click="appRecordFunction(scope.row)"
        >历史版本</span
        >
      </template>
    </search-page>


    <text-dialog
      @close="delDialogVisible = false"
      :value="delDialogVisible"
      widthSet="550px"
      :title="dialogText"
      :footerShow="true"
      :btnLoading="btnLoading"
      @btnSave="handleDelete(deleteRow.id)"
    >
      删除后无法恢复，确认删除"{{ deleteRow.name }}"吗？
    </text-dialog>
  </div>
</template>

<script>
    import searchPage from "@components/searchPage";
    import { appManageTable } from "@config/columns";
    import textDialog from "@components/textDialog";
    import { mapState } from "vuex";
    export default {
        components: {
            searchPage,
            textDialog,
        },
        name: "onlineReporting",
        data() {
            return {
                loading: false,
                conditions: ["publishiStartTime", "publishiEndTime"],
                paramsRebuild: {
                    startTime: "publishiStartTime",
                    endTime: "publishiEndTime",
                },
                columns: appManageTable,
                init: true,
                defineBtn: [
                    {
                        name: "新增",
                        func: this.addFunction,
                        class: "el-icon-circle-plus-outline",
                    },
                ],
                appAddDialog: false, //新增
                appRecordDialog: false, //历史版本
                modifyFlag: false, //修改
                initData: { orgType: 1 }, //弹框数据初始化
                delDialogVisible: false, //删除
                dialogText: "删除",
                deleteRow: "",
                keyAdd: 0,
                btnLoading: false,
            };
        },
        computed: {
            ...mapState({
                appManageSetting: (state) => state.appManageSetting,
            }),
        },
        methods: {
            //数据
            async fn(conditions) {
                console.log("执行了fn");
                let param = {
                    ...conditions,
                    orgType: 1,
                };
                const result = await this.API.bussiness.appPage(param);
                if (result.success == true) {
                    return {
                        result: true,
                        total: result.entity.total,
                        records: result.entity.content,
                    };
                }
            },
            //新增app
            async addFunction() {
                this.appAddDialog = true;
            },
            //历史版本
            async appRecordFunction(scope) {
                this.appRecordDialog = true;
                console.log(scope);
                let id = scope.id;
                console.log(id);
                const result = await this.API.bussiness.appRecord({}, id);
                console.log(result);
                if (result.success == true) {
                    let param = result.entity;
                    console.log("result", param);
                    this.$refs.appRecord.appRecordFunction(param);
                    // return  {
                    //     result:true,
                    //     data:result.entity
                    // }
                }
            },
            //修改app
            editDialog(scope) {
                console.log("点击修改", scope);
                this.appAddDialog = true;
                this.modifyFlag = true;
                scope.description=''
                this.initData = { ...scope } || {};
            },
            //删除app
            delDialog(scope) {
                this.delDialogVisible = true;
                this.deleteRow = scope;
            },
            async handleDelete(id) {
                this.btnLoading = true;
                const res = await this.API.bussiness.organizeDel({}, id);
                if (res.code == "200") {
                    this.delDialogVisible = false;
                    this.keyAdd = this.appManageSetting;
                    this.keyAdd++;
                    this.$store.commit("appUpdate", this.keyAdd);
                    this.$message({
                        message: "删除成功",
                        type: "success",
                    });
                }
                this.btnLoading = false;
            },
        },
    };
</script>

<style scoped>
</style>
