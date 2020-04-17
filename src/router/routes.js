import CaseList from '../views/Case/CaseList';
import Project from '../views/Case/Project';
import Login from '../views/Login/Login';
import Monitor from '../views/Monitor/Index';
import MonitorRecord from '../views/Monitor/Record';
import MonitorDataBi from '../views/Monitor/DataBi';
import IdNumberService from '../views/Tool/IdNumberService';


export default [
  {
    redirect: '/monitor',
    path: '/',
  },
  {
    component: IdNumberService,
    path: '/id-number-service',
    meta: {
      title: '身份证工具',
    },
  },
  {
    component: CaseList,
    path: '/case-search',
    meta: {
      title: '用例搜索',
    },
  },
  {
    component: Project,
    path: '/project',
    meta: {
      title: '项目看板',
    },
  },

  {
    component: Monitor,
    path: '/monitor',
    meta: {
      title: '监控录入',
    },
  },
  {
    component: MonitorRecord,
    path: '/monitor/:id',
    meta: {
      title: '监控录入',
    },
  },
  {
    component: MonitorDataBi,
    path: '/monitor-data',
    meta: {
      title: '数据报表',
    },
  },


  {
    component: Login,
    path: '/login',
    meta: {
      title: '登录',
    },
  },
];
