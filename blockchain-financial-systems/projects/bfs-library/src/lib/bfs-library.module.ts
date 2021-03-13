import { NgModule, ModuleWithProviders, InjectionToken, APP_INITIALIZER } from '@angular/core';
import { BFSConfigService } from './services/bfs-config.service';
import { BFSApiService } from './services/bfs-api.service';
import { BFSLocationService } from './services/bfs-location.service';
import { AccountService } from './services/bfs-account.service';
import { HospitalService } from './services/bfs-hospital.service';
import { InsuranceService } from './services/bfs-insurance.service';
import { AgreementService } from './services/bfs-agreement.service';
import { BillService } from './services/bfs-bill.service';
import { BFSLibraryComponentsModule } from './components/bfs-library-components.module';

export const PATH = new InjectionToken<string>( 'PATH');

export function initialize(config: BFSConfigService, filePath: string) {
  const result = () => config.load(filePath);
  return result;
}

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    BFSLibraryComponentsModule
  ]
})
export class BFSLibraryModule {

  static forRoot(filePath): ModuleWithProviders {

    return {
      ngModule: BFSLibraryModule,
      providers: [
        BFSConfigService,
        BFSApiService,
        BFSLocationService,
        AccountService,
        HospitalService,
        InsuranceService,
        AgreementService,
        BillService,
        { provide: PATH, useValue: filePath },
        { provide: APP_INITIALIZER, useFactory: initialize, deps: [BFSConfigService, PATH], multi: true }
      ]
    };
  }

}
