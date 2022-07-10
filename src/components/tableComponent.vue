<template>
    <el-table
            :data="data"
            :border="true"
            :size="size"
            @selection-change="handleSelectionChange"
            @select="handleSelection"
            @select-all="handleSelectionAll"
            :header-row-class-name="tableHeader"
            :row-class-name="tableCell"
            ref="table"
            :class="{tableHeightSet:tableHeightSet}"
            :max-height="maxHeight"
    >
        <el-table-column v-if="isSelection" :type="selection" width="55"></el-table-column>
        <el-table-column
                :prop="col.prop"
                :label="col.label"
                v-for="(col, coli) in columns"
                :key="coli"
                :min-width="col.width|calcWidth(col)"
                :formatter="col.formatter"
                :show-overflow-tooltip="false"
                :fixed="col.fixed"
        >
        <!--表格去掉排序功能 :sortable="!noSort" -->
            <template slot-scope="scope">
                <template v-if="col.template" >
                    <slot name="template" v-bind="scope" />
                </template>
                <template v-else-if="col.otherTemplate" >
                    <slot name="otherTemplate" v-bind="scope" />
                </template>
                <template v-else-if="col.sort">
                    <slot name="sort" v-bind="scope" />
                </template>
                <span v-else-if="col.formatter">{{col.formatter(scope.row[col.prop])|calcValue(col.default)}}</span>
                <span v-else>{{scope.row[col.prop]|calcValue(col.default)}}</span>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
    import dataModel from "@config/dataModel";
    export default {
        props: {
            data: Array,
            columns: Array,
            pageSize: {
                default: 10,
            },
            noSort: {
                type: Boolean,
            },
            isSelection: {
                type: Boolean,
            },
            pageNum: {
                default: 1,
            },
            tableClick: {
                type: Boolean,
                default: false,
            },
            isRadio: {
                type: Boolean,
                default: false,
            },
            tableHeightSet: {
                type: Boolean,
                default: true,
            },
            value: Object,
            params: {
                type: Object,
                default() {
                    return {};
                },
            },
            size: {
                default: "medium",
            },
            maxHeight:{
                type:Number
            }
        },
        data() {
            return {
                dataModel,
                radio: this.value && this.value.id,
                isInitData: true,

            };
        },
        watch: {
            columns: {
                deep: true,
                handler() {
                    this.$refs.table.doLayout();
                },
            },
            value: {
                deep: true,
                handler() {
                    this.radio = this.value && this.value.id;
                },
            },
            data: {
                deep: true,
                handler() {
                    if (this.isInitData) {
                        this.isInitData = false;
                    }
                },
            },
        },
        filters: {
            formatgoodsUnit(row, prop) {
                if (row.goodsWeightUnit == 1 || row.goodsWeightUnit == 4) {
                    return row[prop].toFixed(3) + scope.row.goodsUnit;
                } else {
                    return row[prop] + scope.row.goodsUnit;
                }
            },
            calcWidth(width, col) {
                const label = col.label;
                if (width) {
                    return width;
                } else {
                    if (label.indexOf("日期") > -1) {
                        return "120";
                    } else if (label.indexOf("名称") > -1) {
                        return "150";
                    } else {
                        const length = label.length;
                        const doubleCount =
                            label.match(/[^\x00-\xff]/gi) &&
                            label.match(/[^\x00-\xff]/gi).length;
                        const singleCount = length - doubleCount;
                        const width = doubleCount * 14 + singleCount * 7 + 40;
                        return width + (col.tooltip ? 10 : 0);
                    }
                }
            },
            calcValue(value, defaultValue) {
                defaultValue = defaultValue === void 0 ? "-" : defaultValue;
                // if (value instanceof Object) value = value.label; // 防止传入对象
                return value === undefined || value === null || value === ""
                    ? defaultValue
                    : value;
            },
            valueTransfer(cellValue) {
                switch (cellValue) {
                    case 0:
                        return "合格";
                    case 1:
                        return "装货地异常";
                    case 2:
                        return "卸货地异常";
                    case 3:
                        return "全部异常";
                    default:
                        return "";
                }
            },
        },
        computed: {
            selection() {
                return this.isSelection ? "selection" : "";
            },
        },
        methods: {
            tableHeader(){
                return 'table-header-row'
            },
            tableCell(){
                return 'table-cell'
            },
            tableComponentOb(rows) {
                let rowsStr = rows.map((pre) => {
                    return pre.id;
                });
                let list = this.data.filter((ele) => rowsStr.indexOf(ele.id) >= 0);
                list.forEach((row) => {
                    this.$refs.table.toggleRowSelection(row);
                });
            },
            handleSelectionAll() {},
            handleSelection() {},
            handleSelectionChange(val) {
                this.$emit("selectChange", val);
            },

        },
    };
</script>
<style lang="scss">
    .table-header-row{
        th{
            background: #F9F9F9;
            text-align: center;
            .cell{
                color: #6D7278;
                font-size: 12px;
            }
        }
    }
    .table-cell{
        td{
            text-align: center;
            .cell{
               span{
                   color: #1C2434;
                   font-size: 12px;
               }
            }
        }
    }
</style>

