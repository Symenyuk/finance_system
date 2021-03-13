import { RoleType } from './general.model';

export interface IAccount {
  id: number;
  login: string;
  name: string;
  mobile: string;
  email: string;
  role: string;
  status: string;
}

export abstract class Account {
  private _id: number;
  private _role: string;
  public login: string;
  public name: string;
  public mobile: string;
  public email: string;
  public status: string;

  public get id() {
    return this._id;
  }

  public get role() {
    return this._role;
  }

  public get roleTitle() {
    switch (this.role) {
      case RoleType.ADMINISTRATOR: return 'Administrator';
      case RoleType.ACCOUNT_MANAGER: return 'Account manager';
      case RoleType.FINANCE_MANAGER: return 'Finance manager';
      case RoleType.HOSPITAL_ADMINISTRATOR: return 'Hospital administrator';
      case RoleType.HOSPITAL_TELLER: return 'Hospital teller';
      case RoleType.HOSPITAL_FINANCE: return 'Hospital finance';
      case RoleType.HOSPITAL_FINANCE_MANAGER: return 'Hospital finance manager';
      case RoleType.INSURANCE_ADMINISTRATOR: return 'Insurance administrator';
      case RoleType.INSURANCE_AUDIT: return 'Insurance audit';
      case RoleType.INSURANCE_AUDIT_MANAGER: return 'Insurance audit manager';
      case RoleType.INSURANCE_FINANCE_MANAGER: return 'Insurance finance manager';
    }
  }

  public get greeting() {
    return `Hello, ${this.name}`;
  }

  constructor(data: IAccount) {
    this._id = data.id;
    this.login = data.login;
    this.name = data.name;
    this.mobile = data.mobile;
    this.email = data.email;
    this.status = data.status;
    if (Object.values(RoleType).includes(data.role)) {
      this._role = data.role;
    } else {
      throw new Error('Undefined role');
    }
  }
}

export class AdminAccount extends Account {

  public get greeting() {
    return `Hello, ${this.name} (${this.roleTitle})`;
  }

  constructor(data: IAccount) {
    super(data);
  }
}

export interface IHospitalAccount extends IAccount {
  hospital: number;
  hospital_name: string;
  branch?: number;
  department?: number;
}

export class HospitalAccount extends Account {
  public hospital: {
    id: number;
    name: string;
  };
  public branch?: number;
  public department?: number;

  public get greeting() {
    return `Hello, ${this.name} (${this.roleTitle}, ${this.hospital.name})`;
  }

  constructor(data: IHospitalAccount) {
    const {hospital, hospital_name, branch, department, ...account} = data;
    super(account);
    this.hospital = {
      id: hospital,
      name: hospital_name
    };
    if (branch) {
      this.branch = branch;
    }
    if (department) {
      this.department = department;
    }
  }
}

export interface IInsuranceAccount extends IAccount {
  insurance: number;
  insurance_name: string;
}

export class InsuranceAccount extends Account {
  public insurance: {
    id: number;
    name: string;
  };

  public get greeting() {
    return `Hello, ${this.name} (${this.roleTitle}, ${this.insurance.name})`;
  }

  constructor(data: IInsuranceAccount) {
    const {insurance, insurance_name, ...account} = data;
    super(account);
    this.insurance = {
      id: insurance,
      name: insurance_name
    };
  }
}
