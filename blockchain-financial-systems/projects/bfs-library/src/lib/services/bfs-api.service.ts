import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BFSConfigService } from './bfs-config.service';
import { IPermissions, ILoginData, ILoginResponse, RequestTypes } from '../models/api.model';
import { BILL_STATUS } from '../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BFSApiService {

  static setAuthInfo(data: ILoginData): void {
    sessionStorage.token = data.access_token;
    sessionStorage.tokenRefresh = data.refresh_token;
    sessionStorage.expires = data.expires_in;
    sessionStorage.permissions = JSON.stringify(data.permission);
  }

  static isLoggedIn(): boolean {
    return sessionStorage.token;
  }

  static isTokenExpired(): boolean {
    return new Date() > sessionStorage.expires;
  }

  static getPermissions(): IPermissions {
    return JSON.parse(sessionStorage.permissions) as IPermissions;
  }

  static havePermission(action: string): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      const permissions = BFSApiService.getPermissions();
      if (permissions.hasOwnProperty(action)) {
        if (permissions[action]) {
          resolve();
        }
      } else {
        reject(`Error: system doesn\'t have ${action} permission`);
      }
    });
    return promise;
  }

  constructor(private router: Router, private http: HttpClient) {}

  logIn(login: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<ILoginResponse>(`${BFSConfigService.settings.apiUrl}login`, {login, password, whence: BFSConfigService.settings.whence})
        .subscribe(
          (response: ILoginResponse) => {
            if (response.success) {
              sessionStorage.user = login;
              BFSApiService.setAuthInfo(response.data);
              resolve();
            } else {
              reject(new Error(response.message));
            }
          },
          error => {
            reject(new Error(error.error.message));
          });
    });
  }

  activate(login: string, password: string, code: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<ILoginResponse>(`${BFSConfigService.settings.apiUrl}activate_account`, {login, password, code})
        .subscribe(
          (response: ILoginResponse) => {
            if (response.success) {
              sessionStorage.user = login;
              BFSApiService.setAuthInfo(response.data);
              resolve();
            }
          },
          error => {
            reject([new Error(error.error.message)]);
          });
    });
  }

  forgotPassword(login: string, email: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(`${BFSConfigService.settings.apiUrl}forgot_password`, {login, email, whence: BFSConfigService.settings.whence})
        .subscribe((response: any) => resolve(response), error => reject(new Error(error.error.message)));
    });
  }

  recoverPassword(body): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(`${BFSConfigService.settings.apiUrl}recovery_account`, {...body, whence: BFSConfigService.settings.whence})
        .subscribe((response: any) => resolve(response), error => reject(new Error(error.error.message)));
    });
  }

  logOut(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        sessionStorage.clear();
        resolve(true);
      } catch (err) {
        console.error(err);
        reject(false);
      }
    });
  }

  getData(endpoint: string, params: {}, successFn, errorFn = (errors: Error[]) => console.error(errors)): void {
    const options = { params };
    this.xhr(RequestTypes.Get, endpoint, options, successFn, errorFn);
  }

  postData(endpoint: string, body: {}, successFn, errorFn = (errors: Error[]) => console.error(errors)): void {
    const options = { body };
    this.xhr(RequestTypes.Post, endpoint, options, successFn, errorFn);
  }

  putData(endpoint: string, body: {}, successFn, errorFn = (errors: Error[]) => console.error(errors)): void {
    const options = { body };
    this.xhr(RequestTypes.Put, endpoint, options, successFn, errorFn);
  }

  patchData(endpoint: string, body: {}, successFn, errorFn = (errors: Error[]) => console.error(errors)): void {
    const options = { body };
    this.xhr(RequestTypes.Patch, endpoint, options, successFn, errorFn);
  }

  deleteData(endpoint: string, body: {}, successFn, errorFn = (errors: Error[]) => console.error(errors)): void {
    const options = { body };
    this.xhr(RequestTypes.Delete, endpoint, options, successFn, errorFn);
  }

  xhr(type: RequestTypes, endpoint: string, options: any, successFn, errorFn): void {
    this.checkToken()
      .then(() => {
        options.headers = new HttpHeaders({'x-access-token':  (sessionStorage.token) ? sessionStorage.token : ''});
        this.http
          .request(type as string, `${BFSConfigService.settings.apiUrl}api/${endpoint}`, options)
          .subscribe(data => successFn(data), error => {
            const errors = [];
            if (error.error.hasOwnProperty('message')) {
              errors.push(new Error(error.error.message));
            } else if (error.error.hasOwnProperty('errors')) {
              error.error.errors.forEach((err: any) => {
                for (const value of Object.values(err)) {
                  errors.push(new Error(value as string));
                }
              });
            } else {
              errors.push(new Error('Unhandled error'));
            }
            errorFn(errors);
          });
      })
      .catch(error => {
        console.warn(error);
        this.logOut().then(() => {
          this.router.navigateByUrl('login').then();
        });
      });
  }

  checkToken(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (BFSApiService.isLoggedIn() && !BFSApiService.isTokenExpired()) {
        resolve();
      } else {
        this.refreshToken().then(() => resolve(), err => reject(err));
      }
    });
  }

  refreshToken(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders({'x-access-token': (sessionStorage.token) ? sessionStorage.token : ''});
      this.http
        .post<ILoginResponse>(`${BFSConfigService.settings.apiUrl}token_refresh`, {refresh_token: sessionStorage.tokenRefresh}, {headers})
        .subscribe(
          (response: ILoginResponse) => {
            if (response.success) {
              BFSApiService.setAuthInfo(response.data);
              resolve();
            } else {
              reject();
            }
          },
          error => {
            reject(error);
          });
    });
  }

}
