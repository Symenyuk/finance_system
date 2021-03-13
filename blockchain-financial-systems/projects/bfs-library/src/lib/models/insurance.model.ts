export interface IInsurance {
  id: number;
  name: string;
  contact_person: string;
  zip_code: string;
  country: string;
  region: string;
  city: string;
  district: string;
  street: string;
  building: string;
  email: string;
  tel: string;
  mobile: string;
  extension: string;
  owner: string;
  admin: string;
}

export class Insurance {
  private _id: number;
  public name: string;
  public contactPerson: string;
  public zipCode: string;
  public address: {
    country: string;
    region: string;
    city: string;
    district: string;
    street: string;
    building: string;
  };
  public email: string;
  public telephone: string;
  public mobile: string;
  public extension: string;
  public owner: string;
  public admin: string;

  public get id() {
    return this._id;
  }

  constructor(data: IInsurance) {
    this._id = data.id;
    this.name = data.name;
    this.contactPerson = data.contact_person;
    this.zipCode = data.zip_code;
    this.address = {
      country: data.country,
      region: data.region,
      city: data.city,
      district: data.district,
      street: data.street,
      building: data.building
    };
    this.email = data.email;
    this.telephone = data.tel;
    this.mobile = data.mobile;
    this.extension = data.extension;
    this.owner = data.owner;
    this.admin = data.admin;
  }
}
