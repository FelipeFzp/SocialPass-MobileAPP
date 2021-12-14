import { Pipe, PipeTransform } from '@angular/core';
import { SocialNetwork } from '../models/api/social-network';

@Pipe({
    name: 'cssRbg'
})
export class CssRgbPipe implements PipeTransform {

    transform(value: number[]) {
        return `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
    }

}