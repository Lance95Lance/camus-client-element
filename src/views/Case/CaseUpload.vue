<template>
  <div>
    <el-upload class="upload-demo" drag multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
    </el-upload>
    <div>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </div>
  </div>
</template>

<script>
import * as apis from '../../services/apis';
import { format } from 'date-fns';

export default {
  data() {
    return {
      fileList: [
      ],
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style>
</style>