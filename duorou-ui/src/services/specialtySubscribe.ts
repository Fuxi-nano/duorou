import request from '@/utils/request';

export type ListItem = {
    id: number;
    modifyDate: Date;
    createDate: Date;
    specialtyId:number;
    specialtyName:string;
    studentName:string;
    rightTime:string;
    termId:number;
    campusId:number;
  };

export async function listSpecialtySubscribe() {
    return request('/api/specialty/subscribe/list', {
        method: 'GET',
    });
}

  export type ParamsType = {
    id?: number;
  };
  
  export async function subscribe(params: ParamsType) {
    return request('/api/specialty/subscribe', {
      method: 'POST',
      data: {
        ...params,
      },
    });
  }