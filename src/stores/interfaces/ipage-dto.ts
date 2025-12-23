export interface IPageDto<T>{
    data: T[];
    pageNumber: number;
    rowsPerPage: number;
    totalPages: number;
    totalRows: number;
}