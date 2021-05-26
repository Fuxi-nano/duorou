import request from '@/utils/request';
import type { ClassListParams, ClassListItem } from './data.d';

export async function queryRule(params?: ClassListParams) {
  return request('/api/class/page', {
    method: 'POST',
    data:{
      ...params,
    }
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: ClassListItem) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: ClassListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export type ParamsType = {
  id: number;
};

export async function subscribeClass(params: ParamsType) {
  return request('/api/class/subscribe', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryCampus() {
  return request('/api/campus/list', {
    method: 'GET',
  });
}
