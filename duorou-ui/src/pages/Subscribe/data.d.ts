export type ClassListItem = {
  id: number;
  isSubscribe?: boolean;
  name: string;
  modifyDate: Date;
  createDate: Date;
  specialtyName:string;
  degreeName:string;
  subjectDesc:string;
  termId:number;
  campusId:number;
  ageLimit:string;
  tels:string;
  minAge:number;
  maxAge:number;
  descript:string;
};

export type ClassListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type ClassListData = {
  list: ClassListItem[];
  pagination: Partial<ClassListPagination>;
};

export type ClassListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
