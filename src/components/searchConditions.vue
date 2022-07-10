<template>
  <div class="conditions">
    <!--下拉框1:走接口2:走dataModel-->
    <!--在这里添加查询条件-->
    <!--输入框-->
    <!--文章管理-->
    <search-input
      label="文章标题"
      v-if="_config.title"
      v-model="conditions.title"
      placeholder="文章标题"
    />
    <search-selector
      label="文章位置"
      v-if="_config.articlePostion"
      v-model="conditions.articlePostion"
      :options="articlePostion"
      searchKey="value"
    />

    <search-selector
      label="状态"
      v-if="_config.articleStatus"
      v-model="conditions.articleStatus"
      :options="articleStatus"
      searchKey="value"
    />

    <search-input
      label="问题名称"
      v-if="_config.problemName"
      v-model="conditions.problemName"
      placeholder="问题名称"
    />
    <search-selector
      label="状态"
      v-if="_config.problemStatus"
      v-model="conditions.problemStatus"
      :options="problemStatus"
      searchKey="value"
    />
    <search-input
      label="图片名称"
      v-if="_config.imgName"
      v-model="conditions.imgName"
      placeholder="图片名称"
    />
    <search-selector
      label="图片位置"
      v-if="_config.imgPostion"
      v-model="conditions.imgPostion"
      :options="imgPostion"
      searchKey="value"
    />
    <search-selector
      label="状态"
      v-if="_config.imgStatus"
      v-model="conditions.imgStatus"
      :options="imgStatus"
      searchKey="value"
    />
    <!-- <search-input
      label="手机号"
      v-if="_config.phone"
      v-model="conditions.phone"
      placeholder="手机号"
    /> -->

    <!-- <search-input
      label="集团名称"
      v-if="_config.groupName"
      v-model="conditions.groupName"
      placeholder="集团名称"
    />
    <search-input
      label="厂区名称"
      v-if="_config.factoryName"
      v-model="conditions.factoryName"
      placeholder="集团名称"
    />
    <search-input
      label="组织名称"
      v-if="_config.organizeName"
      v-model="conditions.organizeName"
      placeholder="组织名称"
    />
    <search-input
      label="部门名称"
      v-if="_config.departmentName"
      v-model="conditions.departmentName"
      placeholder="部门名称"
    /> -->
    <search-input
      label="手机号"
      v-if="_config.telephone"
      v-model="conditions.telephone"
      placeholder="手机号"
    />
    <search-input
      label="反馈内容"
      v-if="_config.projectName"
      v-model="conditions.projectName"
      placeholder="反馈内容"
    />
    <!-- <search-input
      label="工号"
      v-if="_config.employeeNum"
      v-model="conditions.employeeNum"
      placeholder="工号"
    /> -->
    <!-- <search-input
      label="姓名"
      v-if="_config.userName"
      v-model="conditions.userName"
      placeholder="姓名"
    /> -->
    <!-- <search-input
      label="角色名称"
      v-if="_config.roleName"
      v-model="conditions.roleName"
      placeholder="角色名称"
    /> -->
    <!-- <search-input
      label="菜单名称"
      v-if="_config.menuName"
      v-model="conditions.menuName"
      placeholder="菜单名称"
    /> -->
    <!-- <search-input
      label="功能名称"
      v-if="_config.funName"
      v-model="conditions.funName"
      placeholder="菜单名称"
    /> -->
    <search-input
      label="小程序名称"
      v-if="_config.appletsName"
      v-model="conditions.appletsName"
      placeholder="小程序名称"
    />

    <!-- <search-selector
      label="消息类型"
      v-if="_config.type"
      v-model="conditions.msgType"
      :fn="getMsgType"
      valueProp="id"
      labelProp="name"
      searchKey="id"
      initList
    /> -->
    <search-selector
      label="消息类型"
      v-if="_config.msgType"
      v-model="conditions.msgType"
      valueProp="value"
      labelProp="label"
      searchKey="value"
      :options="messageTypeOptions"
    />
    <search-selector
      label="消息接收人"
      v-if="_config.sendScope"
      v-model="conditions.sendScope"
      valueProp="value"
      labelProp="label"
      searchKey="value"
      :options="msgGetters"
    />
    <search-selector
      label="发送状态"
      v-if="_config.isSent"
      v-model="conditions.isSent"
      valueProp="value"
      labelProp="label"
      searchKey="value"
      :options="sentStateOptions"
    />

    <!-- <search-selector
      label="所属组织"
      v-if="_config.organize"
      v-model="conditions.organize"
      :fn="getOrganize"
      valueProp="id"
      labelProp="name"
      searchKey="id"
      initList
    />
    <search-selector
      label="所属集团"
      v-if="_config.company"
      v-model="conditions.company"
      :fn="getCompany"
      valueProp="id"
      labelProp="name"
      searchKey="id"
      initList
    />
    <search-selector
      label="所属厂区"
      v-if="_config.factory"
      v-model="conditions.factory"
      :fn="getFactory"
      valueProp="id"
      labelProp="name"
      searchKey="id"
      initList
    />
    <search-selector
      label="所属项目"
      v-if="_config.project"
      v-model="conditions.project"
      :fn="getProject"
      valueProp="id"
      labelProp="name"
      searchKey="id"
      initList
    />
    <search-selector
      label="认证类型"
      v-if="_config.authenticationType"
      v-model="conditions.authenticationType"
      valueProp="value"
      labelProp="label"
      searchKey="value"
      :options='authenticationTypeOptions'
    />
    <search-selector
      label="认证状态"
      v-if="_config.authStatus"
      v-model="conditions.authStatus"
      valueProp="value"
      labelProp="label"
      searchKey="value"
      :options='authStatusOptions'
    />

    <search-selector
      label="用户状态"
      v-if="_config.userState"
      v-model="conditions.userState"
      valueProp="value"
      labelProp="label"
      searchKey="value"
      :options='stateOptions'
    /> -->
    <el-col
      :span="25"
      v-if="_config.sendTimeBegin && _config.sendTimeEnd"
      class="date-pick"
    >
      <label class="el-form-item__label">发送时间</label>
      <el-form-item class="form-item-inline">
        <!--   placeholder="开始" -->
        <el-date-picker
          v-model="conditions.sendTimeBegin"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeRegisterStart(conditions.sendTimeEnd)"
          @blur="
            getFocusRegisterStart(
              conditions.sendTimeBegin,
              conditions.sendTimeEnd
            )
          "
          :clearable="false"
          :editable="false"
          ref="dateRegisterStart"
          class="dateSelect"
        >
          <!-- :picker-options="beginDate(conditions.sendTimeEnd)" --> </el-date-picker
        ><span class="el-range-separator">至</span>
        <!-- placeholder="结束" -->
        <el-date-picker
          v-model="conditions.sendTimeEnd"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeRegisterEnd(conditions.sendTimeBegin)"
          @blur="
            getFocusRegisterEnd(
              conditions.sendTimeBegin,
              conditions.sendTimeEnd
            )
          "
          :clearable="false"
          :editable="false"
          ref="dateRegisterFinish"
          class="dateSelect"
          :picker-options="pickerOptionsEnd"
        >
          <!--  :picker-options="finishDate(conditions.sendTimeBegin)" -->
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col
      :span="25"
      v-if="_config.createTimeBegin && _config.createTimeEnd"
      class="date-pick"
    >
      <label class="el-form-item__label">反馈时间</label>
      <el-form-item class="form-item-inline">
        <el-date-picker
          v-model="conditions.createTimeBegin"
          type="datetime"
          placeholder="开始"
          :picker-options="beginDate(conditions.createTimeEnd)"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeStart(conditions.createTimeEnd)"
          @blur="
            getFocusStart(conditions.createTimeBegin, conditions.createTimeEnd)
          "
          :clearable="false"
          :editable="false"
          ref="dateStart"
          class="dateSelect"
        >
        </el-date-picker
        ><span class="el-range-separator">至</span>
        <el-date-picker
          v-model="conditions.createTimeEnd"
          type="datetime"
          placeholder="结束"
          :picker-options="finishDate(conditions.createTimeBegin)"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeEnd(conditions.createTimeBegin)"
          @blur="
            getFocusEnd(conditions.createTimeBegin, conditions.createTimeEnd)
          "
          :clearable="false"
          :editable="false"
          ref="dateFinish"
          class="dateSelect"
        >
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col
      :span="25"
      v-if="_config.syncStartTime && _config.syncEndTime"
      class="date-pick"
    >
      <label class="el-form-item__label">同步时间</label>
      <el-form-item class="form-item-inline">
        <el-date-picker
          v-model="conditions.syncStartTime"
          type="datetime"
          placeholder="开始"
          :picker-options="beginDate(conditions.syncEndTime)"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeStart(conditions.syncEndTime)"
          @blur="
            getFocusStart(conditions.syncStartTime, conditions.syncEndTime)
          "
          :clearable="false"
          :editable="false"
          ref="dateStart"
          class="dateSelect"
        >
        </el-date-picker
        ><span class="el-range-separator">至</span>
        <el-date-picker
          v-model="conditions.syncEndTime"
          type="datetime"
          placeholder="结束"
          :picker-options="finishDate(conditions.syncStartTime)"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeEnd(conditions.syncStartTime)"
          @blur="getFocusEnd(conditions.syncStartTime, conditions.syncEndTime)"
          :clearable="false"
          :editable="false"
          ref="dateFinish"
          class="dateSelect"
        >
        </el-date-picker>
      </el-form-item>
    </el-col>

    <el-col
      :span="25"
      v-if="_config.publishiStartTime && _config.publishiEndTime"
      class="date-pick"
    >
      <label class="el-form-item__label">发版时间</label>
      <el-form-item class="form-item-inline">
        <el-date-picker
          v-model="conditions.publishiStartTime"
          type="datetime"
          placeholder="开始"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeStart(conditions.publishiEndTime)"
          @blur="
            getFocusStart(
              conditions.publishiStartTime,
              conditions.publishiEndTime
            )
          "
          :clearable="false"
          :editable="false"
          ref="dateStart"
          class="dateSelect"
        >
          <!--    :picker-options="beginDate(conditions.publishiEndTime)" --> </el-date-picker
        ><span class="el-range-separator">至</span>
        <el-date-picker
          v-model="conditions.publishiEndTime"
          type="datetime"
          placeholder="结束"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeEnd(conditions.publishiStartTime)"
          @blur="
            getFocusEnd(
              conditions.publishiStartTime,
              conditions.publishiEndTime
            )
          "
          :clearable="false"
          :editable="false"
          ref="dateFinish"
          class="dateSelect"
          :picker-options="publishTime"
        >
          <!-- :picker-options="finishDate(conditions.publishiStartTime)" -->
          <!--  -->
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col
      :span="25"
      v-if="_config.createProblemTimeBegin && _config.createProblemTimeEnd"
      class="date-pick"
    >
      <label class="el-form-item__label">创建时间</label>
      <el-form-item class="form-item-inline">
        <el-date-picker
          v-model="conditions.createProblemTimeBegin"
          type="datetime"
          placeholder="开始"
          :picker-options="beginDate(conditions.createTimeEnd)"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeStart(conditions.createTimeEnd)"
          @blur="
            getFocusStart(
              conditions.createProblemTimeBegin,
              conditions.createTimeEnd
            )
          "
          :clearable="false"
          :editable="false"
          ref="dateStart"
          class="dateSelect"
        >
        </el-date-picker
        ><span class="el-range-separator">至</span>
        <el-date-picker
          v-model="conditions.createTimeEnd"
          type="datetime"
          placeholder="结束"
          :picker-options="finishDate(conditions.createProblemTimeBegin)"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeEnd(conditions.createProblemTimeBegin)"
          @blur="
            getFocusEnd(
              conditions.createProblemTimeBegin,
              conditions.createTimeEnd
            )
          "
          :clearable="false"
          :editable="false"
          ref="dateFinish"
          class="dateSelect"
        >
        </el-date-picker>
      </el-form-item>
    </el-col>
    <!--下拉选择框-->

    <search-selector
      label="状态"
      v-if="_config.status"
      v-model="conditions.status"
      :fn="getStatus"
      valueProp="id"
      labelProp="name"
      searchKey="id"
      initList
    />
    <div>
      <slot name="searchBtn" />
    </div>
  </div>
</template>

<script>
import { getResult } from "@config/interface";
import {
  msgGetters,
  messageTypeOptions,
  authStatusOptions,
  authenticationTypeOptions,
  stateOptions,
  sentStateOptions,
  articleStatus,
  problemStatus,
  imgStatus,
  imgPostion,
  articlePostion,
} from "@config/options";
// import { authStatusOptions, authenticationTypeOptions, stateOptions, sentStateOptions, articleStatus, problemStatus,  } from '@config/options'
import searchInput from "@components/searchInput";
import searchSelector from "@components/searchSelector";

// import SearchInput from './searchInput.vue';
function setConditions(config) {
  let conditions = {};
  for (const key of config) {
    // console.log(key)
    // var arr = ['userType','status','moneystatus','productstatus','accountNumStatus','articleStatus','enableStatus'];
    // if(arr.includes(key)){
    //   conditions[key] = [''];
    // }
    conditions[key] = "";
  }
  return conditions;
}
export default {
  components: {
    searchInput,
    searchSelector,
  },
  model: {
    prop: "conditions",
    event: "change",
  },
  props: {
    config: {
      default() {
        return [];
      },
    },
    // 表单验证规则
    rules: Object,
  },
  data() {
    return {
      conditions: {},
      authStatusOptions,
      stateOptions,
      authenticationTypeOptions,
      sentStateOptions,
      articleStatus,
      problemStatus,
      messageTypeOptions,
      msgGetters,
      imgStatus,
      imgPostion,
      articlePostion,
       pickerOptionsEnd: {
      disabledDate: time => {
        const beginDateVal = new Date(this.conditions.sendTimeBegin).getTime();
        if (beginDateVal) {
          return time.getTime() < beginDateVal - 0;
        }
      },
    },
    publishTime: {
      disabledDate: time => {
        const beginDateVal = new Date(this.conditions.publishiStartTime).getTime();
        if (beginDateVal) {
          return time.getTime() < beginDateVal - 0;
        }
      },
    },
    };
  },
  computed: {
    _config() {
      let that = this;
      const config = this.config;
      let _result = {};
      if (typeof config === "object") {
        for (const key in config) {
          if (config.hasOwnProperty(key)) {
            //判断对象中是否包含指定的属性，返回boolean值
            const options = config[key];
            if (typeof options === "string") {
              _result[options] = true;
            } else {
              if (options.model) {
                _result[options.model] = options;
                if (options.multiple) {
                  if (!this.params[options.model]) {
                    this.$set(this.params, options.model, []);
                  }
                }
              } else {
                _result[key] = options;
              }
            }
          }
        }
      } else {
        Error("type error");
      }
      that.conditions = setConditions(this.config);
      return _result;
    },
  },
  watch: {
    conditions: {
      handler() {
        this.updateCondition();
      },
      deep: true,
    },
  },
  methods: {
   

    getMsgGeter() {},

    //状态
    getStatus() {},
    getSendState() {},

    //API对接系统
    getDockingSystem() {},
    //API状态
    getInterfaceStatus() {},
    //车台型号
    getcarType() {},
    //车辆状态
    getcarStatus() {},
    //分公司
    getBranch() {},
    //重置
    resetParams() {
      this.conditions = setConditions(this.config);
    },
    // //三级联动
    updateCondition() {
      const c = this.conditions;
      this.$emit("change", c);
    },
    init() {
      this.updateCondition();
    },

    //开始时间小于等于结束时间
    beginDate(value) {
      let endTime = value;
      return {
        disabledDate(time) {
          if (endTime) {
            return (
              new Date(endTime).getTime() < time.getTime() ||
              time.getTime() > Date.now()
            );
          } else {
            return time.getTime() > Date.now(); //开始时间不选时，结束时间最大值小于等于当天
          }
        },
      };
    },

    //结束时间必须大于等于开始时间
    finishDate(value) {
      let startTime = value;
      return {
        disabledDate(time) {
          if (startTime) {
            return (
              new Date(startTime).getTime() > time.getTime() ||
              time.getTime() > Date.now()
            );
          } else {
            return time.getTime() > Date.now(); //开始时间不选时，结束时间最大值小于等于当天
          }
        },
      };
    },
    changeStart(value) {
      console.log(value, "start");
      if (!value) {
        this.$refs.dateFinish.focus();
      }
    },
    changeEnd(value) {
      if (!value) {
        this.$refs.dateStart.focus();
      }
    },

    changeRegisterStart(value) {
      console.log(value, "start");
      if (!value) {
        this.$refs.dateRegisterFinish.focus();
      }
    },
    changeRegisterEnd(value) {
      if (!value) {
        this.$refs.dateRegisterStart.focus();
      }
    },
    getFocusStart(start, end) {
      console.log(start, end);
      if (!start && end) {
        this.conditions.createTimeBegin = "";
        this.conditions.createTimeEnd = "";
      }
    },
    getFocusEnd(start, end) {
      if (start && !end) {
        this.conditions.createTimeBegin = "";
        this.conditions.createTimeEnd = "";
      }
    },
    getFocusRegisterStart(start, end) {
      console.log(start, end);
      if (!start && end) {
        this.conditions.sendTimeBegin = "";
        this.conditions.sendTimeEnd = "";
      }
    },
    getFocusRegisterEnd(start, end) {
      if (start && !end) {
        this.conditions.sendTimeBegin = "";
        this.conditions.sendTimeEnd = "";
      }
    },
  },
  getFocusRegisterEnd(start, end) {
    if (start && !end) {
      this.conditions.registrationTimeStart = "";
      this.conditions.registrationTimeEnd = "";
    }
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss">
.date-pick {
  .el-form-item__label {
    width: 90px;
  }
  .el-range-separator {
    font-size: 12px;
    line-height: 28px;
    padding: 0 5px;
  }
  .el-input {
    width: 178px;
  }
}
.conditions {
  .el-form-item {
    margin-bottom: 8px;
  }
}
</style>
