<template>
  <el-dialog
    :width="widthSet"
    class="text-dialog"
    :title="title"
    :visible.sync="value"
    :before-close="close"
    :show-close="showClose"
    :close-on-click-modal="clickClose"
    append-to-body
  >
    <slot></slot>
    <div slot="footer" v-if="footerShow">
      <el-button v-show="special" @click="close" class="cancel"
        >取 消</el-button
      >
      <el-button
        type="primary"
        @click="btnSave"
        :disabled="isDisable"
        :loading="btnLoading"
        class="certain"
        >{{ footerShow == true ? "确定" : footerShow }}</el-button
      >

      <!-- <el-button  type="primary"   @click='$emit("btnSave")'  :loading="btnLoading" class="certain">{{footerShow==true?'确定':footerShow}}</el-button> -->
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    title: String,
    showClose: {
      //是否显示“X”关闭图标
      type: Boolean,
      default: true,
    },
    clickClose: {
      //点击弹框 之外是否关闭
      type: Boolean,
      default: false,
    },
    footerShow: {
      //是否显示弹框底部
      type: [Boolean, String],
    },
    special: {
      //是否显示‘取消’
      type: Boolean,
      default: true,
    },
    widthSet: {
      type: String,
      default: "500px",
    },
    btnLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDisable: false,
    };
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    btnSave() {
      this.isDisable = true;
      setTimeout(() => {
        this.isDisable = false;
      }, 1000);

      this.$emit("btnSave", false);
      console.log("1111111111111111公共组件");
    },
  },
};
</script>
<style lang="scss">
.text-dialog {
  .el-dialog {
    border-radius: 10px;
    .el-dialog__header {
      padding: 32px 32px 10px 32px;
    }
    .el-dialog__body {
      max-height: 450px;
      overflow: auto;
    }
    .cancel {
      background: #fff;
      border-radius: 6px;
      border-color: rgba(0, 0, 0, 0.1);
      text-align: center;
      width: 90px;
      padding: 10px 20px;
    }
    .certain.el-button {
      width: 90px;
      padding: 10px 20px;
      background: #005eeb;
      border-color: #005eeb;
      border-radius: 6px;
      box-shadow: 0px 5px 10px 0px rgba(0, 102, 255, 0.2);
      span {
        color: #fff;
      }
    }
  }
}
</style>
