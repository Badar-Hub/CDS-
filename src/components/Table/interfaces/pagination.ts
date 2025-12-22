export interface IPagination {
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber?: number;
}

export interface IPaginationProps {
  page: number;
  rowsPerPage: number;
  rowsNumber?: number;
}

