import { Get, Put, Delete, Post, DeleteById } from '../utils/fetch';

export function getProjectArea() {
  return Get(`/api/v1/area`);
}

export function getProjectDetail(area_id) {
  return Get(`/api/v1/project/` + area_id);
}

export function modifyMonitorProject(area_id, id, name, description,created_person, updated_person ) {
  return Put(`/api/v1/project/` + id ,{ project_area_id: area_id, name, description,created_person, updated_person });
}

export function addProjectDetail(area_id, name, description, created_person=null, updated_person) {
  if (created_person === null){
    return Post(`/api/v1/project`, { project_area_id: area_id, name, description, updated_person });

  }else{
    return Post(`/api/v1/project`, { project_area_id: area_id, name, description, created_person, updated_person });

  }

}

export function deleteProjectDetail(area_id, id, name, description,created_person, updated_person ) {
  return Delete(`/api/v1/project/` + id ,{ project_area_id: area_id, name, description,created_person, updated_person });
}

export function getProjectProgress(project_detail_id) {
  return Get(`/api/v1/projectProgress/` + project_detail_id );
}

export function addProjectProgress(params) {
  return Post(`/api/v1/projectProgress`, params);
}

export function modifyProjectProgress(id, params) {
  return Put(`/api/v1/projectProgress/` + id, params);
}

export function deleteProjectProgress(id) {
  return Delete(`/api/v1/projectProgress/` + id);
}

export function getProjectDashboard(start_date, end_date) {
  return Get(`/api/v1/projectDashboard`, { start_date, end_date });
}

export function getMonitorConfig() {
  return Get(`/api/v1/conf`);
}

export function postPublicService(app_name, host_name, download_url) {
  return Post(`/api/v1/publicService`, { app_name, host_name, download_url });
}

export function getLogOutInfo() {
  return Get(`/api/v1/logoutInfo`);
}

export function getIdInfo(idNumber) {
  return Get(`/api/v1/idInfo`, { idNumber });
}

export function postIdInfo(age, sex) {
  return Post(`/api/v1/idInfo`, { age, sex });
}

export function postDailyInfo(daily_list,timeout = 15000) {
  return Post(`/api/v1/daily`, daily_list, timeout);
}

export function getDailyInitInfo() {
  return Get(`/api/v1/dailyConfig`);
}

export function getDailySceneInfo() {
  return Get(`/api/v1/sceneDailyTemplateDetail`);
}

export function postDailySceneInfo(scene_list,timeout = 15000) {
  return Post(`/api/v1/sceneDaily`,scene_list,timeout);
}

export function postDailyInfoNew(daily_list,timeout = 15000) {
  return Post(`/api/v1/sceneStartUp`, daily_list, timeout);
}

export function getDailyScenedetail() {
  return Get(`/api/v1/sceneDaily`);
}

export function getDailySceneInfonew() {
  return Get(`/api/v1/NewTemplateDetail`);
}

export function getPolicyInstantConf() {
  return Get(`/api/v1/policyInstantConf`);
}

export function getCreateInstantPolicy(params) {
  return Get(`/api/v1/instantPolicy`, params);
}

export function getCaseConf() {
  return Get(`/api/v1/conf`);
}

export function getAllProject() {
  return Get(`api/v1/project`);
}

export function getAllUser() {
  return Get(`api/v1/user`);
}

export function getAllCase() {
  return Get(`api/v1/case`);
}

export function postCreateCase(params) {
  return Post(`api/v1/case`, params);
}

export function postSearchCase(params) {
  return Post(`api/v1/caseSearch`, params);
}

export function deleteCase(params) {
  return DeleteById(`api/v1/case`, params);
}
export function putSimpleChangeCase(id, params) {
  return Put(`api/v1/case` + '/' + id, params);
}

// export function getProject() {
//   return Get(`/api/v1/project`);
// }


// export function postProject(params) {
//   return Post(`/api/v1/project`, params);
// }

// export function putProject(id, params) {
//   return Put(`api/v1/project` + '/' + id, params);
// }
