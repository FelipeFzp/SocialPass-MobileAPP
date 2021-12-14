import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'calendar'
})
export class CalendarPipe implements PipeTransform {

    transform(value: string, toLower = false) {
        let calendar = moment.utc(value).local().calendar();

        if (toLower)
            calendar = calendar.toLocaleLowerCase();

        return calendar;
    }

}