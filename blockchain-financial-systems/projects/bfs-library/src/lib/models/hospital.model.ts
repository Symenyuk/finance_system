export interface IHospital {
  id: number;
  name: string;
  name_unique: string;
  zip_code: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_phone: string;
  owner: string;
  admin: string;
}

export class Hospital {
  private _id: number;
  public name: string;
  public uniqueName: string;
  public zipCode: string;
  public contact: {
    name: string;
    email: string;
    phone: string;
  };
  public owner: string;
  public admin: string;

  public get id() {
    return this._id;
  }

  constructor(data: IHospital) {
    this._id = data.id;
    this.name = data.name;
    this.uniqueName = data.name_unique;
    this.zipCode = data.zip_code;
    this.contact = {
      name: data.contact_person_name,
      email: data.contact_person_email,
      phone: data.contact_person_phone
    };
    this.owner = data.owner;
    this.admin = data.admin;
  }
}
