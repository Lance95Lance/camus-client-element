import { Get, Put, Delete, Post, DeleteById } from '../utils/fetch';

export function getMonitorArea() {
  return Get(`/api/v1/areas`);
}

export function getMonitorProjects(area_id, start_date, end_date) {
  return Get(`/api/v1/projects`, { area_id, start_date, end_date });
}

export function modifyMonitorProject(area_id, id, name, description) {
  return Put(`/api/v1/project`, { area_id, id, name, description });
}

export function addMonitorProject(area_id, name, description) {
  return Post(`/api/v1/postProject`, { area_id, name, description });
}

export function deleteMonitorProject(area_id, id, name, description) {
  return Delete(`/api/v1/project`, { area_id, id, name, description });
}

export function getMonitorRecord(project_id) {
  return Get(`/api/v1/monitorRecord`, { project_id });
}

export function modifyMonitorRecord(params) {
  return Put(`/api/v1/handleMonitorRecord`, params);
}

export function addMonitorRecord(params) {
  return Post(`/api/v1/postMonitorRecord`, params);
}

export function deleteMonitorRecord(project_id, id, system_name, stage) {
  return Delete(`/api/v1/handleMonitorRecord`, { project_id, id, system_name, stage });
}

export function getMonitorDataBi(start_date, end_date) {
  return Get(`/api/v1/monitorDataBi`, { start_date, end_date });
}

export function getMonitorConfig() {
  return Get(`/api/v1/monitorConfig`);
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

export function postSearchCase(params) {
  return Post(`api/v1/caseSearch`, params);
}

export function deleteCase(params) {
  return DeleteById(`api/v1/case`, params);
}
export function putSimpleChangeCase(id, params) {
  return Put(`api/v1/case` + '/' + id, params);
}

export function getProject() {
  return Get(`/api/v1/project`);
}


export function postProject(params) {
  return Post(`/api/v1/project`, params);
}
