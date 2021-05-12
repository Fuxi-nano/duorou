export type ClassListItem = {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
  specialtyName:string;
  degreeName:string;
  className:string;
  subjectDesc:string;
  termName:string;
  campusName:string;
  ageLimit:string;
  tels:string;
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
