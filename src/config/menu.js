export default [
  {
    icon: 'el-icon-crop',
    id: '1',
    label: '项目管理',
    children: [
      // {
      //   id: '1-1',
      //   label: '项目看板',
      //   url: '/project',
      // },
      {
        id: '1-2',
        label: '测试进度',
        url: '/monitor',
      },
      {
        id: '1-3',
        label: '进度总览',
        url: '/monitor-data',
      },
    ],
  },
  {
    icon: 'el-icon-s-order',
    id: '2',
    label: '用例管理',
    children: [
      {
        id: '2-1',
        label: '用例中心',
        url: '/case-search',
      },
      // {
      //   id: '2-2',
      //   label: '用例上传',
      //   url: '/case-upload',
      // },
    ],
  },
  {
    icon: 'el-icon-bicycle',
    id: '3',
    label: '基础测试工具',
    children: [
      {
        id: '3-1',
        label: '身份证工具',
        url: '/id-number-service',
      },
      {
        id: '3-2',
        label: '时间推算',
        url: '/time-extrapolation',
      },
    ],
  },

];
