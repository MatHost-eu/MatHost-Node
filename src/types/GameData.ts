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

export interface GameDataException {
  error: string;
}

export interface APIGameData {
  success: boolean;
  data: MinecraftGameData | SCPSLGameData | GameDataException;
}