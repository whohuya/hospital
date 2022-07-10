<template>
  <div class="search-page">
    <!--搜索条件输入框-->
    <div
      class="search-container"
      :class="{searchMore:searchMore,selectMore:selectMore}"
      v-if="conditions"
    >
      <el-form
        class="demo-form-inline el-card"
        :inline="true"
        :model="params"
        ref="conditionForm"
      >
        <search-conditions
          ref="searchConditions"
          :rules="rules"
          v-model="params"
          :config="conditions"
        >
          <div slot="searchBtn">
            <div class='search-btn'>
              <el-button
                class="btn-reset"
                type="refresh"
                @click="handleReset"
              ><i class="el-icon-refresh-left"></i>重置</el-button>
              <el-button
                class="btn-search"
                type="search"
                @click="searchfunc"
                
              ><i class="el-icon-search"></i> 查询</el-button>
            </div>
          </div>
        </search-conditions>
      </el-form>

      <div
        class="search-more"
        v-if="selectMore"
      >
        <el-button
          type="search-more"
          @click="searchMore=!searchMore"
        >
          <span
            v-if="!searchMore"
            class="show-search-down"
          >展开<i class="el-icon-arrow-down"></i> </span>
          <span
            v-if="searchMore"
            class="show-search-up"
          >收起<i class="el-icon-arrow-up"></i> </span>
        </el-button>
      </div>
    </div>
    <div
      class="search-result container"
      ref="searchRes"
      id="anchor_search-result"
    >
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix btn-box"
          ref="tabHeader"
        >
          <div
            class="define-btn"
            v-for="(btn,index) in defineBtn"
            :key="index"
          >
            <el-button
              :type="btn.type?btn.type:''"
              class="btn-default"
              :icon="btn.class"
              @click="btn.func"
            >{{btn.name}}</el-button>
          </div>
          <importExcel
            class="define-btn"
            v-if="exportBtn"
            :btnText="exportBtn"
          />
          <!--导入excel按钮-->
        </div>
        <table-component
          :data="records"
          :columns="columns"
          :pageSize="pageSize"
          :pageNum="pageNum"
          :params="params"
          :isSelection='isSelection'
          :tableClick='tableClick'
          @selectChange='selectChange'
          v-loading="loading"
          :noSort='noSort'
          ref="tableComponentOb"
          :key='flagSetting'
          :maxHeight="maxHeight"
        >
          <template
            slot="template"
            slot-scope="scope"
          >
            <slot
              name="table"
              v-bind="scope"
            />
          </template>
          <template
            slot="otherTemplate"
            slot-scope="scope"
          >
            <slot
              name="other"
              v-bind="scope"
            />
          </template>
          <template
            slot="sort"
            slot-scope="scope"
          >
            <slot
              name="third"
              v-bind="scope"
            />
          </template>
        </table-component>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[30, 50, 100,300]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <slot name="bottom" />
      </el-card>
    </div>
  </div>
</template>
<script>
import searchConditions from '@components/searchConditions';
import tableComponent from '@components/tableComponent';
import importExcel from "@components/import";
import { formatConditions } from '@utils/dataFun';
export default {
  components: {
    searchConditions,
    tableComponent, importExcel
  },
  props: {
    // 是否初始化查询
    init: Boolean,
    // 表单验证规则
    rules: Object,

    // 表头数组
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    noSort: {
      type: Boolean,
      default: true
    },
    tableClick: {
      type: Boolean,
      default: false
    },
    // 查询方法
    fn: {
      type: Function,
      default () {
        return new Promise((resolve, reject) => {
          reject('no function injected')
        })
      }
    },
    // 查询条件
    conditions: [Array, Object],
    // 查询条件重组规则
    paramsRebuild: Object,
    selectMore: {  //搜索条件收起
      type: Boolean,
      default: false
    },
    //自定义按钮
    defineBtn: {
      type: Array,
      default () {
        return []
      }
    },
    //导入Excel
    exportBtn: String,
    // 分页结构参数
    plainCondition: {
      default: false
    },
  },
  data () {
    return {
      loading: false,
      records: [],
      params: {},
      searchMore: false,
      flagSetting: 0,
      pageSize: 30,
      pageNum: 1,
      total: 0,
      lastParams: null,
      searchParams: {},
      rem_checkedTable: {},
      screenHeight: window.innerHeight,
      maxHeight: window.innerHeight - 440,
    }
  },
  watch: {
    screenHeight () {
      this.maxHeight = this.$refs.searchRes.offsetHeight - this.$refs.tabHeader.offsetHeight - 156;
    }
  },
  computed: {
    // 判断查询字段是否有重组需要
    _params () {
      const params = this.params
      const rebuild = this.paramsRebuild
      if (!rebuild) {
        this.$emit('paramChange', params);//用于页面插槽需要用搜索参数来查询数据
        return params
      }
      let res = {}
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          let value = params[key];
          let nkey = key
          for (const keyd in rebuild) {
            if (rebuild.hasOwnProperty(keyd)) {
              if (rebuild[keyd] == key) {
                nkey = keyd
              }
            }
          }
          res[nkey] = Array.isArray(value) ? value.join(',') : value
        }
      }
      this.$emit('paramChange', res)
      return res
    },
    // 组装分页结构
    _conditions () {
      let c = {}
      let p = JSON.parse(JSON.stringify(this._params))
      const params = formatConditions(p)
      const pageSize = this.pageSize
      const pageIndex = this.pageNum
      const plainCondition = this.plainCondition
      if (plainCondition) {
        if (plainCondition === 'clean') {
          c = { ...params, currentPage: pageSize, pageIndex }
        } else if (plainCondition === 'current,size') {
          c = { ...params, size: pageSize, current: pageIndex, total: 0 }
        } else {
          c = { param: { ...params, pageSize, currentPage: pageIndex } }
        }
      } else {
        params.page = pageIndex
        params.size = pageSize
        c = params
      }
      // console.log(params,'params')
      return c
    },
  },

  methods: {
    selectChange (val) {//单选事件
      this.checkedTable = val
      this.rem_checkedTable[this.pageNum] = this.checkedTable
      this.$parent.selectChange(val)
    },
    //重置
    handleReset () {
      this.rem_checkedTable = {}
      this.$refs.tableComponentOb.tableComponentOb([])
      this.$refs.searchConditions.resetParams();
      this.flagSetting++;
      this.$nextTick(() => {
        this.searchData();
      })
    },
    // 查询
    searchfunc () {
      let flag = false;
      for (let i in this.params) {
        if (this.params[i] !== '' && this.params[i] !== null) {
          flag = true;
        }
      }
      if (!flag) {
        this.$message.error('至少指定一个搜索条件进行查询');
        return;
      }
      this.rem_checkedTable = {}
      this.$refs.tableComponentOb.tableComponentOb([])
      this.searchData()
    },
    //分页方法
    handleSizeChange (val) {
      this.pageSize = val
      this.searchData()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.searchData()
    },
    //获取表格数据
    getdata () {
      this.fn(this.searchParams).then(res => {
        this.lastParams = JSON.stringify(this.params)
        this.loading = false
        this.searchMore = false
        // console.log("试试这里1",res)
        // 返回内容为空，跳出
        if (!res) return
        // 兼容不同接口返回形式
        const arr = res.result ? res.records : []
        // 如果返回内容不是数组，则弹出返回内容（不符合列表页数据要求）
        if (!Array.isArray(arr)) {
          return null
        }
        this.records = arr;
        this.total = (res.result ? res.total : res.total) || 0;
        this.$nextTick(() => {
          if (this.rem_checkedTable[this.pageNum]) {
            this.$refs.tableComponentOb.tableComponentOb(this.rem_checkedTable[this.pageNum])
          }
        })
      })
    },
    //查询数据
    searchForData () {
      try {
        this.loading = true
        if (this.lastParams !== JSON.stringify(this.params)) this.pageNum = 1;
        this.searchParams = this._conditions;
        this.$nextTick(() => {
          this.getdata()
        })

      } catch (e) {
        this.loading = false
        //this.$message.error('接口异常')
      }
    },
    searchData () {
      this.$refs.conditionForm.validate().then(() => {
        this.searchForData()
      })
    },
  },
  mounted () {
    this.init && this.searchData();
    window.onresize = () => {
      this.screenHeight = window.innerHeight;
    };

  }
}
</script>

<style lang='scss'>
.search-page {
  height: 100%;
  background-color: #f6f7fb !important;
  .search-container {
    padding: 25px 30px;
    background: #ffffff;
    .el-card {
      border: 0;
    }
    .search-btn {
      float: right;
      .el-button {
        padding: 10px 20px;
        &.btn-reset,
        &.btn-search,
        &:hover,
        &:focus,
        &:active {
          background: #fff;
          border-radius: 6px;
          border: 1px solid #dcdfe6;
          span {
            color: #6d7278;
            font-size: 14px;
            display: flex;
            justify-items: center;
            i {
              font-weight: bold;
              color: #bfbfbf;
              font-size: 16px;
              margin-right: 5px;
            }
          }
        }
        &.btn-search {
          background: #005eeb;
          span {
            color: #fff;
            i {
              color: #fff;
            }
          }
        }
      }
    }
    .selectMore {
      max-height: 95px;
    }
    .searchMore {
      max-height: 695px;
    }
  }
  .search-result {
    width: calc(100%);
    margin-top: 12px;
    margin-bottom: 0;
    border-radius: 6px;
    height: calc(100% - 170px);
    .box-card {
      box-shadow: none;
    }
    .define-btn {
      display: inline-block;
      margin-right: 20px;
    }
    .pagination {
      span,
      ul,
      li,
      button {
        display: inline-block;
        height: 36px;
        line-height: 36px;
      }
      text-align: right;
      padding: 20px 10px;
    }
  }
}
</style>
