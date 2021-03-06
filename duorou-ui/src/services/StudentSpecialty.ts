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

export async function listStudentSpecialty() {
    return request('/api/student_specialty/list', {
        method: 'GET',
    });
}

  export type ParamsType = {
    id?: number;
  };
  
  export async function cancelSubscribe(params: ParamsType) {
    return request('/api/specialty/cancel_subscribe', {
      method: 'POST',
      data: {
        ...params,
      },
    });
  }