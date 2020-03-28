import CaseList from '../views/Case/CaseList';


export default [
  {
    redirect: '/case-search',
    path: '/',
  },
  {
    component: CaseList,
    path: '/case-search',
    meta: {
      title: '用例搜索',
    },
  },
];
