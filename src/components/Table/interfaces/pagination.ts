export interface IPagination<T> {
  data: T[];
  pageNumber: number;
  rowsPerPage: number;
  totalPages: number;
  totalRows: number;
}

export interface IPaginationProps {
  page: number;
  rowsPerPage: number;
  rowsNumber?: number;
}
