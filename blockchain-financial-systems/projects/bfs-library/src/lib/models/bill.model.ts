export const BILL_STATUS = {
  0:  { value: 'Created', button: '', message: 'Bill created. Waiting for checking', color: '#78909c'},
  10: { value: 'Checked', button: 'Check', message: 'Bill checked. Waiting for verifying', color: '#56909c'},
  20: { value: 'Verified', button: 'Verify', message: 'Bill verified. Waiting for sending', color: '#34909c'},
  21: { value: 'Sent', button: 'Send', message: 'Bill sent. Waiting for answer', color: '#388e3c'},
  22: { value: 'Concerned', button: 'Concern', message: 'Bill concerned. Waiting for verifying', color: '#7b1fa2'},
  23: { value: 'Pending', button: 'Pending', message: 'Bill pending. Waiting for verifying', color: '#9a909c'},
  30: { value: 'Checked', button: 'Check', message: 'Bill checked. Waiting for approval', color: '#385b3c'},
  40: { value: 'Dispute', button: 'Dispute', message: 'Bill disputed. Waiting for answer', color: '#7b1fa2'},
  41: { value: 'Dispute verified', button: 'Dispute verify', message: 'Bill disputed. Waiting for answer', color: '#7b1fa2'},
  42: { value: 'Dispute checked', button: 'Dispute check', message: 'Bill disputed. Waiting for answer', color: '#7b1fa2'},
  43: { value: 'Dispute approved', button: 'Dispute approve', message: 'Bill disputed. Waiting for answer', color: '#7b1fa2'},
  44: { value: 'Dispute concerned', button: 'Dispute concern', message: 'Bill disputed. Waiting for answer', color: '#7b1fa2'},
  45: { value: 'Dispute cancel', button: 'Dispute cancel', message: 'Bill dispute canceled. Waiting for approval', color: '#7b1fa2'},
  50: { value: 'Terminated', button: 'Terminate', message: 'Bill terminated', color: '#616161'},
  60: { value: 'Approved', button: 'Approve', message: 'Bill approved', color: '#303f9f'},
  70: { value: 'Payed', button: 'Payed', message: 'Bill payed', color: '#303f9f'},
  80: { value: 'Received', button: 'Received', message: 'Bill received', color: '#303f9f'},
  81: { value: 'Pending payment', button: 'Pending payment', message: 'Bill pending payment', color: '#303f6c'},
  90: { value: 'Fee payed', button: 'Fee payed', message: 'Bill confirmed. Fee payed', color: '#17139f'},
  91: { value: 'Fee received', button: 'Fee received', message: 'Bill confirmed. Fee received', color: '#17139f'},
};

export interface IBill {
  id: number;
  status: number;
  status_message: string;
  network_status: number;
  bill_key: string;
  agreement: number;
  hospital: number;
  hospital_name: string;
  branch_name: string;
  department_name: string;
  teller: string;
  insurance: number;
  insurance_name: string;
  patient_name: string;
  patient_mobile: string;
  patient_age: number;
  policy_number: string;
  policy_type: string;
  insurance_approval: string;
  approval_number: string;
  approval_date: string;
  approval_time: string;
  service_name: string;
  service_description: string;
  related_bill: number;
  doctor_name: string;
  additional_info: string;
  cost: number;
  paid_by_patient: number;
  discount: string;
  vat: string;
  remain_to_pay_by_insurance: number;
  transaction_charges_per_bill: number;
  created_at: string;
  updated_at: string;
}

export class Bill {
  private _id: number;
  private _status: number;
  private _networkStatus: number;
  public readonly message: string;
  public readonly key: string;
  public readonly agreement: number;
  public readonly hospital: {
    id: number,
    name: string,
    branch: string,
    department: string
  };
  public readonly teller: string;
  public readonly insurance: {
    id: number,
    name: string
  };
  public readonly patientName: string;
  public readonly patientMobile: string;
  public readonly patientAge: number;
  public readonly policyNumber: string;
  public readonly policyType: string;
  public readonly insuranceApproval: string;
  public readonly approvalNumber: string;
  public readonly approvalDate: string;
  public readonly approvalTime: string;
  public readonly serviceName: string;
  public readonly serviceDescription: string;
  public readonly relatedBill: number;
  public readonly doctor: string;
  public readonly additionalInfo: string;
  public readonly cost: number;
  public readonly paidByPatient: number;
  public readonly discount: string;
  public readonly vat: string;
  public readonly remainToPay: number;
  public readonly chargesAmount: number;
  public readonly createdAt: number;
  public readonly updatedAt: number;

  public get id() {
    return this._id;
  }

  public get status() {
    return this._status;
  }

  public set status(value: number) {
    if (BILL_STATUS.hasOwnProperty(value)) {
      this._status = value;
    }
  }

  public get networkStatus() {
    return this._networkStatus;
  }

  public set networkStatus(value: number) {
    if (BILL_STATUS.hasOwnProperty(value) || value === null) {
      this._networkStatus = value;
    }
  }

  public get statusValue() {
    return this._status !== undefined ? BILL_STATUS[this._status].value : 'Indefinite status';
  }

  public get statusColor() {
    return this._status !== undefined ? BILL_STATUS[this._status].color : '#000';
  }

  public get blocked() {
    return this._status !== this._networkStatus;
  }

  constructor(data: IBill) {
    this._id = data.id;
    this.networkStatus = data.network_status;
    this.status = data.status;
    this.message = data.status_message;
    this.key = data.bill_key;
    this.agreement = data.agreement;
    this.hospital = {id: data.hospital, name: data.hospital_name, branch: data.branch_name, department: data.department_name};
    this.teller = data.teller;
    this.insurance = {id: data.insurance, name: data.insurance_name};
    this.patientName = data.patient_name;
    this.patientMobile = data.patient_mobile;
    this.patientAge = data.patient_age;
    this.policyNumber = data.policy_number;
    this.policyType = data.policy_type;
    this.insuranceApproval = parseInt(data.insurance_approval, 10) ? 'Yes' : 'No';
    this.approvalNumber = data.approval_number;
    this.approvalDate = data.approval_date;
    this.approvalTime = data.approval_time;
    this.serviceName = data.service_name;
    this.serviceDescription = data.service_description;
    this.relatedBill = data.related_bill;
    this.doctor = data.doctor_name;
    this.additionalInfo = data.additional_info;
    this.cost = data.cost;
    this.paidByPatient = data.paid_by_patient;
    this.discount = data.discount;
    this.vat = data.vat;
    this.remainToPay = data.remain_to_pay_by_insurance;
    this.chargesAmount = data.transaction_charges_per_bill;
    this.createdAt = parseInt(data.created_at, 10);
    this.updatedAt = parseInt(data.updated_at, 10);
  }
}

export interface IBillHistory {
  id: number;
  bill_key: string;
  status: number;
  msg: string;
  who: string;
  updated_at: number;
}

export class BillHistory {
  private _key: string;
  private _status: number;
  public readonly message: string;
  public readonly who: string;
  public readonly updatedAt: number;

  public get key() {
    return this._key;
  }

  public get status() {
    return this._status;
  }

  public set status(value: number) {
    if (BILL_STATUS.hasOwnProperty(value)) {
      this._status = value;
    }
  }

  public get statusValue() {
    return this._status !== undefined ? BILL_STATUS[this._status].value : 'Indefinite status';
  }

  constructor(data: IBillHistory) {
    this._key = data.bill_key;
    this.status = data.status;
    this.message = data.msg;
    this.who = data.who;
    this.updatedAt = data.updated_at;
  }
}
