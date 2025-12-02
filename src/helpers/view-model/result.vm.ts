export interface IResultVM {
  data: any;
  error?: ErrorVM;
  page?: number;
  page_size?: number;
  total?: number;
  message?: string;
  returnId?: number | string;
  isSuccess: boolean;
  status: number;
}

export interface ErrorVM {
  code: string;
  message: string;
  details: any;
}
