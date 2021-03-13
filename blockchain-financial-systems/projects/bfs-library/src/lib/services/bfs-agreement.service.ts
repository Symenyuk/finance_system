import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BFSApiService } from './bfs-api.service';
import { RequestTypes } from '../models/api.model';
import { IOption, RoleType } from '../models/general.model';
import { IAgreement, Agreement } from '../models/agreement.model';
import { IHospital } from '../models/hospital.model';
import { IInsurance } from '../models/insurance.model';
import { IAccount } from '../models/account.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  public notificationsBadgeChangeEvent = new BehaviorSubject(null);

  constructor(private api: BFSApiService) {}

  getAgreements(params: any): Promise<{total: number, list: Agreement[]}> {
    params.order_by = 'created_at DESC';
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_all_agreements')
        .then(() => {
          this.api.getData('get_all_agreements', params, (data: {count: number, list: IAgreement[]}) => {
            const result: Agreement[] = [];
            data.list.forEach((agreement: IAgreement) => {
              result.push(new Agreement(agreement));
            });
            resolve({total: data.count, list: result});
          });
        })
        .catch(() => {
          resolve({total: 0, list: []});
        });
    });
  }

  getAgreement(id: number): Promise<Agreement> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_agreement')
        .then(() => {
          this.api.getData(`get_agreement/${id}`, {}, (data: IAgreement) => {
            if (data) {
              resolve(new Agreement(data));
            } else {
              resolve(null);
            }
          });
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  getAgreementByCounterparties(hospital: number, insurance: number): Promise<Agreement> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_agreement_by_counterparties')
        .then(() => {
          this.api.getData('get_agreement_by_counterparties', {hospital, insurance}, (data: IAgreement) => {
            if (data) {
              resolve(new Agreement(data));
            } else {
              resolve(null);
            }
          });
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  getHospitalOptions(): Promise<IOption[]> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_all_hospitals')
        .then(() => {
          this.api.getData('get_all_hospitals', {}, (data: {count: number, list: IHospital[]}) => {
            const result = data.list.map((hospital: IHospital) => {
              return {value: hospital.id, label: hospital.name};
            });
            resolve(result);
          });
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  getInsuranceOptions(): Promise<IOption[]> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_all_insurances')
        .then(() => {
          this.api.getData('get_all_insurances', {}, (data: {count: number, list: IInsurance[]}) => {
            const result = data.list.map((insurance: IInsurance) => {
              return {value: insurance.id, label: insurance.name};
            });
            resolve(result);
          });
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  getManagerOptions(): Promise<IOption[]> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_users')
        .then(() => {
          this.api.getData('get_users/bfs', {role: RoleType.ACCOUNT_MANAGER}, (data: {count: number, list: IAccount[]}) => {
            const result = data.list
              .map((user: IAccount) => {
                return {value: user.login, label: user.name};
              });
            resolve(result);
          });
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  postAgreement(body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('create_agreement')
        .then(() => {
          this.api.postData('create_agreement', body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  putAgreement(id: number, body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('edit_agreement')
        .then(() => {
          this.api.putData(`edit_agreement/${id}`, body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  patchStatus(id: number, status: number): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('renew_agreement')
        .then(() => {
          if ([0, 1].includes(status)) {
            this.api.patchData(`renew_agreement/${id}`, {status}, () => resolve(), (errors: Error[]) => reject(errors));
          }
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  getInvoices(params: any): Promise<{total: number, list: any[]}> {
    params.order_by = 'created_at DESC';
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_invoices')
        .then(() => {
          this.api.getData('get_invoices', params, (data: {count: number, list: any[]}) => {
            const result: any[] = [];
            data.list.forEach((invoice: any) => {
              result.push(invoice);
            });
            resolve({total: data.count, list: result});
          });
        })
        .catch(() => {
          resolve({total: 0, list: []});
        });
    });
  }
  checkInvoices(params): Promise<{total: number, list: any[]}> {
    params.order_by = 'created_at DESC';
    return new Promise((resolve) => {
      BFSApiService
          .havePermission('check_invoices')
          .then(() => {
            this.api.getData('check_invoices', params, (data: {count: number, list: any[]}) => {
              const result: any[] = [];
              data.list.forEach((invoice: any) => {
                result.push(invoice);
              });
              resolve({total: data.count, list: result});
            });
          })
          .catch(() => {
            resolve({total: 0, list: []});
          });
    });
  }
  checkNotificationsBadge(): void {
    this.checkInvoices({}).then((invoices: {total: number, list: any[]}) => {
      console.log('invoices', invoices);
      this.notificationsBadgeChangeEvent.next(invoices.total);
    });
  }
  patchInvoiceStatus(id: number, status: number): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
          .havePermission('change_invoice_status')
          .then(() => {
            if ([1, 2].includes(status)) {
              this.api.patchData(`change_invoice_status/${id}`, {status}, () => resolve(), (errors: Error[]) => reject(errors));
            }
          })
          .catch(() => {
            reject([new Error('You have no permission')]);
          });
    });
  }

  exportInvoice(params): Promise<any> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('export_invoice')
        .then(() => {
          const options = {params, responseType: 'blob', headers: new HttpHeaders().append('Content-Type', 'application/json')};
          this.api.xhr(RequestTypes.Get, 'export_invoice', options, (data: any) => resolve(data), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

}
