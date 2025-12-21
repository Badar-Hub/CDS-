export interface IRouteDto {
  name: string;
  path?: string;
  to?: string;
  icon?: string;
  meta?: Record<string, string>;
  children?: IRouteDto[];
  collapsed?: boolean;
}
