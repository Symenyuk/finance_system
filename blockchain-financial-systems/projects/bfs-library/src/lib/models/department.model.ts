export interface IDepartment {
  id: number;
  name: string;
  branch: number;
}

export class Department {
  private _id: number;
  public name: string;
  public branch: number;

  public get id() {
    return this._id;
  }

  constructor(data: IDepartment) {
    this._id = data.id;
    this.name = data.name;
    this.branch = data.branch;
  }
}
