<template>
    <el-upload
            class="upload-demo"
            :action="action"
            :data="data"
            :auto-upload="true"
            :limit="limit"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            :on-change="handleChange"
            :on-exceed="handleExceed"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove"
    >
        <el-button class="btn-default" icon="el-icon-upload2">{{btnText}}</el-button>
    </el-upload>
</template>

<script>
    export default {
        name: "import",
        props:{
            action:{
                type:String,
                default:'https://jsonplaceholder.typicode.com/posts/'
            },
            data:{
                type:Object //上传时附带的额外参数
            },
            limit:{
                type:Number,
                default:1
            },
            btnText: String

        },
        data() {
            return {
                fileTemp:null,
                file:null,
            }
        },
        methods: {
            importfxx(obj) {
                let _this = this;
                // 通过DOM取文件数据
                this.file = obj
                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;
                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for(var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if(rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                        this.da = [...outdata]
                        let arr = []
                        this.da.map(v => {
                            // let obj = {}
                            // obj.orgName = v['公司名称']
                            // obj.userCode = v['员工工号']
                            // obj.name = v['姓名']
                            // obj.month = v['月份']
                            // obj.salary = v['工资']
                            // arr.push(obj)
                        })
                        return arr
                    }
                    reader.readAsArrayBuffer(f);
                }

                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },
            handleChange(file){
                this.fileTemp = file.raw;
                if(this.fileTemp){
                    if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')){
                        this.importfxx(this.fileTemp)
                    }
                } else {
                    this.$message({
                        type:'warning',
                        message:'请上传附件！'
                    })
                }
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleUploadSuccess(resp, file, fileList){
            },
            handleRemove(file, fileList){
                this.fileTemp = null;
            },
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
