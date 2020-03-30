import CaseList from '../views/Case/CaseList';
import Project from '../views/Case/Project';


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
];
