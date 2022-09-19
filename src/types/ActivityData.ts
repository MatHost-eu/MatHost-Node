export interface ActivityData {
  object: string;
  data: APIActivityDataRecord[];
  meta: APIActivityDataMeta;
}

export interface APIActivityDataRecord {
  object: string;
  attributes: ActivityDataRecord;
}

export interface ActivityDataRecord {
  id: string;
  batch: string | null;
  event: string;
  is_api: boolean;
  ip: string | null;
  description: string | null;
  properties: Record<string, any>;
  has_additional_meta: boolean;
  timestamp: string;
  relationships?: {
    actor?: APIActivityDataActor;
  };
}

export interface APIActivityDataActor {
  object: string;
  attributes: ActivityDataActor;
}

export interface ActivityDataActor {
  uuid: string;
  username: string;
  email: string;
  image: string;
  '2fa_enabled': boolean;
  created_at: string;
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