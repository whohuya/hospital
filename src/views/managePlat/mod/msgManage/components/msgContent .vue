<template>
  <textDialog
    class="add-dialog"
    :value="innerVisible"
    @close="close"
    widthSet="700px"
    :title="dialogText"
    :footerShow="footerShow"
    :btnLoading="btnLoading"
    :special="true"
    @btnSave="btnSave"
  >
   
  </textDialog>
</template>

<script>
import textDialog from "@components/textDialog";
import { departmentAddRules } from "@utils/rules";
import { stateOptions } from "@config/options";
import searchSelector from "@/components/searchSelector";
import { mapState } from "vuex";
export default {
  name: "msgContent ",
  components: {
    textDialog,
    searchSelector,
  },
  model: {
    prop: "form",
    event: "input",
  },
  props: {
    innerVisible: Boolean,
    modify: Boolean,
    form: Object,
  },
  data() {
    return {
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        // return item.pinyin.indexOf(query) > -1;
      },
      stateOptions,
      organizeOptions: [],
      options: [],
      valueSet: false,
      btnLoading: false,
      rules: { ...departmentAddRules },
      footerShow: "保存",
      handleLoadFlag: false,
      keyAdd: 0,
      resource: "", //单选按钮
      date2:'',
      isSelect:true
    };
  },
  
  methods: {
    
  },
  mounted() {
   
  },
  created() {},
};
</script>
<style scoped lang="scss">
.clearfix {
  .el-select {
    width: 100%;
  }
}
</style>
<style lang="scss">
@import "~@assets/css/addDialog.scss";
// .el-input__icon .el-icon-search{
//     display: none;
// }
.el-transfer-panel__filter .el-input__icon {
  margin-top: -103px;
  margin-left: 0;
}
</style>
