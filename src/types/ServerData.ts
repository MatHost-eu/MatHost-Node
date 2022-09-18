export interface ServerData {
  server_owner: boolean;
  identifier: string;
  internal_id: number;
  uuid: string;
  name: string;
  node: string;

  sftp_details: {
    ip: string;
    port: number;
  }

  limits: {
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
    threads: string;
    oom_disabled: boolean;
  }

  invocation?: string;
  docker_image: string;
  egg_features: string[];

  feature_limits: {
    databases: number;
    allocations: number;
    backups: number;
  }

  custom_text: string | null;
  status: string | null;
  is_suspended: boolean;
  is_installing: boolean;
  is_transferring?: boolean;
  nest_id: number;
  egg_id: number;

  relationships: {
    allocations: APIServerDataAllocations;
    variables: APIServerDataVariables;
  }
}

export interface ServerDataAllocation {
  id: number;
  ip: string;
  ip_alias: string | null;
  port: number;
  notes: string | null;
  is_default: boolean;
}

export interface APIServerDataAllocation {
  object: string;
  attributes: ServerDataAllocation;
}

export interface APIServerDataAllocations {
  object: string;
  data: APIServerDataAllocation[];
}

export interface ServerDataVariable {
  name: string;
  description: any;
  env_variable: string;
  default_value: string;
  server_value: string;
  is_editable: boolean;
  rules: string;
}

export interface APIServerDataVariable {
  object: string;
  attributes: ServerDataVariable;
}

export interface APIServerDataVariables {
  object: string;
  data: APIServerDataVariable[] | null;
}

export interface ServerDataAccount {
  is_server_owner: boolean;
  user_permissions: string[];
}

export interface APIServerData {
  object: string;
  attributes: ServerData;
  meta: ServerDataAccount;
}