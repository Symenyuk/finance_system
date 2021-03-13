import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BFSApiService } from './bfs-api.service';
import { RequestTypes } from '../models/api.model';
import { IBill, Bill, IBillHistory, BillHistory } from '../models/bill.model';
import { IOption } from '../models/general.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  public notificationsBadgeChangeEvent = new BehaviorSubject(null);

  static calculateCurrentInterval(interval: number): {from: string, to: string} {
    const now = new Date();
    const startDate = new Date();
    const endDate = new Date();
    if (interval === 7) {
      startDate.setDate(now.getDate() - (now.getDay() - 1));
      endDate.setDate(now.getDate() + (7 - now.getDay()));
    } else {
      startDate.setDate(1);
      endDate.setMonth(now.getMonth() + 1, 0);
    }
    return {from: new Date(startDate).toISOString().split('T')[0], to: new Date(endDate).toISOString().split('T')[0]};
  }

  static calculatePrevInterval(from: Date, to: Date, interval: number): {from: string, to: string} {
    if (interval === 7) {
      from.setDate(from.getDate() - 7);
      to.setDate(to.getDate() - 7);
    } else {
      from.setMonth(from.getMonth() - 1, 1);
      to.setMonth(to.getMonth(), 0);
    }
    return {from: new Date(from).toISOString().split('T')[0], to: new Date(to).toISOString().split('T')[0]};
  }

  static calculateNextInterval(from: Date, to: Date, interval: number): {from: string, to: string} {
    if (interval === 7) {
      from.setDate(from.getDate() + 7);
      to.setDate(to.getDate() + 7);
    } else {
      from.setMonth(from.getMonth() + 1, 1);
      to.setMonth(to.getMonth() + 2, 0);
    }
    return {from: new Date(from).toISOString().split('T')[0], to: new Date(to).toISOString().split('T')[0]};
  }

  constructor(private api: BFSApiService) {}

  getBills(params: any): Promise<{total: number, list: Bill[]}> {
    params.order_by = 'created_at DESC';
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_bills')
        .then(() => {
          this.api.getData('get_bills', params, (data: {count: number, list: IBill[]}) => {
            const result: Bill[] = [];
            data.list.forEach((bill: IBill) => {
              result.push(new Bill(bill));
            });
            resolve({total: data.count, list: result});
          });
        })
        .catch(() => {
          resolve({total: 0, list: []});
        });
    });
  }

  getBill(id: number): Promise<Bill> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_bill')
        .then(() => {
          this.api.getData(`get_bill/${id}`, {}, (data: IBill) => resolve(new Bill(data)));
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  getBillHistory(key: string): Promise<BillHistory[]> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_bill_history')
        .then(() => {
          this.api.getData(`get_bill_history/${key}`, {}, (data: IBillHistory[]) => {
            const result: BillHistory[] = [];
            data.forEach((item: IBillHistory) => {
              result.push(new BillHistory(item));
            });
            resolve(result.sort((a: BillHistory, b: BillHistory) => b.updatedAt - a.updatedAt));
          });
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  getBillsStatistics(params): Promise<any> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('bills_statistics')
        .then(() => {
          this.api.getData('bills_statistics', params, (data: any[]) => resolve(data));
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  postBill(body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('create_bill')
        .then(() => {
          this.api.postData('create_bill', body, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  patchStatus(id: number, params: any, multiple: boolean = false): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('change_bill_status')
        .then(() => {
          this.api.patchData(`change_bill_status/${id}`, {...params}, () => resolve(), (errors: Error[]) => reject(errors));
        })
        .then(() => {
          if (!multiple) {
            this.checkNotificationsBadge();
          }
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }

  checkPatient(params): Promise<any> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('check_patient')
        .then(() => {
          this.api.getData(`check_patient`, params, (data: any) => {
            if (data.hasOwnProperty('id')) {
              resolve(data);
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

  getRelatedBills(params): Promise<IOption[]> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_related_bills')
        .then(() => {
          this.api.getData(`get_related_bills`, params, (data: any) => {
            if (data.length) {
              const result = data.map((bill: any) => {
                return {value: bill.bill_key, label: bill.bill_key, original: bill};
              });
              resolve(result);
            } else {
              resolve([]);
            }
          });
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  checkBills(params): Promise<{total: number, list: Bill[]}> {
    params.order_by = 'created_at DESC';
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('check_bills')
        .then(() => {
          this.api.getData('check_bills', params, (data: {count: number, list: IBill[]}) => {
            const result: Bill[] = [];
            data.list.forEach((bill: IBill) => {
              result.push(new Bill(bill));
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
    const permissions = BFSApiService.getPermissions();
    if (permissions.checkBillsIntervals) {
      this.checkBills({interval: permissions.checkBillsIntervals[0]}).then((bills: {total: number, list: Bill[]}) => {
        this.notificationsBadgeChangeEvent.next(bills.total);
      });
    }
  }

  exportBills(params): Promise<any> {
    params.get_export_bills = 1;
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('export_bills')
        .then(() => {
          const options = {params, responseType: 'blob', headers: new HttpHeaders().append('Content-Type', 'application/json')};
          this.api.xhr(RequestTypes.Get, 'get_bills', options, (data: any) => resolve(data), (errors: Error[]) => reject(errors));
        })
        .catch(() => {
          reject([new Error('You have no permission')]);
        });
    });
  }
}
