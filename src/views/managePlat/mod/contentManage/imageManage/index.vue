<template>
  <div v-loading="loading" class="page-container" :key="imageManageSetting">
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
        <span
          class="opera-info"
          @click="previewFunction(scope.row)"
          v-if="previewBtn"
          >预览</span
        >
        <span
          class="opera-info"
          @click="editFunction(scope.row)"
          v-if="changeBtn"
          >修改</span
        >
        <span
          class="opera-info"
          @click="delDialog(scope.row)"
          v-if="scope.row.enabled == false && deleteBtn"
          >删除</span
        >
      </template>
      <template slot="other" slot-scope="scope">
        <span style="color: blue" @click="clickTitle(scope.row)">{{
          scope.row.title
        }}</span>
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
    <el-dialog
      :visible="viewDialogVisible"
      center
      @close="viewDialogVisible = false"
      width="35%"
      title="图片预览"
    >
      <div class="view-content" v-loading="imgLoading">
        <img class="img" :src="imgUrl" alt="图片预览" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ifAuthority } from "../../../../../config/ifAuthority";
import searchPage from "@components/searchPage";
import { imageManageTable } from "@config/columns";
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
        "imgName",
        "imgPostion",
        "imgStatus",
        "createProblemTimeBegin",
        "createProblemTimeEnd",
      ],
      paramsRebuild: {},
      columns: imageManageTable,
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
      preview: "",
      viewDialogVisible: false,
      imgUrl: "",
      imgLoading: true,
      previewBtn: ifAuthority(this.$route.name, "PREVIEW"),
      changeBtn: ifAuthority(this.$route.name, "UPDATE"),
      deleteBtn: ifAuthority(this.$route.name, "DELETE"),
    };
  },
  computed: {
    ...mapState({
      // groupManageSetting: (state) => state.groupManageSetting
      imageManageSetting: (state) => state.imageManageSetting,
    }),
  },
  methods: {
    //数据
    async fn(conditions) {
      const imageConditions = {
        name: conditions.imgName,
        type: conditions.imgPostion,
        enabled:
          conditions.imgStatus === "true"
            ? true
            : conditions.imgStatus === "false"
            ? false
            : "",
        createTimeStart: conditions.createTimeBegin,
        createTimeEnd: conditions.createTimeEnd,
        page: conditions.page,
        size: conditions.size,
      };
      const result = await this.API.bussiness.pictureManage(imageConditions);
      if (result.success === true) {
        return {
          result: true,
          total: result.entity.total,
          records: result.entity.content,
        };
      }
    },
    async previewFunction(row) {
      this.viewDialogVisible = true;
      const result = await this.API.bussiness.getImgDetail({}, row.id);
      if (result.success === true) {
        this.imgUrl = result.entity.url;
        this.imgLoading = false;
      }
    },

    //新增图片
    async addFunction() {
      this.$router.push({ path: "/proManage/addImage" });
    },
    //编辑图片
    async editFunction(row) {
      this.$router.push({ path: "/proManage/addImage", query: { id: row.id } });
    },

    //删除文章
    delDialog(scope) {
      this.delDialogVisible = true;
      this.deleteRow = scope;
    },
    async handleDelete(id) {
      this.btnLoading = true;
      const result = await this.API.bussiness.deleteImg({}, id);
      if (result.success === true) {
        this.delDialogVisible = false;
        this.keyAdd = this.projectManageSetting;
        this.keyAdd++;
        this.$store.commit("imageUpdate", this.keyAdd);
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
.el-dialog__body {
  padding: 20px 20px;
}
.img {
  width: 100%;
  height: 100%;
}
</style>
