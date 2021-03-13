import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BFSConfigService } from './bfs-config.service';
import { IOption } from '../models/general.model';

@Injectable({
  providedIn: 'root'
})
export class BFSLocationService {

  constructor(private http: HttpClient) {}

  getRegions(search: string): Promise<IOption[]> {
    return new Promise((resolve) => {
      this.http.get(`${BFSConfigService.settings.apiUrl}get_region`, {params: {region: search}}).subscribe((data: any[]) => {
        const options = data.map((region: any) => {
          return {value: region.name_en, label: region.name_en, original: region};
        });
        resolve(options);
      }, () => resolve([]));
    });
  }

  getCities(search: string, region: number): Promise<IOption[]> {
    return new Promise((resolve) => {
      const params = {city: search, region: region.toString()};
      this.http.get(`${BFSConfigService.settings.apiUrl}get_city`, {params}).subscribe((data: any[]) => {
        const options = data.map((city: any) => {
          return {value: city.name_en, label: city.name_en, original: city};
        });
        resolve(options);
      }, () => resolve([]));
    });
  }

  getDistricts(search: string, region: number, city: number): Promise<IOption[]> {
    return new Promise((resolve) => {
      const params = {district: search, region: region.toString(), city: city.toString()};
      this.http.get(`${BFSConfigService.settings.apiUrl}get_district`, {params}).subscribe((data: any[]) => {
        const options = data.map((district: any) => {
          return {value: district.name_en, label: district.name_en, original: district};
        });
        resolve(options);
      }, () => resolve([]));
    });
  }
}
