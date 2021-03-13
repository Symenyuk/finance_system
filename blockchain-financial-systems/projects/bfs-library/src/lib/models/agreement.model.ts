export interface IAgreement {
  id: number;
  name: string;
  description: string;
  hospital: number;
  hospital_name?: string;
  hospital_contact_person?: string;
  insurance: number;
  insurance_name?: string;
  insurance_contact_person?: string;
  owner: string;
  review_interval: number;
  payment_interval: number;
  charges: number;
  transaction_interval: number;
  transaction_charges_per_bill: number;
  delay_penalty: number;
  discount_rate: number;
  status: 0 | 1;
  created_at: number;
}

export class Agreement {
  private _id: number;
  private _status: 0 | 1;
  public readonly name: string;
  public readonly description: string;
  public readonly hospital: {
    id: number;
    name?: string;
    contact?: string;
  };
  public readonly insurance: {
    id: number;
    name?: string;
    contact?: string;
  };
  public readonly owner: string;
  public readonly reviewInterval: number;
  public readonly paymentInterval: number;
  public readonly charges: number;
  public readonly transactionInterval: number;
  public readonly transactionChargesPerBill: number;
  public readonly delayPenalty: number;
  public readonly discountRate: number;
  public readonly createdAt: number;

  public get id() {
    return this._id;
  }

  public get status() {
    return this._status;
  }

  public set status(value: 0 | 1) {
    if ([0, 1].includes(value)) {
      this._status = value;
    }
  }

  constructor(data: IAgreement) {
    this._id = data.id;
    this.name = data.name || '';
    this.description = data.description || '';
    this.hospital = {
      id: data.hospital,
      name: data.hospital_name || '',
      contact: data.hospital_contact_person || ''
    };
    this.insurance = {
      id: data.insurance,
      name: data.insurance_name || '',
      contact: data.insurance_contact_person || ''
    };
    this.owner = data.owner;
    this.reviewInterval = data.review_interval;
    this.paymentInterval = data.payment_interval;
    this.charges = data.charges;
    this.transactionInterval = data.transaction_interval;
    this.transactionChargesPerBill = data.transaction_charges_per_bill;
    this.delayPenalty = data.delay_penalty;
    this.discountRate = data.discount_rate;
    this.status = data.status;
    this.createdAt = data.created_at;
  }

  public updateHospital(name: string, contact: string) {
    if (name) {
      this.hospital.name = name;
    }
    if (contact) {
      this.hospital.contact = contact;
    }
  }

  public updateInsurance(name: string, contact: string) {
    if (name) {
      this.insurance.name = name;
    }
    if (contact) {
      this.insurance.contact = contact;
    }
  }
}
