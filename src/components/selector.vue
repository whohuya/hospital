<template>
  <el-select
    :class="{select:column==25,isSelect:column!=25}"
    ref="select"
    :value="value"
    :placeholder="placeholder"
    @change="handleChange"
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="multiple"
    :disabled='disabled'
    filterable
    :remote='remote'
    clearable
  >
    <el-option
      :label="selectAll===true?'全部':selectAll"
      value
      v-if="selectAll"
    />
    <el-option
      v-for="(item,index) in _optionList"
      :key="index"
      :label="object?item:item[labelProp]"
      :value="object?item:item[valueProp]"
      :title="object?item:item[labelProp]"
    ></el-option>
  </el-select>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [String, Array, Object, Number],
    placeholder: {
      type: String,
      default: '请选择'
    },
    remote: {
      type: Boolean,
      default: false
    },
    column: {
      type: Number,
      default: 25
    },
    filterable: true,
    labelProp: {
      type: String,
      default: 'label'
    },
    valueProp: {
      type: String,
      default: 'value'
    },
    searchKey: String,
    multiple: Boolean,
    initList: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: Array,
    fn: [Function, Boolean],
    selectAll: Boolean,
    object: Boolean
  },
  data () {
    return {
      loading: false,
      options_self: []
    }
  },
  computed: {
    _optionList () {
      const _o = this.options_self
      const l = _o && _o.length
      const o = this.options
      if (l) {
        return _o
      } else if (o) {
        return o
      } else {
        return []
      }
    }
  },
  methods: {
    async remoteMethod () {
      if (!this.fn) return
      let conditions = {}
      this.$nextTick(() => {
        const value = this.$refs.select.query
        conditions[this.searchKey] = value
        if (value) {
          this.getList(conditions)
        } else {
          this.options_self = []
        }
      })
    },
    async getList (conditions = {}) {
      this.loading = true
      this.options_self = await this.fn(conditions)
      this.loading = false
    },
    handleChange (value) {
      this.$emit('change', value)
    }
  },
  mounted () {
    this.initList && this.getList()
  }
}
</script>
<style lang="scss">
.select {
  .el-select {
    width: 210px;
  }
}
</style>
