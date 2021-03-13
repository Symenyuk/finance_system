import { Injectable } from '@angular/core';
import { BFSApiService } from './bfs-api.service';
import { IHospital, Hospital } from '../models/hospital.model';
import { IBranch, Branch } from '../models/branch.model';
import { IDepartment, Department } from '../models/department.model';
import { IService, Service } from '../models/service.model';
import { IInsurance } from '../models/insurance.model';
import { IOption } from '../models/general.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private api: BFSApiService) {}

  getHospitals(params: any = {}): Promise<{total: number, list: Hospital[]}> {
    params.order_by = 'name ASC';
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_all_hospitals')
        .then(() => {
          this.api.getData('get_all_hospitals', params, (data: {count: number, list: IHospital[]}) => {
            const result: Hospital[] = [];
            data.list.forEach((hospital: IHospital) => {
              result.push(new Hospital(hospital));
            });
            resolve({total: data.count, list: result});
          });
        })
        .catch(() => {
          resolve({total: 0, list: []});
        });
    });
  }

  getHospital(id: number): Promise<Hospital> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_hospital')
        .then(() => {
          this.api.getData(`get_hospital/${id}`, {}, (data: IHospital) => resolve(new Hospital(data)));
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  postHospital(body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('create_hospital')
        .then(() => {
          this.api.postData('create_hospital', body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  putHospital(id: number, body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('edit_hospital')
        .then(() => {
          this.api.putData(`edit_hospital/${id}`, body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  patchAdmin(hospital: number, admin: string): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('change_admin_hospital')
        .then(() => {
          this.api.patchData(`change_admin_hospital/${hospital}`, {admin}, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  deleteHospital(id: number): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('delete_hospital')
        .then(() => {
          this.api.deleteData(`delete_hospital/${id}`, {}, () => resolve());
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  getBranches(params: any = {}): Promise<{total: number, list: Branch[]}> {
    params.order_by = 'name ASC';
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_all_branches')
        .then(() => {
          this.api.getData('get_all_branches', params, (data: {count: number, list: IBranch[]}) => {
            const result: Branch[] = [];
            data.list.forEach((branch: IBranch) => {
              result.push(new Branch(branch));
            });
            resolve({total: data.count, list: result});
          });
        })
        .catch(() => {
          resolve({total: 0, list: []});
        });
    });
  }

  getBranch(id: number): Promise<Branch> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_branch')
        .then(() => {
          this.api.getData(`get_branch/${id}`, {}, (data: IBranch) => resolve(new Branch(data)));
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  getBranchOptions(): Promise<IOption[]> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_all_branches')
        .then(() => {
          this.api.getData('get_all_branches', {order_by: 'name ASC'}, (data: {count: number, list: IBranch[]}) => {
            const result = data.list.map((branch: IBranch) => {
              return {value: branch.id, label: branch.name};
            });
            resolve(result);
          });
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  postBranch(body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('create_branch')
        .then(() => {
          this.api.postData('create_branch', body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  putBranch(id: number, body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('edit_branch')
        .then(() => {
          this.api.putData(`edit_branch/${id}`, body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  deleteBranch(id: number): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('delete_branch')
        .then(() => {
          this.api.deleteData(`delete_branch/${id}`, {}, () => resolve());
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  getDepartments(params: any = {}): Promise<{total: number, list: Department[]}> {
    params.order_by = 'name ASC';
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_all_departments')
        .then(() => {
          this.api.getData('get_all_departments', params, (data: {count: number, list: IDepartment[]}) => {
            const result: Department[] = [];
            data.list.forEach((department: IDepartment) => {
              result.push(new Department(department));
            });
            resolve({total: data.count, list: result});
          });
        })
        .catch(() => {
          resolve({total: 0, list: []});
        });
    });
  }

  getDepartment(id: number, params: any = {}): Promise<Department> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_department')
        .then(() => {
          this.api.getData(`get_department/${id}`, params, (data: IDepartment) => resolve(new Department(data)));
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  getDepartmentOptions(branch: number): Promise<IOption[]> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_all_departments')
        .then(() => {
          this.api.getData('get_all_departments', {branch, order_by: 'name ASC'}, (data: {count: number, list: IDepartment[]}) => {
            const result = data.list.map((department: IDepartment) => {
              return {value: department.id, label: department.name};
            });
            resolve(result);
          });
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  postDepartment(body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('create_department')
        .then(() => {
          this.api.postData('create_department', body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  putDepartment(id: number, body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('edit_department')
        .then(() => {
          this.api.putData(`edit_department/${id}`, body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  deleteDepartment(id: number): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('delete_department')
        .then(() => {
          this.api.deleteData(`delete_department/${id}`, {}, () => resolve());
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  getServices(params: any = {}): Promise<{total: number, list: Service[]}> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_services')
        .then(() => {
          params.order_by = 'name ASC';
          this.api.getData('get_services', params, (data: {count: number, list: IService[]}) => {
            const result: Service[] = [];
            data.list.forEach((service: IService) => {
              result.push(new Service(service));
            });
            resolve({total: data.count, list: result});
          });
        })
        .catch(() => {
          resolve({total: 0, list: []});
        });
    });
  }

  getService(id: number): Promise<Service> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_service')
        .then(() => {
          this.api.getData(`get_service/${id}`, {}, (data: IService) => resolve(new Service(data)));
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  getServiceOptions(): Promise<IOption[]> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_services')
        .then(() => {
          this.api.getData('get_services', {order_by: 'name ASC'}, (data: {count: number, list: IService[]}) => {
            const result = data.list.map((service: IService) => {
              return {value: service.name, label: service.name};
            });
            resolve(result);
          });
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  postService(body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('create_service')
        .then(() => {
          this.api.postData('create_service', body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  putService(id: number, body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('edit_service')
        .then(() => {
          this.api.putData(`edit_service/${id}`, body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  deleteService(id: number): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('delete_service')
        .then(() => {
          this.api.deleteData(`delete_service/${id}`, {}, () => resolve());
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  getInsuranceOptions(): Promise<IOption[]> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_connected_insurances')
        .then(() => {
          this.api.getData('get_connected_insurances', {}, (data: IInsurance[]) => {
            const result = data.map((insurance: IInsurance) => {
              return {value: insurance.id, label: insurance.name, original: insurance};
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
