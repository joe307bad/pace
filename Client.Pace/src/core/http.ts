import axios from 'axios';

const service = axios.create({
  baseURL: ''
});

export const post = <T extends any>(path: string, data: any) =>
  service.post(path, data).then(response => response.data as T);

export const get = <T extends any>(path: string, params?: {}) =>
  service.get(path, { params }).then(response => response.data as T[]);