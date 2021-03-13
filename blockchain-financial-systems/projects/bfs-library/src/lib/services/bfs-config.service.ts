import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConfig, Config } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class BFSConfigService {

  static settings: Config = new Config();

  constructor(private http: HttpClient) {}

  load(filePath): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.get(filePath).toPromise()
        .then((response: IConfig) => {
          BFSConfigService.settings.update(response as IConfig);
          resolve(`File '${filePath}' loaded successfully`);
        })
        .catch((response: any) => {
          reject(`Could not load file '${filePath}': ${JSON.stringify(response)}`);
        });
    });
  }
}
