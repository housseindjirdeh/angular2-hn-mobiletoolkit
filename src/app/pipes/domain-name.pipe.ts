import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'domainName'
})
export class DomainNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return 'test';
  }

}