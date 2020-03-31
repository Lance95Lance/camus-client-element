import CaseList from '../views/Case/CaseList';
import Project from '../views/Case/Project';
import Login from '../views/Login/Login';


export default [
  {
    redirect: '/project',
    path: '/',
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
    component: Login,
    path: '/login',
    meta: {
      title: '登录',
    },
  },
];
