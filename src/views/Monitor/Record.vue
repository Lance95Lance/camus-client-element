<template lang="pug">
  div.record
    el-button.add(type='primary', size='small', icon='el-icon-plus', @click='onAddTap') 增加
    el-table(
      :data='recordTableData',
      border,)
      el-table-column(
        prop='system_name',
        width='80px',
        label='相关系统')
        template(slot-scope='scope')
          span {{getSystemName(scope.row.system_name)}}
      el-table-column(
        prop='system_name'
        width='80px',
        label='阶段')
        template(slot-scope='scope')
          span {{getStage(scope.row.stage)}}
      el-table-column(
        prop='work_time'
        width='80px',
        label='工时')
      el-table-column(
        prop='to_measure_time'
        width='100px',
        label='提测时间')
      el-table-column(
        prop='plan_to_prod_time'
        width='100px',
        label='计划上线')
      el-table-column(
        prop='qa_owner'
        width='90px',
        label='测试负责人')
      el-table-column(
        prop='outputs'
        label='产出')
      el-table-column(
        prop='to_prod_time'
        width='100px',
        label='实际上线')
      el-table-column(
        label='风险分析')
        template(slot-scope="scope")
          span.red {{scope.row.risk_analysis}}
      el-table-column(
        prop='remark'
        label='备注')
      el-table-column(
        width='220px',
        label='操作')
        template(slot-scope="scope")
          el-button(type='primary',
            size='mini',
            @click='onModifyTap(scope.row, "modify")') 修改
          el-button(type='success',
            size='mini',
            @click='onModifyTap(scope.row, "add")') 复制
          el-button(type='danger',
            size='mini',
            @click='onDeleteTap(scope.row)') 删除
    el-dialog(:visible.sync='modifyModal.flag',
      :mask-closable='false',
      width='700px',
      :title='modifyModal.title',)
      el-form(:model='modifyData',
        label-width='90px',
        label-position='right')
        el-row
          el-col(:span='12')
            el-form-item(label='系统名:')
              el-select(v-model='modifyData.system_name', filterable, size='small')
                el-option(v-for='(item, index) in recordSyetem' :value='item.status' :key='index' :label='item.label') {{ item.label }}
          el-col(:span='12')
            el-form-item(label='阶段:')
              el-select(v-model="modifyData.stage", filterable, size='small')
                el-option(v-for='(item, index) in recordStage' :value='item.status' :key='index' :label='item.label') {{ item.label }}
        el-row
          el-col(:span='12')
            el-form-item(label='工时:')
              el-input(v-model='modifyData.work_time', size='small')
          el-col(:span='12')
            el-form-item(label='产出:')
              el-input(v-model='modifyData.outputs', size='small')
        el-row
          el-col(:span='12')
            el-form-item(label='提测时间:')
              el-date-picker(v-model='modifyData.to_measure_time',
                type='date', size='small')
          el-col(:span='12')
            el-form-item(label='计划上线:')
              el-date-picker(v-model='modifyData.plan_to_prod_time',
                type='date', size='small')
          el-col(:span='12')
            el-form-item(label='实际上线:')
              el-date-picker(v-model='modifyData.to_prod_time',
                type='date', size='small')
        el-row
          el-col(:span='12')
            el-form-item(label='测试负责人:')
              el-input(v-model='modifyData.qa_owner', size='small')
          el-col(:span='24')
            el-form-item(label='风险分析:')
              el-input(v-model='modifyData.risk_analysis',
                type='textarea',
                :rows='4', size='small')
          el-col(:span='24')
            el-form-item(label='备注:')
              el-input(v-model='modifyData.remark',
                type='textarea',
                :rows='4', size='small')
      span(slot="footer")
        el-button(@click='modifyModal.flag = false',
          size='small',) 取 消
        el-button(type="primary",
          @click="onModifyInfoSubmit",
          size='small',) 确 定
</template>

<script>
import * as apis from '../../services/apis';
import { mapGetters, mapActions } from 'vuex';
import { findIndex, get } from 'lodash';
import { format } from 'date-fns';

export default {
  name: 'record',
  data() {
    return {
      recordTableData: [],
      modifyModal: {
        flag: false,
        title: 'add',
        type: 'add',
      },
      modifyData: {},
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
  },

  methods: {
    ...mapActions(['getMonitorConfig', 'setBreadCrumb']),

    Notification(title_context, message, type_context) {
      this.$notify({
        title: title_context,
        message: message,
        type: type_context,
      });
    },

    async getRecord(project_detail_id) {
      const result = await apis.getProjectProgress(project_detail_id);
      if (!result.success) return;
      this.recordTableData = result.data;
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

    onAddTap() {
      this.modifyData = {
        project_detail_id: this.$route.params.id,
      };
      this.modifyModal = {
        flag: true,
        title: '新增监控记录',
        type: 'add',
      };
    },

    onModifyTap(val, type) {
      this.modifyData = {
        project_detail_id: val.project_detail_id,
        id: val.id,
        system_name: val.system_name,
        stage: val.stage,
        work_time: val.work_time,
        outputs: val.outputs,
        to_measure_time: val.to_measure_time,
        plan_to_prod_time: val.plan_to_prod_time,
        to_prod_time: val.to_prod_time,
        qa_owner: val.qa_owner,
        risk_analysis: val.risk_analysis,
        remark: val.remark,
      };
      if (type === 'add') {
        this.modifyModal = {
          flag: true,
          title: '新增监控记录',
          type: 'add',
        };
        delete this.modifyData.id;
      } else if (type === 'modify') {
        this.modifyModal = {
          flag: true,
          title: '修改监控记录',
          type: 'modify',
        };
      }
    },

    onDeleteTap(val) {
      const h = this.$createElement;
      this.$msgbox({
        message: h('div', { style: { fontSize: '14px' } }, '此操作不可逆，确认要删除吗？'),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(async () => {
        const project_detail_id = val.project_detail_id;
        const id = val.id;
        // const system_name = val.system_name;
        // const stage = val.stage;
        const result = await apis.deleteProjectProgress(id);
        if (!result.success) return;
        this.Notification('已执行', '删除成功', 'success');
        this.getRecord(project_detail_id);
      });
    },

    async onModifyInfoSubmit() {
      const params = {
        ...this.modifyData,
        to_measure_time: this.modifyData.to_measure_time
          ? format(this.modifyData.to_measure_time, 'YYYY-MM-DD')
          : null,
        plan_to_prod_time: this.modifyData.plan_to_prod_time
          ? format(this.modifyData.plan_to_prod_time, 'YYYY-MM-DD')
          : null,
        to_prod_time: this.modifyData.to_prod_time
          ? format(this.modifyData.to_prod_time, 'YYYY-MM-DD')
          : null,
      };
      if (params.system_name === undefined) {
        this.Notification('系统名称必填', '请选择系统名称', 'warning');
        return;
      }
      if (params.stage === undefined) {
        this.Notification('项目阶段必填', '请选择阶段', 'warning');
        return;
      }
      if (params.stage === 8 && params.to_prod_time === null) {
        this.Notification('请注意', '项目已上线时,需要确定实际上线时间', 'error');
        return;
      }
      if (params.stage !== 8 && params.to_prod_time !== null) {
        this.Notification('请注意', '非已上线阶段,实际上线时间应该为空', 'error');
        return;
      }
      // 为空则赋值null
      params.work_time = params.work_time || null;
      params.outputs = params.outputs || null;
      params.qa_owner = params.qa_owner || null;
      params.risk_analysis = params.risk_analysis || null;
      params.remark = params.remark || null;
      let result;
      if (this.modifyModal.type === 'add') result = await apis.addProjectProgress(params);
      else if (this.modifyModal.type === 'modify')
        result = await apis.modifyProjectProgress(this.modifyData.id, params);
      if (!result.success) return;
      this.Notification('已执行', '操作成功', 'success');
      this.modifyModal.flag = false;
      this.getRecord(this.modifyData.project_detail_id);
    },
  },
  async mounted() {
    if (!this.monitorConfig) await this.getMonitorConfig();
    const id = this.$route.params.id;
    const breadCrumb = localStorage.breadCrumb || '';
    if (breadCrumb.indexOf(id) > -1) this.setBreadCrumb({ arr: JSON.parse(breadCrumb), index: 0 });
    this.getRecord(id);
  },
};
</script>

<style lang="less">
.record {
  .add {
    margin-bottom: 20px;
  }
  .red {
    color: #f56c6c;
    font-weight: bold;
  }
}
.el-form-item {
  .el-select,
  .el-date-editor.el-input {
    width: 100%;
  }
}
</style>
