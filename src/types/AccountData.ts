export interface APIAccountData {
  object: string;
  attributes: AccountData;
}

export interface AccountData {
  id: number;
  admin: boolean;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  language: string;
}

export interface APITwoFactorData {
  data: TwoFactorData;
}

export interface TwoFactorData {
  image_url_data: string;
}

export interface APITwoFactorCodes {
  object: string;
  attributes: TwoFactorCodes;
}

export interface TwoFactorCodes {
  tokens: string[];
}