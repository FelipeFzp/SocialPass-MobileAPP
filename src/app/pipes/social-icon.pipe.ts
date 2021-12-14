import { Pipe, PipeTransform } from '@angular/core';
import { SocialNetwork } from '../models/api/social-network';
import { URLS } from '../services/urls';

@Pipe({
    name: 'socialIcon'
})
export class SocialIconPipe implements PipeTransform {

    transform(value: SocialNetwork) {
        return `${URLS.api.files}/static/social-icons/${value.key}.png`;
    }

}