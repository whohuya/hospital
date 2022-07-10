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
    <el-form
      :model="form"
      ref="form"
      label-width="100px"
      :rules="rules"
      class="clearfix"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item prop="title" label="消息标题">
            <el-input
              type="text"
              placeholder="请输入消息标题"
              v-model="form.title"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="type" label="消息类型">
            <el-select v-model="form.type" filterable placeholder="请选择">
              <el-option label="系统消息" :value="1"></el-option>
              <el-option label="营销消息" :value="2"></el-option>
              <el-option label="支付消息" :value="3"></el-option>
              <!-- <el-option
                v-for="item in messageTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="content" label="消息内容">
            <el-input
              type="text"
              placeholder="请输入消息内容"
              v-model="form.content"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="sendScope" label="消息接收人">
            <!-- <div style="text-align: center"> -->
            <el-radio-group v-model="form.sendScope">
              <el-radio :label="1" @change="allUser">全部用户</el-radio>
              <el-radio :label="2" @change="otherUser">部分用户</el-radio>
            </el-radio-group>
            <!-- <el-transfer
              filterable
              :filter-method="filterMethod"
              filter-placeholder="请输入城市拼音"
              v-model="value"
              :data="data"
              :titles="['可选用户', '已选用户']"
              @change="handleChange"
              v-if="!isShow"
            >
            </el-transfer> -->
            <!--  filterable -->
            <el-transfer
              filterable
              v-model="selecvalue"
              :data="transferData"
              :titles="['可选用户', '已选用户']"
              v-if="!isShow"
              @change="handleChange"
            >
              <!-- <div class="block" slot="left-footer">
                <el-pagination layout="prev, pager, next" :total="1000">
                </el-pagination>
              </div> -->
            </el-transfer>
            <!--  :filter-method="serchMethod" -->
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="sendMethod" label="发送时间">
            <el-radio-group v-model="form.sendMethod">
              <el-radio :label="1" @change="nowTime">实时</el-radio>
              <el-radio :label="2" @change="timing">定时</el-radio>
              <!-- <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker> -->
              <el-date-picker
                type="datetime"
                placeholder="选择时间"
                v-model="form.sendTime"
                @change="selectTime"
                v-if="!isSelect"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </textDialog>
</template>

<script>
import textDialog from "@components/textDialog";
import { departmentAddRules } from "@utils/rules";
import { messageTypeOptions } from "@config/options";
import searchSelector from "@/components/searchSelector";
import { mapState } from "vuex";
export default {
  name: "msgAdd",
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
      // serchMethod(query, item) {
      //   return item;
      //   // console.log(query,item)
      // },
      selecvalue: [],
      // filterMethod(query, item) {
      //     return item.pinyin.indexOf(query) > -1;
      //   },
      //源列表的数据 （source)
      transferData: [],
      messageTypeOptions,
      organizeOptions: [],
      options: [],
      valueSet: false,
      btnLoading: false,
      rules: { ...departmentAddRules },
      footerShow: "保存",
      handleLoadFlag: false,
      keyAdd: 0,
      resource: "", //单选按钮
      userResource: "",
      date2: "",
      isSelect: true,
      isShow: true,
      pickerOptions: {
        // 限制收货时间不让选择今天以前的
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      dataValue: [
        { name: "123", tel: "33333" },
        { name: "456", tel: "123456" },
      ],
      selecttelephones: [],
      trueValue: "",
      pageSize: 30,
      pageNum: 1,
      total: 0,
      params: {},
    };
  },
  watch: {
    innerVisible: {
      handler(val) {
        if (val) {
          this.organizeOptions = [];
          this.getOrgOption(2);
        }
      },
      immediate: true,
    },
  },
  computed: {
    dialogText() {
      return this.modify ? "编辑消息" : "新增消息";
    },
    ...mapState({
      msgSetting: (state) => state.msgSetting,
    }),
    paramObj() {
      let {
        content,
        id,
        sendMethod,
        sendScope,
        title,
        type,
        audienceIds,
        sendTime,
        audienceList,
      } = this.form;

      let params = this.modify
        ? {
            content,
            id,
            sendMethod,
            sendScope,
            title,
            type,
            audienceIds,
            sendTime,
            audienceList,
          }
        : {
            content,
            sendMethod,
            sendScope,
            title,
            type,
            audienceIds,
            sendTime,
          };
      return params;
    },
  },
  methods: {
    // serchMethod(query, item) {
    //   return item
    //   console.log(query,item)
    // },
    async findUser() {
      // this.selecttelephones=this.form.audience
      let param = {
        isItSelected: false,
        telephones: this.selecttelephones,
        telephoneLike: "",
        page: 1,
        size: 30,
      };
      const res = await this.API.bussiness.systemUser(param);
      console.log("222", res);
      if (res.success == true) {
        let data = [];
        let allData = res.entity.content;
        allData.forEach((member, index) => {
          data.push({
            label: member.nickname,
            key: member.telephone,
          });
        });
        // 接口总数据筛选出来的新数组赋值给transferData
        this.transferData = data;
        var array = this.form.audience.split(",");
        this.selecvalue = array;
      } else {
        this.$message.error("接口表字段查询失败");
      }
    },
    async findotherUser() {
      this.selecttelephones = this.form.audience;
      console.log(this.selecttelephones);
      // let totalShuju = [];
      // tellll.map((index) => {
      //   console.log(index.telephone);
      //   totalShuju.push(index.telephone);
      // });
      // let arr = totalShuju.toString();
      // this.trueValue = arr.toString();
      // console.log(totalShuju);
      let param = {
        isItSelected: true,
        telephones: this.selecttelephones,
          page: 1,
        size: 30,
        // telephoneLike: "",
      };
      console.log("参数", param);
      const res = await this.API.bussiness.systemUser(param);
      console.log("222", res);
      if (res.success == true) {
        let data = [];
        let allData = res.entity.content;
        allData.forEach((member, index) => {
          data.push({
            label: member.nickname,
            key: member.telephone,
          });
        });
        // 接口总数据筛选出来的新数组赋值给transferData
        // this.transferData = data;
      } else {
        this.$message.error("接口表字段查询失败");
      }
    },
      async findallUser() {
      this.selecttelephones = this.form.audience;
      console.log(this.selecttelephones);
      // let totalShuju = [];
      // tellll.map((index) => {
      //   console.log(index.telephone);
      //   totalShuju.push(index.telephone);
      // });
      // let arr = totalShuju.toString();
      // this.trueValue = arr.toString();
      // console.log(totalShuju);
      let param = {
        isItSelected: false,
        telephones: this.selecttelephones,
          page: 1,
        size: 30,
        telephoneLike: "",
      };
      console.log("参数", param);
      const res = await this.API.bussiness.systemUser(param);
      console.log("222", res);
      if (res.success == true) {
        let data = [];
        let allData = res.entity.content;
        allData.forEach((member, index) => {
          data.push({
            label: member.nickname,
            key: member.telephone,
          });
        });
        // 接口总数据筛选出来的新数组赋值给transferData
        // this.transferData = data;
      } else {
        this.$message.error("接口表字段查询失败");
      }
    },

    handleChange(value, direction, movedKeys) {
      console.log("一共选的值", value, "222", direction, movedKeys);
      this.selecttelephones = value;
      var arr = [];
      if (value != null && value.length != 0) {
        for (var i = 0; i < value.length; i++) {
          arr.push(value[i]);
        }
      }

      this.trueValue = arr.toString();
      this.paramObj.audienceIds = arr.toString();

      console.log(this.paramObj.audienceIds);
    },
    //  async clickTitle(id) {
    //    console.log(this.form.content)
    //   const result = await this.API.bussiness.articalContent({}, id);
    //   if (result.success == true) {
    //     this.paramObj.content = result.entity.content;
    //   }
    // },
    // filterMethod(query, item) {
    //   console.log(query, item);
    // },

    nowTime() {
      console.log("1");
      this.isSelect = true;
      this.paramObj.sendTime = "";
    },
    timing() {
      console.log("2");
      this.isSelect = false;
      // console.log(this.date2);
    },
    selectTime() {
      // console.log(this.date2);
    },
    allUser() {
      this.isShow = true;
    },
    otherUser() {
      this.isShow = false;
      console.log(this.dialogText);
      this.findUser();
      this.findotherUser();
      this.findallUser()
      // this.findUser();
      // if (this.dialogText == "新增消息") {
      //   this.findUser();
      // }
      // if(this.dialogText =="编辑消息"){
      //   this.findotherUser();
      // }
    },
    close() {
      this.$emit("close", false); //关闭
      this.$emit("input", {});
      this.$emit("modifyClose");
      this.$refs["form"].resetFields();
    },
    //保存
    btnSave() {
      this.btnLoading = true;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.handleOrg();
          return;
        } else {
          this.btnLoading = false;
          return false;
        }
      });
    },
    //添加||编辑
    async handleOrg() {
      console.log(this.paramObj.audienceIds);
      //  this.handleChange()
      console.log(this.trueValue);
      this.paramObj.audienceIds = this.trueValue;
      console.log(this.paramObj, "22222");
      let api = this.modify
        ? this.API.bussiness.msgEdit
        : this.API.bussiness.msgAdd;
      const res = await api(this.paramObj);
      if (res.success == true) {
        this.keyAdd = this.msgSetting;
        this.keyAdd++;
        this.$store.commit("msgDelet", this.keyAdd);
        this.$emit("close", false);
        this.$emit("input", {});
        this.$emit("modifyClose");
        this.$message({
          message: "保存成功",
          type: "success",
        });
      }
      this.btnLoading = false;
    },
    async getOrgOption(type) {},
  },
  mounted() {
    // this.filterMethod();
    //  this.getTransfer()
    // let data = [];
    //     let allData = this.form.audienceList;
    //     allData.forEach((member, index) => {
    //       data.push({
    //         label: member.name,
    //         key: member.telephone,
    //         id:index
    //       });
    //     });

    //     // 接口总数据筛选出来的新数组赋值给transferData
    //     this.selecvalue = data.id;
    //     console.log(this.selecvalue)
    if (this.form.sendScope == 2) {
      this.otherUser();
      // this.value==scope.audienceList
    }
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
.add-dialog .el-col .el-form-item .el-form-item__content .el-input,
.add-dialog .el-col .el-form-item .el-form-item__content .el-textarea,
.add-dialog .el-col .el-form-item .el-form-item__content .el-select {
  height: 20px;
}
.add-dialog
  .el-col
  .el-form-item
  .el-form-item__content
  .el-input
  .el-input__suffix
  .el-input__icon,
.add-dialog
  .el-col
  .el-form-item
  .el-form-item__content
  .el-textarea
  .el-input__suffix
  .el-input__icon,
.add-dialog
  .el-col
  .el-form-item
  .el-form-item__content
  .el-select
  .el-input__suffix
  .el-input__icon {
  line-height: 20px;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 24px;
}
</style>
