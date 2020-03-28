import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.timeout = 0;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

export function Get(url = '', params = {}) {
  return axios.get(url, { params });
}

export function Post(url = '', params = {}, timeout = 15000) {
  return axios.post(url, params, { timeout: timeout });
}

export function Put(url = '', params = {}) {
  return axios.put(url, params);
}

export function Delete(url = '', params = {}) {
  return axios.delete(url, { data: JSON.stringify(params) });
}

export function DeleteById(url = '', params) {
  return axios.delete(url + "/" + params);
}

axios.interceptors.response.use(
  res => {
    if (!res.data.success) Message.error(res.data.message);
    return res.data;
  },
  (err) => {
    if (err.response.status == 401) {
      window.location.href = err.response.headers['location'];
    }

    Message.error('系统错误');
    return { success: false, message: '系统错误' };

  }
);
