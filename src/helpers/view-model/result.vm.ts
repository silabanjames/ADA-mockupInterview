export interface IResultVM {
  data: any;
  page?: number;
  page_size?: number;
  total?: number;
  message: string;
  returnId?: number | string;
  isSuccess: boolean;
  status: number;
}
