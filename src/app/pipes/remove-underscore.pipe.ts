import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscore',
  standalone: true
})
export class RemoveUnderscorePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) return null;
    if(typeof value === 'string') return value.replace(/_/g, ' ');
    return null
  }

}
