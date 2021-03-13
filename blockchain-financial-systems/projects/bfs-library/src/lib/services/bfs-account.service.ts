import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BFSConfigService } from './bfs-config.service';
import { BFSApiService } from './bfs-api.service';
import { IAccount, Account, AdminAccount, IHospitalAccount, HospitalAccount, IInsuranceAccount, InsuranceAccount } from '../models/account.model';
import { RoleType } from '../models/general.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private account: Account;

  private static getDateOptions(): any {
    return [
      {value: -1, label: 'All'},
      {value: 7, label: 'Weekly'},
      {value: 30, label: 'Monthly'}
    ];
  }
  private static getRoleOptions(role): any {
    switch (role) {
      case RoleType.ADMINISTRATOR: return [
        {value: 'all', label: 'All'},
        {value: RoleType.ACCOUNT_MANAGER, label: 'Account manager'},
        {value: RoleType.FINANCE_MANAGER, label: 'Finance manager'},
        {value: RoleType.HOSPITAL_ADMINISTRATOR, label: 'Hospital administrator'},
        {value: RoleType.HOSPITAL_TELLER, label: 'Hospital teller'},
        {value: RoleType.HOSPITAL_FINANCE, label: 'Hospital finance'},
        {value: RoleType.HOSPITAL_FINANCE_MANAGER, label: 'Hospital finance manager'},
        {value: RoleType.INSURANCE_ADMINISTRATOR, label: 'Insurance administrator'},
        {value: RoleType.INSURANCE_AUDIT, label: 'Insurance audit'},
        {value: RoleType.INSURANCE_AUDIT_MANAGER, label: 'Insurance audit manager'},
        {value: RoleType.INSURANCE_FINANCE_MANAGER, label: 'Insurance finance manager'}
      ];
      case RoleType.ACCOUNT_MANAGER: return [
        {value: 'all', label: 'All'},
        {value: RoleType.HOSPITAL_ADMINISTRATOR, label: 'Hospital administrator'},
        {value: RoleType.INSURANCE_ADMINISTRATOR, label: 'Insurance administrator'}
      ];
      default: return [];
    }
  }
  private static getBillStatusOptions(role): any {
    switch (role) {
      case RoleType.ACCOUNT_MANAGER:
      case RoleType.FINANCE_MANAGER: return [
        {value: [], label: 'All'},
        {value: [40, 41, 42, 43, 44, 45], label: 'Dispute'},
        {value: [50], label: 'Terminated'},
        {value: [70, 80, 81, 90, 91], label: 'Payed'}
      ];
      case RoleType.HOSPITAL_ADMINISTRATOR: return [
        {value: [], label: 'All'},
        {value: [0, 10, 20, 22, 23], label: 'Created'},
        {value: [21, 30, 60], label: 'Sent'},
        {value: [40, 41, 42, 43, 44, 45], label: 'Dispute'},
        {value: [50], label: 'Terminated'},
        {value: [70, 80, 81, 90, 91], label: 'Payed'}
      ];
      default: return [];
    }
  }
  private static getBillTabs(role): any {
    switch (role) {
      case RoleType.FINANCE_MANAGER: return [90];
      case RoleType.HOSPITAL_FINANCE: return [0];
      case RoleType.HOSPITAL_FINANCE_MANAGER: return [10, 20, 23, 70, 80];
      case RoleType.INSURANCE_AUDIT: return [21];
      case RoleType.INSURANCE_AUDIT_MANAGER: return [30];
      case RoleType.INSURANCE_FINANCE_MANAGER: return [43, 60];
      default: return [];
    }
  }

  constructor(private http: HttpClient, private api: BFSApiService) {}

  getAccount(): Account {
    return this.account;
  }

  setAdminAccount(): Promise<AdminAccount> {
    const AdminProxy = new Proxy(AdminAccount, {
      construct(target, args) {
        const result = new target(args[0]);
        result['options'] = {
          date: AccountService.getDateOptions(),
          role: AccountService.getRoleOptions(result.role),
          billStatus: AccountService.getBillStatusOptions(result.role)
        };
        result['billTabs'] = AccountService.getBillTabs(result.role);
        return result;
      }
    });
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_user')
        .then(() => {
          this.api.getData('get_user', {}, (data: IAccount) => {
            this.account = new AdminProxy(data);
            resolve(this.account as AdminAccount);
          });
        })
        .catch(() => resolve(null));
    });
  }

  setHospitalAccount(): Promise<HospitalAccount> {
    const HospitalProxy = new Proxy(HospitalAccount, {
      construct(target, args) {
        const result = new target(args[0]);
        result['options'] = {
          date: AccountService.getDateOptions(),
          role: AccountService.getRoleOptions(result.role),
          billStatus: AccountService.getBillStatusOptions(result.role)
        };
        result['billTabs'] = AccountService.getBillTabs(result.role);
        return result;
      }
    });
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_user')
        .then(() => {
          this.api.getData('get_user', {}, (data: IHospitalAccount) => {
            this.account = new HospitalProxy(data);
            resolve(this.account as HospitalAccount);
          });
        })
        .catch(() => resolve(null));
    });
  }

  setInsuranceAccount(): Promise<InsuranceAccount> {
    const InsuranceProxy = new Proxy(InsuranceAccount, {
      construct(target, args) {
        const result = new target(args[0]);
        result['options'] = {
          date: AccountService.getDateOptions(),
          role: AccountService.getRoleOptions(result.role),
          billStatus: AccountService.getBillStatusOptions(result.role)
        };
        result['billTabs'] = AccountService.getBillTabs(result.role);
        return result;
      }
    });
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_user')
        .then(() => {
          this.api.getData('get_user', {}, (data: IInsuranceAccount) => {
            this.account = new InsuranceProxy(data);
            resolve(this.account as InsuranceAccount);
          });
        })
        .catch(() => resolve(null));
    });
  }

  getBFSAccounts(params): Promise<{total: number, list: AdminAccount[]}> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_users')
        .then(() => this.api.getData('get_users/bfs', params, (data: {count: number, list: IAccount[]}) => {
          const result: AdminAccount[] = [];
          data.list.forEach((account: IAccount) => {
            result.push(new AdminAccount(account));
          });
          resolve({total: data.count, list: result});
        }))
        .catch(() => resolve({total: 0, list: []}));
    });
  }

  getHospitalAccounts(params): Promise<{total: number, list: HospitalAccount[]}> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_users')
        .then(() => this.api.getData('get_users/hospital', params, (data: {count: number, list: IHospitalAccount[]}) => {
          const result: HospitalAccount[] = [];
          data.list.forEach((account: IHospitalAccount) => {
            result.push(new HospitalAccount(account));
          });
          resolve({total: data.count, list: result});
        }))
        .catch(() => resolve({total: 0, list: []}));
    });
  }

  getInsuranceAccounts(params): Promise<{total: number, list: InsuranceAccount[]}> {
    return new Promise((resolve) => {
      BFSApiService
        .havePermission('get_users')
        .then(() => this.api.getData('get_users/insurance', params, (data: {count: number, list: IInsuranceAccount[]}) => {
          const result: InsuranceAccount[] = [];
          data.list.forEach((account: IInsuranceAccount) => {
            result.push(new InsuranceAccount(account));
          });
          resolve({total: data.count, list: result});
        }))
        .catch(() => resolve({total: 0, list: []}));
    });
  }

  putAccount(body: any): Promise<void | Error[]> {
    return new Promise((resolve, reject) => {
      BFSApiService
        .havePermission('change_user_data')
        .then(() => this.api.putData('change_user_data', body, () => resolve(), (errors: Error[]) => reject(errors)))
        .catch(() => reject([new Error('You have no permission')]));
    });
  }

}
