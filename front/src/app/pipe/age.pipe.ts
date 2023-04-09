import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs'

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date): number {
    let today = dayjs();
    let birthdate = dayjs(value);
    return today.diff(birthdate, 'years');
  }

}
