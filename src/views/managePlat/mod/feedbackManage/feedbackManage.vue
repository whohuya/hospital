<template>
  <!-- <div v-loading="loading" class="page-container"> -->
  <div v-loading="loading" class="page-container" :key="feedbackSetting">
    <search-page
      v-bind="{
        conditions,

        columns,
        init,
        fn,
        searchBtn,
      }"
    >
      <!--   paramsRebuild, -->
      <!--   defineBtn, -->
      <template slot="table" slot-scope="scope">
        <!-- <span class="opera-info" @click="editDialog(scope.row)">编辑</span> -->
        <span class="opera-info" @click="delDialog(scope.row)" v-if="deleteBtn"
          >删除</span
        >
      </template>
    </search-page>
    <!-- <project-add
                v-if="groupAddDialog"
                @close='groupAddDialog=false'
                :innerVisible="groupAddDialog"
                v-model="initData"
                :modify='modifyFlag'
                @modifyClose='modifyFlag=false'
        /> -->
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
  </div>
</template>

<script>
import { ifAuthority } from "../../../../config/ifAuthority";
import { mapState } from "vuex";
import SearchPage from "../../../../components/searchPage";
import { feedbackManage } from "@config/columns";
import TextDialog from "../../../../components/textDialog";
// import ProjectAdd from "./components/projectAdd";

export default {
  name: "feedbackManage",
  // components: {ProjectAdd, TextDialog, SearchPage},
  components: { TextDialog, SearchPage },
  data() {
    return {
      dialogText: "删除",
      delDialogVisible: false,
      modifyFlag: false, //修改
      groupAddDialog: false,
      initData: {},
      loading: false,
      init: true,
      conditions: ["telephone", "createTimeBegin", "createTimeEnd"],
      paramsRebuild: {
        // telephone: "telephone",
      },
      columns: feedbackManage,
      // defineBtn:[
      //     {name:'新增',func:this.addFunction,class:'el-icon-circle-plus-outline'},
      // ],
      deleteRow: "",
      btnLoading: false,
      searchBtn: ifAuthority(this.$route.name, "SELECT"),
      deleteBtn: ifAuthority(this.$route.name, "DELETE"),
    };
  },
  computed: {
    ...mapState({
      feedbackSetting: (state) => state.feedbackSetting,
    }),
  },
  methods: {
    async fn(conditions) {
      let param = {
        ...conditions,
      };
      const result = await this.API.bussiness.feedback(param);
      console.log(result);
      if (result.success == true) {
        return {
          result: true,
          total: result.entity.total,
          records: result.entity.content,
        };
      }
    },
    // async addFunction() {
    //   this.groupAddDialog = true;
    // },
    // editDialog(scope) {
    //   this.groupAddDialog = true;
    //   this.modifyFlag = true;
    //   this.initData = { ...scope } || {};
    // },
    //删除组织
    delDialog(scope) {
      this.delDialogVisible = true;
      this.deleteRow = scope;
      // console.log(this.deleteRow);
    },

    async handleDelete(id) {
      console.log(id);
      this.btnLoading = true;
      const res = await this.API.bussiness.feedbackDelete({}, id);
      console.log(res, "2222222");
      if (res.success == true) {
        this.delDialogVisible = false;
        this.keyAdd = this.feedbackSetting;
        this.keyAdd++;
        this.$store.commit("projectUpdate", this.keyAdd);
        this.$message({
          message: "删除成功",
          type: "success",
        });
      }
      this.btnLoading = false;
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>


