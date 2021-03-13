import { Injectable } from '@angular/core';
import { BFSApiService } from './bfs-api.service';
import { IInsurance, Insurance } from '../models/insurance.model';
import { IHospital } from '../models/hospital.model';
import { IOption } from '../models/general.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private api: BFSApiService) {}

  getInsurances(params: any = {}): Promise<{total: number, list: Insurance[]}> {
    params.order_by = 'name ASC';
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_all_insurances')
        .then(() => {
          this.api.getData('get_all_insurances', params, (data: {count: number, list: IInsurance[]}) => {
            const result: Insurance[] = [];
            data.list.forEach((insurance: IInsurance) => {
              result.push(new Insurance(insurance));
            });
            resolve({total: data.count, list: result});
          });
        })
        .catch(() => {
          resolve({total: 0, list: []});
        });
    });
  }

  getInsurance(id: number): Promise<Insurance> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_insurance')
        .then(() => {
          this.api.getData(`get_insurance/${id}`, {}, (data: IInsurance) => resolve(new Insurance(data)));
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  postInsurance(body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('create_insurance')
        .then(() => {
          this.api.postData('create_insurance', body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  putInsurance(id: number, body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('edit_insurance')
        .then(() => {
          this.api.putData(`edit_insurance/${id}`, body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  patchAdmin(insurance: number, admin: string): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('change_admin_insurance')
        .then(() => {
          this.api.patchData(`change_admin_insurance/${insurance}`, {admin}, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  deleteInsurance(id: number): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('delete_insurance')
        .then(() => {
          this.api.deleteData(`delete_insurance/${id}`, {}, () => resolve());
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  getHospitalOptions(): Promise<IOption[]> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_connected_hospitals')
        .then(() => {
          this.api.getData('get_connected_hospitals', {}, (data: IHospital[]) => {
            const result = data.map((hospital: IHospital) => {
              return {value: hospital.id, label: hospital.name, original: hospital};
            });
            resolve(result);
          });
        })
        .catch(() => {
          resolve([]);
        });
    });
  }
}
