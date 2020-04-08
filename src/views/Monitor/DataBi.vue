<template lang="pug">
  div.data-bi
    el-date-picker.date-picker(
      v-model='rangeDate',
      @change='getData',
      type='daterange',
      range-separator='至',
      start-placeholder='开始日期',
      end-placeholder='结束日期')
    el-table(
      :data='tableData',
      :empty-text='tableEmptyText',
      :span-method='objectSpanMethod',
      border,)
      el-table-column(
        prop='area_name',
        width='70px',
        label='项目域')
      el-table-column(
        prop='project_name',
        label='测试项目')
      el-table-column(
        prop='system_name',
        width='80px',
        label='相关系统')
        template(slot-scope='scope')
          span {{getSystemName(scope.row.system_name)}}
      el-table-column(
        prop='system_name',
        width='80px',
        label='阶段')
        template(slot-scope='scope')
          span {{getStage(scope.row.stage)}}
      el-table-column(
        prop='work_time',
        width='80px',
        label='工时')
      el-table-column(
        prop='to_measure_time',
        width='100px',
        label='提测时间')
      el-table-column(
        prop='plan_to_prod_time',
        width='100px',
        label='计划上线')
      el-table-column(
        prop='qa_owner',
        width='80px',
        label='测试负责人')
      el-table-column(
        prop='outputs',
        label='产出')
      el-table-column(
        prop='to_prod_time',
        width='100px',
        label='实际上线')
      el-table-column(
        label='风险分析')
        template(slot-scope="scope")
          span.red {{scope.row.risk_analysis}}
      el-table-column(
        prop='mask',
        label='备注')
</template>

<script>
import * as apis from '../../services/apis';
import { lastDayOfISOWeek, startOfISOWeek, format } from 'date-fns';
import { mapActions, mapGetters } from 'vuex';
import { findIndex, get } from 'lodash';

export default {
  name: 'data-bi',
  data() {
    return {
      monitorDataBi: [],
      rangeDate: [],
      tableEmptyText: '加载中...',
    };
  },
  computed: {
    ...mapGetters(['monitorConfig']),
    recordStage() {
      return JSON.parse(get(this.monitorConfig, 'project_progress_stage', '{}'));
    },
    recordSyetem() {
      return JSON.parse(get(this.monitorConfig, 'project_progress_system', '{}'));
    },
    projects() {
      const arr = [0];
      for (const val of this.monitorDataBi) {
        let length = 0;
        for (const v of val.projects) {
          length += v.monitors.length;
        }
        arr.push(length + arr[arr.length - 1]);
      }
      return arr;
    },
    monitors() {
      const arr = [0];
      for (const val of this.monitorDataBi) {
        for (const v of val.projects) {
          arr.push(v.monitors.length + arr[arr.length - 1]);
        }
      }
      return arr;
    },
    tableData() {
      const arr = [];
      for (const value of this.monitorDataBi) {
        for (const val of value.projects) {
          for (const v of val.monitors) {
            arr.push({
              ...v,
              area_name: value.name,
              project_name: val.name,
            });
          }
        }
      }
      return arr;
    },
  },
  methods: {
    ...mapActions(['getMonitorConfig']),
    async getData() {
      if (!this.rangeDate) return;
      this.monitorDataBi = [];
      const startDate = format(this.rangeDate[0], 'YYYY-MM-DD');
      const endDate = format(this.rangeDate[1], 'YYYY-MM-DD');
      const result = await apis.getProjectDashboard(startDate, endDate);
      if (!result.success) return;
      this.monitorDataBi = result.data;
      if (result.data.length === 0) this.tableEmptyText = '暂无数据...';
    },
    getSystemName(system_name) {
      const recordSyetem = this.recordSyetem;
      let label = system_name;
      if (!isNaN(+label)) {
        label = recordSyetem[findIndex(recordSyetem, { status: +label })].label;
      }
      return label;
    },
    getStage(stage) {
      const recordStage = this.recordStage;
      const label = recordStage[findIndex(recordStage, { status: stage })].label;
      return label;
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const projects = this.projects;
        if (projects.indexOf(rowIndex) > -1) {
          const index = projects.indexOf(rowIndex);
          return {
            rowspan: projects[index + 1] - projects[index],
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      } else if (columnIndex === 1) {
        const monitors = this.monitors;
        if (monitors.indexOf(rowIndex) > -1) {
          const index = monitors.indexOf(rowIndex);
          return {
            rowspan: monitors[index + 1] - monitors[index],
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
  async mounted() {
    if (!this.monitorConfig) await this.getMonitorConfig();
    this.rangeDate = [startOfISOWeek(new Date()), lastDayOfISOWeek(new Date())];
    this.getData();
  },
};
</script>

<style lang="less">
.data-bi {
  padding-top: 50px;
  position: relative;
  .date-picker {
    position: absolute;
    top: 0;
    right: 10px;
  }
  .red {
    color: #F56C6C;
    font-weight: bold;
  }
}
</style>
