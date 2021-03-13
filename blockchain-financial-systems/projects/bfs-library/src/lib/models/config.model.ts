export interface IConfig {
  apiUrl?: string;
  whence?: string;
  pageSize?: {options: number[], default: number, dashboard: number};
}

// TODO correct constructor
export class Config implements IConfig {
  public apiUrl: string;
  public whence: string;
  public pageSize: {options: number[], default: number, dashboard: number};

  constructor(config: IConfig = {}) {
    this.apiUrl = config.apiUrl || '';
    this.whence = config.whence || '';
    this.pageSize = config.pageSize || {options: [], default: 0, dashboard: 0};
  }

  update(config: IConfig) {
    this.apiUrl = config.apiUrl;
    this.whence = config.whence;
    this.pageSize = config.pageSize;
  }
}
