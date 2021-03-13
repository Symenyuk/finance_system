export interface IService {
  id: number;
  name: string;
}

export class Service {
  private _id: number;
  public name: string;

  public get id() {
    return this._id;
  }

  constructor(data: IService) {
    this._id = data.id;
    this.name = data.name;
  }
}
