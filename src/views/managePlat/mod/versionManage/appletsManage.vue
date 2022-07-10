<template>
  <div v-loading="loading" class="page-container" :key="appletsManageSetting">
    <search-page
      v-bind="{
        conditions,
        paramsRebuild,
        columns,
        init,
        fn,
        defineBtn,
      }"
    >
      <template slot="table" slot-scope="scope">
        <span class="opera-info" @click="editDialog(scope.row)" v-if="upgrade">
          升级</span
        >
        <span
          class="opera-info"
          @click="appletsRecordFunction(scope.row)"
          v-if="verhistory"
          >历史版本</span
        >
      </template>
    </search-page>
    <applets-add
      @close="appletsAddDialog = false"
      :innerVisible="appletsAddDialog"
      v-model="initData"
      :modify="modifyFlag"
      @modifyClose="modifyFlag = false"
    />
    <applets-record
      ref="appletsRecord"
      :size="size"
      @close="appletsRecordDialog = false"
      :innerVisible="appletsRecordDialog"
      v-model="initData"
      widthSet="900px"
      :modify="modifyFlag"
      @modifyClose="modifyFlag = false"
    />
    <!-- <text-dialog
                @close="appletsRecord = false"
                :value="appletsRecord"
                widthSet="900px"
                :title="artical"
                :footerShow="true"
                :btnLoading="btnLoading"
                @btnSave="readArtical(artical)"
                >
                <div>
                    <search-page v-bind="{
                        columns, 
                    }">
                    </search-page>
                    {{ artical }}
                </div>
        </text-dialog> -->
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
import { ifAuthority } from "../../../../config/ifAuthority";
import searchPage from "@components/searchPage";
import { appletsManageTable } from "@config/columns";
import appletsAdd from "./components/appletsAdd";
import appletsRecord from "./components/appletsRecord";
import textDialog from "@components/textDialog";
import { mapState } from "vuex";

export default {
  components: {
    searchPage,
    appletsAdd,
    textDialog,
    appletsRecord,
  },
  name: "appletsManage",
  data() {
    return {
      loading: false,
      conditions: ["appletsName"],
      paramsRebuild: {
        likeName: "appletsName",
      },
      columns: appletsManageTable,
      init: true,
      defineBtn: [
        {
          name: "新增",
          func: this.addFunction,
          class: "el-icon-circle-plus-outline",
          showBtn: ifAuthority('appletsManage', "ADD"),
        },
      ],
      appletsAddDialog: false, //新增
      appletsRecordDialog: false, //历史版本
      modifyFlag: false, //修改
      initData: { orgType: 1 }, //弹框数据初始化
      delDialogVisible: false, //删除
      dialogText: "删除",
      deleteRow: "",
      keyAdd: 0,
      btnLoading: false,
      appletsRecord: false,
      artical: "",
      size: "1",
      appletId:'1',
      name:'ww',
      upgrade: ifAuthority('appletsManage', "UPGRADE"),
      verhistory: ifAuthority('appletsManage', "VERHISTORY"),
    };
  },
  computed: {
    ...mapState({
      appletsManageSetting: (state) => state.appletsManageSetting,
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
      const result = await this.API.bussiness.appletPage(param);
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
      this.appletsAddDialog = true;
    },
    //历史版本
    async appletsRecordFunction(scope) {
      this.appletsRecordDialog = true;
      console.log(scope);
      let id = scope.id;
      console.log(id);
      const result = await this.API.bussiness.appletsRecord({}, id);
      console.log(result);
      if (result.success == true) {
        let param = result.entity;
        console.log("result", param);
        this.$refs.appletsRecord.appletsRecordFunction(param);
        // return  {
        //     result:true,
        //     data:result.entity
        // }
      }

      // this.appletsRecordDialog=true;
      // this.modifyFlag=true;
      // this.initData={...scope} || {};
    },
    //修改app
    editDialog(scope) {
      this.appletsAddDialog = true;
      this.modifyFlag = true;
      scope.description=''
      scope.version=null
      this.initData = {...scope} || {};
      console.log("点击修改", scope);
    },
    //删除app
    delDialog(scope) {
      this.delDialogVisible = true;
      this.deleteRow = scope;
    },
    async handleDelete(id) {
      this.btnLoading = true;
      const res = await this.API.bussiness.appPackageCreate({}, id);
      if (res.code == "200") {
        this.delDialogVisible = false;
        this.keyAdd = this.appletsManageSetting;
        this.keyAdd++;
        this.$store.commit("appletsUpdate", this.keyAdd);
        this.$message({
          message: "删除成功",
          type: "success",
        });
      }
      this.btnLoading = false;
    },
    // async readArtical(id) {
    //     this.btnLoading = true;
    //     this.btnLoading = false;
    // },
    // //升级版本
    // async clickTitle(scope) {
    //     this.appletsRecord = true;
    //     console.log(scope);

    //     let code = scope.code;
    //     console.log(code);
    //     const result = await this.API.bussiness.appletsRecord({}, code);
    //     console.log(result);
    //     if (result.success == true) {
    //         this.artical = result.entity.content

    //     }
    // },
  },
};
</script>

<style scoped>
</style>
