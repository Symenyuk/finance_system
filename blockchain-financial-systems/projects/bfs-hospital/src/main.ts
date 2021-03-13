import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export interface Array<T> {
  sortBy(field: string): Array<T>;
}

export const sort = 'sortBy';

if (!Array.prototype[sort]) {
  Array.prototype[sort] = function(field) {
    return this.sort((a, b) => {
      if (a[field].toLowerCase() < b[field].toLowerCase()) {
        return -1;
      }
      if (a[field].toLowerCase() > b[field].toLowerCase()) {
        return 1;
      }
      return 0;
    });
  };
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
