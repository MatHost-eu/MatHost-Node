import { GameDataException } from './Exceptions';

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

  description: string;

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

export interface MinecraftGameData {
  info: {
    hostname: any;
    players: number;
    maxplayers: number;
    bans: MinecraftGameDataBan[];
    ops: MinecraftGameDataOp[];
    version: string;
  }
  players: MinecraftGameDataPlayer[];
  online_players: number;
  max_players: number;
}

export interface MinecraftGameDataOp {
  uuid: string;
  name: string;
  level: number;
  bypassesPlayerLimit: boolean;
}

export interface MinecraftGameDataBan {
  uuid: string;
  name: string;
  created: string;
  source: string;
  expires: string;
  reason: string;
}

export interface MinecraftGameDataPlayer {
  id: string;
  name: string;
}

export interface SCPSLGameData {
  info: {
    hostname: string;
    dedicated: boolean;
    players: string;
    maxplayers: string;
    version: string;
    exiled: string | null;
    password: boolean;
    pastebin: string;
    pastebindata: any;
    modded: boolean;
    bans: SCPSLGameDataBan[];
  }
  players: SCPSLGameDataPlayer[];
  online_players: string;
  max_players: string;
}

export interface SCPSLGameDataPlayer {
  id: number;
  name: string;
  steamid: string;
}

export interface SCPSLGameDataBan {
  name: string;
  created: string;
  source: string;
  expires: string;
  reason: string;
  ip: string;
  steamid: string;
}

export interface APIGameData {
  success: boolean;
  data: MinecraftGameData | SCPSLGameData | GameDataException;
}

export interface APISocketData {
  data: SocketData;
}

export interface SocketData {
  token: string;
  socket: string;
}

export interface StatusData {
  current_state: string;
  is_suspended: boolean;
  resources: {
    memory_bytes: number;
    cpu_absolute: number;
    disk_bytes: number;
    network_rx_bytes: number;
    network_tx_bytes: number;
    uptime: number;
  }
}

export interface APIStatusData {
  object: string;
  attributes: StatusData;
}