<template>
    <div>
        <el-upload
                class="upload-component"
                :action="action"
                :data="data"
                :drag="isDrag"
                :multiple="isMultiple"
                :limit="limit"
                :accept="accept"
                :list-type="listType"
                :show-file-list="isShowFile"
                :file-list="fileList"
                :on-exceed="handleExceedLimit"
                :before-upload='beforeUpload'
                :on-remove='handleExceedRemove'
                :on-success="handleUploadSuccess"
                :on-change="hadleFileChange"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text"><span v-if="isDrag">将文件拖到此处，或</span><span>点击上传</span></div>
        </el-upload>
    </div>
</template>

<script>
    export default {
        name: "uploadComponent",
        props:{
            action:{
                type:String,
                default:'https://jsonplaceholder.typicode.com/posts/'
            },
            data:{
                type:Object //上传时附带的额外参数
            },
            isDrag:{
                type:Boolean,
                default: false
            },
            isMultiple:{
                type:Boolean,
                default: false
            },
            limit:{
                type:Number,
                default:1
            },
            accept:{
                type: String,
                default:'.jpg,.jpeg,.png'
            },
            listType:{
                type:String,
                default:'picture-card'  //文件列表的类型  text/picture/picture-card
            },
            isShowFile:{
                type:Boolean,
                default: true //是否显示已上传文件列表
            },

        },
        data() {
            return {
                fileList:[],
                form_url:{},
            }
        },
        methods: {
            handleExceedLimit(files, event) {
                this.$message.warning('最多只能上传'+this.limit+'张图片!')
            },
            beforeUpload(file){
                if(file.size>10*1024*1024){
                    this.$message.warning('文件大小不能超过10M，当前文件大小'+(file.size/1024/1024).toFixed(2)+"M")
                    return false
                }
            },
            handleExceedRemove(file, fileList) {
            },
            handleUploadSuccess(resp, file, fileList) {
                const result = file.response;
                if(result.code==200){
                    this.form_url = {
                        fileName:result.entity.fileName,
                        fileUrl:result.entity.url
                    };
                    // console.log(this.form_url.fileUrl)
                }else{
                    // this.$message.warning(result.message.message)
                }
            },
            hadleFileChange(file, fileList) {
                let file_err = fileList.findIndex(ele=>ele.url==this.errorSrc);
                this.errorSrc = '';
                if(file_err>-1){
                    fileList.splice(file_err,1)
                }
                this.fileList = fileList;


            },
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
    .upload-component{
        .size{
            width: 160px;
            height: 160px;
        }
        .el-upload-list--picture-card{
            .el-upload-list__item{
                @extend .size;
                margin: 0;
                .el-upload-list__item-actions{
                    i{
                        color: #fff;
                        font-size: 20px;
                    }
                }
            }
        }
        .el-upload--picture-card{
            @extend .size;
            position: relative;
            float: left;
            margin-right: 10px;
            .el-icon-upload{
                font-size: 64px;
                margin: 0 auto;
                color: #C0C4CC;
            }
            .el-upload__text{
                width: 100%;
                line-height: 1;
                position: absolute;
                top: 100px;
                left: 0;
                padding: 0 20px;
                text-align:center;
                span{
                    color: #666666;
                    font-size: 12px;
                }
            }
            .el-upload-dragger{
                width: 158px;
                height: 158px;
                border: 0;
            }
        }


    }
</style>
