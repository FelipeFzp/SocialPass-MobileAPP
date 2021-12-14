import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

    transform(value: string, format: string = 'DD/MM/YYYY') {
        return moment.utc(value).local().format(format);
    }

}