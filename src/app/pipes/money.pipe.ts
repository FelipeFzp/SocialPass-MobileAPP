import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'money'
})
export class MoneyPipe implements PipeTransform {

    transform(value: number) {
        return `R$ ${value.toFixed(2).replace('.', ',')}`;
    }

}