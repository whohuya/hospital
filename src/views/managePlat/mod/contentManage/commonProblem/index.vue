<template>
  <div v-loading="loading" class="page-container" :key="problemManageSetting">
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
        <span class="opera-info" @click="editFunction(scope.row)"  v-if="changeBtn">修改</span>
        <span
          class="opera-info"
          @click="delDialog(scope.row)"
          v-if="scope.row.enabled == false && deleteBtn"
          >删除</span
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
import { ifAuthority } from "../../../../../config/ifAuthority";
import searchPage from "@components/searchPage";
import { commonProblemTable } from "@config/columns";
// import groupAdd from './components/groupAdd'
import textDialog from "@components/textDialog";
import { mapState } from "vuex";
export default {
  components: {
    searchPage,
    textDialog,
  },
  name: "commonProblem",
  data() {
    return {
      loading: false,
      conditions: [
        "problemName",
        "problemStatus",
        "createProblemTimeBegin",
        "createProblemTimeEnd",
      ],
      paramsRebuild: {
        name: "problemName",
        enabled: "problemStatus",
        createTimeBegin: "createProblemTimeBegin",
        createTimeEnd: "createProblemTimeEnd",
      },
      columns: commonProblemTable,
      init: true,
      defineBtn: [
        {
          name: "新增",
          func: this.addFunction,
          class: "el-icon-circle-plus-outline",
          showBtn: ifAuthority(this.$route.name, "ADD"),
        },
      ],
      groupAddDialog: false, //新增
      modifyFlag: false, //修改
      initData: { orgType: 1 }, //弹框数据初始化
      delDialogVisible: false, //删除
      dialogText: "删除",
      deleteRow: "",
      keyAdd: 0,
      btnLoading: false,
       changeBtn:ifAuthority(this.$route.name, "UPDATE"),
       deleteBtn: ifAuthority(this.$route.name,"DELETE"),
    };
  },
  computed: {
    ...mapState({
      problemManageSetting: (state) => state.problemManageSetting,
    }),
  },
  methods: {
    //数据
    async fn(conditions) {
      // const problemConditions = {
      //   name: conditions.problemName,
      //   enabled: conditions.problemStatus,
      //   createTimeBegin: conditions.createTimeBegin,
      //   createTimeEnd: conditions.createTimeEnd,
      // };
        let param = {
        ...conditions,
      };
      const result = await this.API.bussiness.problemManage(param);
      if (result.success === true) {
        return {
          result: true,
          total: result.entity.total,
          records: result.entity.content,
        };
      }
    },
    //新增文章
    async addFunction() {
      this.$router.push({ path: "/proManage/addProblem" });
    },
    //编辑文章
    async editFunction(row) {
      this.$router.push({
        path: "/proManage/addProblem",
        query: { id: row.id },
      });
    },

    //删除文章
    delDialog(scope) {
      this.delDialogVisible = true;
      this.deleteRow = scope;
    },
    async handleDelete(id) {
      this.btnLoading = true;
      const res = await this.API.bussiness.deleteProblem({}, id);
      if (res.success === true) {
        this.delDialogVisible = false;
        this.keyAdd = this.problemManageSetting;
        this.keyAdd++;
        this.$store.commit("problemUpdate", this.keyAdd);
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
