import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    let result = '';
    const hours = Math.floor(value / 60);
    result += hours ? `${hours}h ` : '';
    const minutes = value % 60;
    result += minutes ? `${minutes}min` : '';
    return result;
  }
}
