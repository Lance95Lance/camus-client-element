<template>
  <div class="time-extrapolation">
    <div class="time-extrapolation">
      <el-alert title="各种计算时间相关" type="info" :closable="false" ></el-alert>

      <el-form :inline="true" :model="dateInfo">
        <el-alert title="时间推算:左包含右不包含" type="info" :closable="false" show-icon></el-alert>

        <el-form-item label="基础日期" required>
          <div class="block">
            <el-date-picker v-model="dateInfo.date" type="date" placeholder="选择基础日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item required>
          <el-switch v-model="dateInfo.option" inactive-text="前" active-text="后"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dateInfo.days" placeholder="请输入天数"></el-input>
        </el-form-item>
        <el-form-item required>
          <el-button type="primary" @click="getDateExtrapolation">查询</el-button>
        </el-form-item>
        <div v-if="dateExtrapolationFlag === true">
          <el-alert :title="extrapolateDate" type="success" effect="dark" show-icon center></el-alert>
        </div>
      </el-form>
      <el-form :inline="true" :model="dateInterval">
        <el-alert title="天数差计算" type="info" :closable="false" show-icon></el-alert>

        <el-form-item label="开始日期" required>
          <div class="block">
            <el-date-picker v-model="dateInterval.begin_date" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="结束" required>
          <div class="block">
            <el-date-picker v-model="dateInterval.end_date" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item required>
          <el-button type="primary" @click="getDateInterval">计算</el-button>
        </el-form-item>
        <div v-if="IntervalDateFlag === true">
          <el-alert :title="IntervalDate" type="success" effect="dark" show-icon center></el-alert>
        </div>
      </el-form>
    </div>
  </div>
</template>


<script>
import * as apis from '../../services/apis';
import { format } from 'date-fns';

export default {
  data() {
    return {
      dateExtrapolationFlag: false,
      extrapolateDate: '',
      dateInfo: {
        date: '',
        option: true,
        days: '',
      },
      IntervalDateFlag: false,
      IntervalDate: '',
      dateInterval: {
        begin_date: '',
        end_date: '',
      },
    };
  },

  async mounted() {},
  methods: {
    Notification(title_context, message, type_context) {
      this.$notify({
        title: title_context,
        message: message,
        type: type_context,
      });
    },
    async getDateExtrapolation() {
      this.dateExtrapolationFlag = false;
      let days;
      //     取反
      if (!this.dateInfo.option) {
        days = -parseInt(this.dateInfo.days);
      } else {
        days = parseInt(this.dateInfo.days);
      }

      const result = await apis.getDateExtrapolation(
        format(this.dateInfo.date, 'YYYY-MM-DD'),
        days
      );
      if (!result.success) {
        this.Notification('推算失败', result.message, 'warning');
      } else {
        this.dateExtrapolationFlag = true;
        this.extrapolateDate = '推算后日期：' + result.data;
      }
    },

    async getDateInterval() {
      this.IntervalDateFlag = false;
      const result = await apis.getDateInterval(
        format(this.dateInterval.begin_date, 'YYYY-MM-DD'),
        format(this.dateInterval.end_date, 'YYYY-MM-DD')
      );
      if (!result.success) {
        this.Notification('计算失败', result.message, 'warning');
      } else {
        this.IntervalDateFlag = true;
        this.IntervalDate = '计算天数为：' + result.data;
      }
    },
  },
};
</script>

<style lang="less">
.time-extrapolation {
  .el-form {
    width: 900px;
    margin-top: 60px;
    margin-left: 80px;
  }
}
</style>