<template lang="pug">
  div.monitor
    el-tabs(v-model='activeTab')
      el-tab-pane(v-for='(val, index) in areaList',
        :key='index'
        :label='val.name',
        :name='String(val.id)')
    el-row(:gutter='20')
      el-col(:span='8')
        el-card.monitor-project(shadow='hover')
          div.monitor-project-add(@click='onModifyTap({})')
            i.el-icon-plus
            p 新增
      el-col(v-for='(val, index) in projectList',
        :key='index',
        :span='8')
        el-card.monitor-project(shadow='hover')
          div.monitor-project-header(slot='header')
            el-popover.title(
              placement='top-start'
              :content='val.name'
              trigger='hover')
              p(slot="reference") {{val.name}}
            div
              //- div.status-init(v-if='val.status === 0')
              //-   i.el-icon-s-promotion
              //-   p {{getStatusText(val.status)}}
              div.status-closed(v-if='val.status === -1')
                i.el-icon-warning
                p {{getStatusText(val.status)}}
              div.status-finish(v-else-if='val.status === 1')
                i.el-icon-success
                p {{getStatusText(val.status)}}
              p(v-else) {{getStatusText(val.status)}}
          p.desc {{val.description}}
          div.btn-box
            el-button(type='primary',
              size='small',
              @click='onGoRecord(val)') 细项
            el-button(type='success',
              size='small',
              @click='onModifyTap(val)',
              v-if='val.status !== -1') 修改
            el-button(type='danger',
              size='small',
              v-if='val.status !== -1',
              @click='onDeleteTap(val)') 关闭
    el-dialog(
      width='400px',
      :title='modifyModal.title',
      :visible.sync='modifyModal.flag'
      :mask-closable='false',)
      el-form(:model='modifyData',
        label-width='40px',
        label-position='left')
        el-form-item(label='标题')
          el-input(v-model='modifyData.name')
        el-form-item(label='描述')
          el-input(v-model='modifyData.description',
            type='textarea',
            :rows='4')
      span(slot="footer")
        el-button(@click='modifyModal.flag = false',
          size='small',) 取 消
        el-button(type="primary",
          @click="onModifyInfoSubmit",
          size='small',) 确 定

</template>


<script>
import * as apis from '../../services/apis';
// import { lastDayOfISOWeek, startOfISOWeek, format } from 'date-fns';
import { mapActions, mapGetters } from 'vuex';
import { findIndex } from 'lodash';

export default {
  name: 'monitor',
  data() {
    return {
      areaList: [],
      activeTab: '0',
      projectList: [],
      modifyData: {},
      modifyModal: {
        flag: false,
        title: '',
        type: '',
      },
    };
  },
  computed: {
    ...mapGetters(['monitorConfig']),

    projectStatus() {
      return JSON.parse(this.monitorConfig.project_status);
    },
  },

  methods: {
    ...mapActions(['getMonitorConfig', 'routePush', 'setCurrentTitle', 'setBreadCrumb']),

    Notification(title_context, message, type_context) {
      this.$notify({
        title: title_context,
        message: message,
        type: type_context,
      });
    },

    async getProjectArea() {
      const result = await apis.getProjectArea();
      if (!result.success) return;
      this.areaList = result.data;
    },

    async getProjectDetail(area_id) {
      // const startDate = format(startOfISOWeek(new Date()), 'YYYY-MM-DD');
      // const endDate = format(lastDayOfISOWeek(new Date()), 'YYYY-MM-DD');
      // const result = await apis.getMonitorProjects(+id, startDate, endDate);
      const result = await apis.getProjectDetail(area_id);
      if (!result.success) return;
      this.projectList = result.data;
    },

    getStatusText(status) {
      return this.projectStatus[findIndex(this.projectStatus, { status })].label;
    },

    onSetBreadCrumb(label, path, index) {
      this.setBreadCrumb({ arr: [{ label, path }], index });
    },

    onGoRecord(val) {
      const label = val.name;
      const path = `/monitor/${val.id}`;
      this.onSetBreadCrumb(label, path, 1);
      this.routePush({ path });
    },

    onModifyTap(val) {
      if (!val.id) {
        val.project_area_id = this.activeTab;
        this.modifyModal = {
          flag: true,
          title: '新增项目信息',
          type: 'add',
        };
      } else {
        this.modifyModal = {
          flag: true,
          title: '修改项目信息',
          type: 'modify',
        };
      }
      this.modifyData = { ...val };
    },

    onDeleteTap(val) {
      const h = this.$createElement;
      this.$msgbox({
        title: '此操作不可逆',
        message: h('div', { style: { fontSize: '14px' } }, '项目异常，确认关闭？'),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(async () => {
        const area_id = val.project_area_id;
        const id = val.id;
        const name = val.name;
        const description = val.description;
        const created_person = val.created_person;
        const updated_person = '更新人';
        const result = await apis.deleteProjectDetail(
          area_id,
          id,
          name,
          description,
          created_person,
          updated_person
        );
        if (!result.success) return;
        this.Notification('已执行', '关闭成功', 'success');
        this.getProjectDetail(area_id);
      });
    },

    async onModifyInfoSubmit() {
      const area_id = this.modifyData.project_area_id;
      const id = this.modifyData.id;
      const name = this.modifyData.name;
      const description = this.modifyData.description;
      const created_person = '创建人';
      const updated_person = '更新人';

      if (!name) {
        this.$message.error('项目标题必填');
        return;
      }
      let result;
      if (this.modifyModal.type === 'modify') {
        result = await apis.modifyMonitorProject(
          area_id,
          id,
          name,
          description,
          created_person,
          updated_person
        );
      } else if (this.modifyModal.type === 'add') {
        result = await apis.addProjectDetail(
          area_id,
          name,
          description,
          created_person,
          updated_person
        );
      }
      if (!result.success) return;
      this.Notification('已执行', '操作成功', 'success');
      this.modifyModal.flag = false;
      this.getProjectDetail(area_id);
    },
  },
  watch: {
    activeTab(val) {
      this.routePush({ path: `/monitor`, query: { areaId: val } });
      this.getProjectDetail(val);
      const label = this.areaList[findIndex(this.areaList, { id: +val })].name;
      const path = this.$route.fullPath;
      this.onSetBreadCrumb(label, path, 0);
    },
  },
  async mounted() {
    this.getMonitorConfig();
    await this.getProjectArea();
    if (this.areaList.length > 0) {
      this.activeTab = this.$route.query.areaId || String(this.areaList[0].id);
    }
  },
};
</script>

<style lang="less">
.monitor {
  &-project {
    margin-bottom: 20px;
    i {
      font-size: 16px;
      margin-right: 5px;
    }
    // .status-init {
    //   color: #67C23A;
    //   display: flex;
    //   justify-content: flex-end;
    //   align-items: center;
    // }
    .status-closed {
      color: #ed4014;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .status-finish {
      color: #2d8cf0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .desc {
      height: 100px;
      overflow-y: auto;
    }
    .btn-box {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      button {
        margin-left: 10px;
      }
    }
    .el-card__body {
      white-space: pre-line;
    }
    &-header {
      display: flex;
      justify-content: space-between;
      .title {
        font-weight: bold;
        max-width: 68%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre-line;

        .el-popover__reference {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    &-add {
      height: 209px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
