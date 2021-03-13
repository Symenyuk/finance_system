export interface IBillStatuses {
  [key: number]: number[];
}

export interface IPermissions {
  [key: string]: boolean | string[] | IBillStatuses;
}

export interface ILoginData {
  'access_token': string;
  'refresh_token': string;
  'expires_in': number;
  'permission': IPermissions;
}

export interface ILoginResponse {
  success: boolean;
  data?: ILoginData;
  message?: string;
}

export enum RequestTypes { Get = 'GET', Post = 'POST', Put = 'PUT', Patch = 'PATCH', Delete = 'DELETE' }
