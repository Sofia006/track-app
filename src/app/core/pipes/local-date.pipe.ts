/**
 * Usage: dateString | localDate:'format'
 **/

import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'localDate',
})
export class LocalDatePipe implements PipeTransform {

  constructor() {
  }

  public transform(value: any, format: string = 'shortDate'): any {
    if (!value) {
      return '';
    }
    if (typeof value === 'string') {
      value = value.replace(/ /g, 'T');
    }
    return moment(value).tz('Europe/Copenhagen').format(format);
  }
}
