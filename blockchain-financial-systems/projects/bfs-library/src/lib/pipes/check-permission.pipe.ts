import { Pipe, PipeTransform } from '@angular/core';
import { BFSApiService } from '../services/bfs-api.service';

@Pipe({
  name: 'checkPermission'
})
export class CheckPermissionPipe implements PipeTransform {

  transform(value: string, ...args: any[]): boolean {
    const permissions = BFSApiService.getPermissions();
    if (permissions.hasOwnProperty(value)) {
      return permissions[value] as boolean;
    } else {
      console.error(`Error: system doesn\'t have ${value} permission`);
      return false;
    }
  }

}
