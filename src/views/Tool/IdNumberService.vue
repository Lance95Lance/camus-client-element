<template>
  <div class="id-number-service">
    <div class="id-number-service">
      <el-alert
        title="身份证验真:进行身份证的真伪和信息鉴定。身份证生成:按照中国的身份证标准生成虚拟身份证,地区随机。"
        type="info"
        show-icon
        close-text="知道了"
      ></el-alert>
    </div>

    <el-form :inline="true" :model="idNumberInfo" :rules="rules">
      <el-form-item label="身份证验真" required>
        <el-input v-model="idNumberInfo.idNumber" placeholder="请填写身份证号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitIdNumber">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="generateIdCard" :loading="loading">生成身份证图片</el-button>
      </el-form-item>
    </el-form>

    <el-form :inline="true" :model="idNumberParams">
      <el-form-item label="身份证生成" required>
        <el-input v-model="idNumberParams.age" placeholder="年龄(默认18岁)"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-select v-model="idNumberParams.sex" placeholder="性别(默认女)">
          <el-option label="女" value="0"></el-option>
          <el-option label="男" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitIdNumberParams">生成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as apis from '../../services/apis';

export default {
  data() {
    return {
      loading: false,
      rules: {},
      idNumberInfo: {
        idNumber: '',
      },
      idNumberParams: {
        age: '',
        sex: '',
      },
    };
  },
  methods: {
    Notification(title_context, message, type_context) {
      this.$notify({
        title: title_context,
        message: message,
        type: type_context,
      });
    },
    async submitIdNumber() {
      const result = await apis.getIdInfo(this.idNumberInfo.idNumber);
      const data = result.data;

      if (!result.success) {
        this.Notification('验真失败', result.message, 'warning');
      } else {
        this.$alert(
          `
        <strong>身份证号码</strong></strong>:&#32;${this.idNumberInfo.idNumber}<br/>
        <strong>生日</strong>:&#32;${data.birthday}<br/>
        <strong>年龄</strong>:&#32;${data.age}<br/>
        <strong>性别</strong>:&#32;${data.sex}<br/>
        <strong>校验码</strong>:&#32;${data.check_digit}<br/>
        <strong>地址编码</strong>:&#32;${data.area_id}<br/>
        <strong>地址</strong>:&#32;${data.area_name}<br/>
        <strong>身份证真伪</strong>:&#32;${data.facticity}<br/>
        `,
          '身份证验真',
          {
            dangerouslyUseHTMLString: true,
          }
        );
      }
    },

    async generateIdCard() {
      this.loading = true;
      const result = await apis.getIdCard(this.idNumberInfo.idNumber);
      const data = result.data;

      if (!result.success) {
        this.Notification('生成失败', result.message, 'warning');
      } else {
        window.open(data);
      }
      this.loading = false;
    },
    async submitIdNumberParams() {
      const result = await apis.postIdInfo(
        parseInt(this.idNumberParams.age) || 18,
        this.idNumberParams.sex || 0
      );
      const data = result.data;

      if (!result.success) {
        this.Notification('生成失败', result.message, 'warning');
      } else {
        this.$alert(
          `
            <strong>号码</strong></strong>:&#32;${data}<br/>
            `,
          '身份证生成',
          {
            dangerouslyUseHTMLString: true,
          }
        );
      }
    },
  },
};
</script>

<style lang="less">
.id-number-service {
  .el-form {
    width: 900px;
    margin-top: 60px;
    margin-left: 80px;
  }
}
</style>
