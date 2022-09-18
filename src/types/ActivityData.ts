export interface ActivityData {
  object: string;
  data: APIActivityDataRecord[];
  meta: APIActivityDataMeta;
}

export interface APIActivityDataRecord {
  object: string;
  attributes: Record<string, any>;
}

export interface APIActivityDataMeta {
  pagination: ActivityDataPagination;
}

export interface ActivityDataPagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: ActivityDataPaginationLinks;
}

export interface ActivityDataPaginationLinks {
  previous?: string;
  next?: string;
}