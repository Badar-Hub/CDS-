export interface RouteItem {
  name: string;
  path?: string;
  to?: string;
  icon?: string;
  meta?: Record<string, string>;
  children?: RouteItem[];
  collapsed?: boolean;
}
