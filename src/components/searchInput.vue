<template>
    <el-col :span="column" :class="{widthSet:column!=25}">
        <el-form-item v-bind="{ label,prop}" class="form-item-inline" :rules="rules" :prop="prop">
            <el-input v-bind="{placeholder,value }"  @input="handleChange" :class="{input:column==25}" :disabled='disabled' />
        </el-form-item>
    </el-col>

</template>
<script>
    export default {
        model: {
            prop: "value",
            event: "change"
        },
        components: {
        },
        props: {
            column:{
                type:Number,
                default:25
            },
            label: String,
            value: [String, Array, Object, Number],
            placeholder: {
                type: String,
                default: "全部"
            },
            disabled:{
                type:Boolean,
                default:false
            },
            prop:String,
            rules:Array
        },
        methods: {
            handleChange(value) {
                this.$emit("change", value);
            }
        },
    };
</script>

