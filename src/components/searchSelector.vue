<template>
  <el-col :span="column">
    <el-form-item
      v-bind="{ label, prop }"
      class="form-item-inline"
    >
      <selector
        v-bind="{ value, fn,column, valueProp,disabled, labelProp,remote, searchKey, multiple, placeholder, initList, options, selectAll ,object}"
        @change="handleChange"
        ref="selector"
      />
    </el-form-item>
  </el-col>
</template>
<script>
import selector from "./selector";
export default {
  model: {
    prop: "value",
    event: "change"
  },
  components: {
    selector
  },
  props: {
    column: {
      type: Number,
      default: 25
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: String,
    value: [String, Array, Object, Number],
    fn: Function,
    remote: Boolean,
    valueProp: String,
    labelProp: String,
    searchKey: String,
    multiple: Boolean,
    placeholder: String,
    object: Boolean,
    initList: Boolean,
    options: Array,
    prop: String,
    filterable: {
      type: Boolean,
      default: true,
    },
    selectAll: Boolean
  },
  methods: {
    handleChange (value) {
      this.$emit("change", value);
    },
  }
};
</script>
<style lang="scss" scoped>
.form-item-inline {
  .el-select {
    width: 100%;
  }
}
</style>
