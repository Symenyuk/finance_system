export interface IBranch {
  id: number;
  name: string;
  description: string;
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
  manager_id: number;
  hospital: number;
}

export class Branch {
  private _id: number;
  public name: string;
  public description: string;
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
  public manager: number;
  public hospital: number;

  public get id() {
    return this._id;
  }

  constructor(data: IBranch) {
    this._id = data.id;
    this.name = data.name;
    this.description = data.description;
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
    this.manager = data.manager_id;
    this.hospital = data.hospital;
  }
}
