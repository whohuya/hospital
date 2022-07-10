<template>
  <!-- <div v-loading="loading" class="page-container"> -->
  <div v-loading="loading" class="page-container" :key="msgSetting">
    <search-page
      v-bind="{
        conditions,
        paramsRebuild,
        columns,
        init,
        fn,
        defineBtn,
        searchBtn,
      }"
    >
      <template slot="table" slot-scope="scope">
        <span class="opera-info" @click="editDialog(scope.row)" v-if="update"
          >编辑</span
        >
        <!--  v-if="scope.row.isSent !== '1' && update" -->
        <span class="opera-info" @click="delDialog(scope.row)" v-if="deleteBtn"
          >删除</span
        >
        <!-- <span class="opera-info" @click="roleDialog(scope.row)">角色授权</span> -->
      </template>
      <template slot="other" slot-scope="scope">
        <span style="color: blue" @click="clickTitle(scope.row)">{{
          scope.row.title
        }}</span>
      </template>
    </search-page>
    <Msg-add
      v-if="groupAddDialog"
      @close="groupAddDialog = false"
      :innerVisible="groupAddDialog"
      v-model="initData"
      :modify="modifyFlag"
      @modifyClose="modifyFlag = false"
    />
    <text-dialog
      @close="msgContent = false"
      :value="msgContent"
      widthSet="550px"
      :title="artical"
      :footerShow="false"
      
     
    >
      <div class="content-txt">消息内容： {{ articalContent }}</div>
      <el-button class="articalBtn" @click="msgContent = false">关闭</el-button>
    </text-dialog>
    <text-dialog
      @close="delDialogVisible = false"
      :value="delDialogVisible"
      widthSet="550px"
      :title="dialogText"
      :footerShow="true"
      :btnLoading="btnLoading"
      @btnSave="handleDelete(deleteRow.id)"
    >
      删除后无法恢复，确认删除吗？
    </text-dialog>
    <!-- <user-role @close='userRoleDialog=false'
               :innerVisible="userRoleDialog"
               v-model="initRoleData"
               :modify='roleModifyFlag'
               @modifyClose='roleModifyFlag=false'>

    </user-role> -->
  </div>
</template>

<script>
import { ifAuthority } from "../../../../config/ifAuthority";
import { mapState } from "vuex";
import SearchPage from "../../../../components/searchPage";
import { msgManage } from "@config/columns";
import TextDialog from "../../../../components/textDialog";
// import userRole from "../msgManage/components/userRole.vue"
import MsgAdd from "./components/msgAdd.vue";
// import MsgContent from "./components/msgContent .vue";
export default {
  name: "msgManage",
  // components: {ProjectAdd, TextDialog, SearchPage},
  components: { TextDialog, SearchPage, MsgAdd },
  data() {
    return {
      //  userRoleDialog: false,
      //   roleModifyFlag: false,
      //     initRoleData: {},
      msgContent: false,
      dialogText: "删除",
      delDialogVisible: false,
      modifyFlag: false, //修改
      groupAddDialog: false,
      initData: {},
      loading: false,
      init: true,
      conditions: [
        "msgType",
        "sendScope",
        "isSent",
        "sendTimeBegin",
        "sendTimeEnd",
      ],
      paramsRebuild: {
        likeName: "projectName",
      },
      columns: msgManage,
      defineBtn: [
        {
          name: "新增",
          func: this.addFunction,
          class: "el-icon-circle-plus-outline",
          showBtn: ifAuthority("messageManage", "ADD"),
        },
      ],
      deleteRow: "",
      btnLoading: false,
      artical: "",
      articalContent: "",
      update: ifAuthority("messageManage", "UPDATE"),
      searchBtn: ifAuthority("messageManage", "SELECT"),
      deleteBtn: ifAuthority("messageManage", "DELETE"),
      reShow: "",
    };
  },
  computed: {
    ...mapState({
      msgSetting: (state) => state.msgSetting,
    }),
  },
  methods: {
    // roleDialog(scope) {
    //               this.userRoleDialog = true;
    //               this.roleModifyFlag = true;
    //               this.handleGetUserDetail(scope.id, 'role')
    //           },
    //           async handleGetUserDetail(id, type) {
    //               const res = await this.API.bussiness.getUserDetail({}, id);
    //               if (res.success) {
    //                   switch (type) {
    //                       case 'edit':
    //                           this.initData = {...res.entity} || {};
    //                           break;
    //                       case 'role':
    //                           this.initRoleData = {id, appInfos: res.entity.appInfos} || {}
    //                           break;
    //                   }
    //               }
    //           },

    async fn(conditions) {
      let param = {
        ...conditions,
      };
      const result = await this.API.bussiness.systemMessage(param);
      // console.log(result);
      if (result.success == true) {
        return {
          result: true,
          total: result.entity.total,
          records: result.entity.content,
        };
      }
    },
    async addFunction() {
      this.groupAddDialog = true;
    },
    async editDialog(scope) {
      let id = scope.id;
      const result = await this.API.bussiness.articalContent({}, id);
      if (result.success == true) {
        scope = result.entity;
      }
      console.log({ ...scope });
      this.groupAddDialog = true;
      this.modifyFlag = true;
      this.initData = { ...scope } || {};
    },
    //删除组织
    delDialog(scope) {
      this.delDialogVisible = true;
      this.deleteRow = scope;
      //  console.log(this.deleteRow)
    },

    async handleDelete(id) {
      this.btnLoading = true;
      // const res = await this.API.bussiness.projectDelete({}, id);

      const res = await this.API.bussiness.deleteSyMessage({}, id);
      if (res.success == true) {
        this.delDialogVisible = false;
        this.keyAdd = this.msgSetting;
        this.keyAdd++;
        this.$store.commit("msgDelet", this.keyAdd);
        this.$message({
          message: "删除成功",
          type: "success",
        });
      }
      this.btnLoading = false;
    },

    // async readArtical(id) {
    //   this.btnLoading = true;
    //   this.btnLoading = false;
    // },
    async clickTitle(scope) {
      this.msgContent = true;
      this.artical = scope.title;
      let id = scope.id;
      const result = await this.API.bussiness.articalContent({}, id);
      if (result.success == true) {
        this.articalContent = result.entity.content;
      }
    },
    async editContent(scope) {},
  },
  mounted() {},
};
</script>

<style scoped>
.content-txt {
  font-size: 18px;
  margin-left: 15px;
  font-weight: 600;
  text-align:center;
}
::v-deep.text-dialog .el-dialog .el-dialog__header{
  text-align:center !important;
  font-size: 20px;
}
.articalBtn{
  margin-left: 43%;
  margin-top: 50px;
}
</style>


