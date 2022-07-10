<template>
  <div v-loading="loading" class="page-container" :key="articleManageSetting">
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
        <span class="opera-info" @click="preview(scope.row)" v-if="previewBtn"
          >预览</span
        >
        <span class="opera-info" @click="editFunction(scope.row)" v-if="changeBtn">修改</span>
        <span
          class="opera-info"
          @click="delDialog(scope.row)"
          v-if="scope.row.enabled == false && deleteBtn"
          >删除</span
        >
      </template>
      <template slot="other" slot-scope="scope">
        <span style="color: blue" @click="copyLink(scope.row)" id="url">{{
          scope.row.redirectUri
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
      :title="viweTitle"
      :visible="viewDialogVisible"
      center
      @close="closePreview"
    >
      <div v-loading="articleLoading">
        <div v-html="viweContent" class="article-content">
          {{ viweContent }}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePreview">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ifAuthority } from "../../../../../config/ifAuthority";
import searchPage from "@components/searchPage";
import { articleManageTable } from "@config/columns";
// import groupAdd from './components/groupAdd'
import textDialog from "@components/textDialog";
import { mapState } from "vuex";
export default {
  components: {
    searchPage,
    textDialog,
  },
  name: "articleManage",
  data() {
    return {
      loading: false,
      conditions: [
        "title",
        "articlePostion",
        "articleStatus",
        "createProblemTimeBegin",
        "createProblemTimeEnd",
      ],
      paramsRebuild: {
        type: "articlePostion",
        enabled: "articleStatus",
        createTimeStart: "createProblemTimeBegin",
        createTimeEnd: "createProblemTimeEnd",
      },
      columns: articleManageTable,
      init: true,
      defineBtn: [
        {
          name: "新增",
          func: this.addFunction,
          class: "el-icon-circle-plus-outline",
          showBtn: ifAuthority('articleManage', "ADD"),
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
      viewDialogVisible: false,
      viweContent: ``,
      viweTitle: "",
      articleLoading: true,
      valid: true,
      previewBtn: ifAuthority('articleManage', "PREVIEW"),
      changeBtn:ifAuthority('articleManage', "UPDATE"),
       deleteBtn: ifAuthority('articleManage',"DELETE"),
    };
  },
  computed: {
    ...mapState({
      articleManageSetting: (state) => state.articleManageSetting,
    }),
  },
  methods: {
    //数据
    async fn(conditions) {
      // const articleConditions = {
      //   name: conditions.title,
      //   imgPostion: conditions.position,
      //   enabled: conditions.articleStatus,
      //   createTimeStart: conditions.createTimeBegin,
      //   createTimeEnd: conditions.createTimeEnd
      // }
      let param = {
        ...conditions,
      };
      const result = await this.API.bussiness.articleManage(param);
      if (result.success === true) {
        return {
          result: true,
          total: result.entity.total,
          records: result.entity.content,
        };
      }
    },
    //点击复制链接
    copyLink(row) {
      //  this.$router.push({
      //     path:'/articleManage/articleDetail',
      //      query: { id: row.id },
      // })
      if (!this.valid) {
        return false;
      }
      var inp = document.createElement("input"); // create input标签
      document.body.appendChild(inp); // 添加到body中
      inp.value = row.redirectUri; // 给input设置value属性为需要copy的内容
      inp.select(); // 选中
      document.execCommand("copy", false); // copy已经选中的内容
      inp.remove(); // 删除掉这个dom

      this.$message({
        message: "复制成功",
        type: "success",
      });
      this.valid = false;
      setTimeout(() => {
        this.valid = true;
      }, 2000);
    },
    //新增文章
    async addFunction() {
      this.$router.push({ path: "/articleManage/addArticle" });
    },
    //编辑文章
    async editFunction(row) {
      this.$router.push({
        path: "/articleManage/addArticle",
        query: { id: row.id },
      });
    },
    // 预览
    preview(row) {
      if (row.id) {
        this.getArticleDetail(row.id);
      }
    },
    closePreview() {
      this.viewDialogVisible = false;
      this.viweContent = "";
    },
    //删除文章
    delDialog(scope) {
      this.delDialogVisible = true;
      this.deleteRow = scope;
    },
    async handleDelete(id) {
      this.btnLoading = true;
      const result = await this.API.bussiness.deleteArticle({}, id);
      if (result.success === true) {
        this.delDialogVisible = false;
        this.keyAdd = this.articleManageSetting;
        this.keyAdd++;
        this.$store.commit("articleUpdate", this.keyAdd);
        this.$message({
          message: "删除成功",
          type: "success",
        });
      }
      this.btnLoading = false;
    },
    async getArticleDetail(id) {
      const result = await this.API.bussiness.getArticleDetail({}, id);
      if (result.success === true) {
        this.viewDialogVisible = true;
        this.articleLoading = false;
        this.viweContent = result.entity.content;
        this.viweTitle = result.entity.title;
      }
    },
  },
};
</script>

<style scoped lang="scss" >
.text-dialog .el-dialog .el-dialog__header {
  text-align: center !important;
}
.article-content {
  white-space: pre-wrap;
  height: 500px;
  overflow-y: auto;
}
</style>
