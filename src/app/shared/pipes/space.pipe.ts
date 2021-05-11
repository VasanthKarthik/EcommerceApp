import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'space',
})
export class SpacePipe implements PipeTransform {
  transform(value: Array<any>): string {
    return value.toString().replace(/,/g, ', ');
  }
}
