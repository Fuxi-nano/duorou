import request from '@/utils/request';

export type SpecialtyListItem = {
    id: number;
    name: string;
    modifyDate: Date;
    createDate: Date;
    tels:string;
    abilitys:string;
    attitudes:string;
  };
  
  export type SpecialtyListPagination = {
    total: number;
    pageSize: number;
    current: number;
  };
  
  export type SpecialtyListData = {
    list: SpecialtyListItem[];
    pagination: Partial<SpecialtyListPagination>;
  };
  
  export type SpecialtyListParams = {
    name?: string;
    pageSize?: number;
    currentPage?: number;
    filter?: Record<string, any[]>;
    sorter?: Record<string, any>;
  };

export async function listSpecialty() {
    return request('/api/specialty/list', {
        method: 'GET',
    });
}

export async function querySpecialty(params?: SpecialtyListParams) {
    return request('/api/specialty/page', {
      method: 'POST',
      data:{
        ...params,
      }
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