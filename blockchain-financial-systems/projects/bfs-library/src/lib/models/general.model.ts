export interface INavLink {
  icon: string;
  label: string;
  path: string;
  action?: string;
  badge?: any;
}

export interface IOption {
  value: string | string[] | number | number[];
  label: string;
  original?: any;
}

export enum RoleType {
  ADMINISTRATOR = 'superadmin',
  ACCOUNT_MANAGER = 'account_manager',
  FINANCE_MANAGER = 'finance_manager',
  HOSPITAL_ADMINISTRATOR = 'admin_hospital',
  HOSPITAL_TELLER = 'teller',
  HOSPITAL_FINANCE = 'finance_hospital',
  HOSPITAL_FINANCE_MANAGER = 'finance_manager_hospital',
  INSURANCE_ADMINISTRATOR = 'admin_insurance',
  INSURANCE_AUDIT = 'audit',
  INSURANCE_AUDIT_MANAGER = 'audit_manager_insurance',
  INSURANCE_FINANCE_MANAGER = 'finance_manager_insurance'
}

interface IFields {
  [key: string]: number | number[] | string | string[];
}

export class Filter {
  private _fields: IFields;
  private _nullables: any[];

  public get fields() {
    return this._fields;
  }

  public set fields(fields: IFields) {
    for (const field in fields) {
      if (fields.hasOwnProperty(field)) {
        this._fields[field] = fields[field];
      }
    }
  }

  constructor(fields: IFields, nullables: any[] = ['', -1, 'all', []]) {
    this._fields = fields;
    this._nullables = nullables;
  }

  addFields(fields: IFields) {
    Object.assign(this._fields, fields);
  }

  hasField(field: string) {
    return this._fields[field] !== undefined;
  }

  getSelectedFields() {
    const result = {};
    for (const field in this._fields) {
      if (this._fields.hasOwnProperty(field) && !this._nullables.includes(this._fields[field])) {
        result[field] = this._fields[field];
      }
    }
    return result;
  }

  *[Symbol.iterator]() {
    for (const field in this._fields) {
      if (this._fields.hasOwnProperty(field)) {
        yield this._fields[field];
      }
    }
  }
}
