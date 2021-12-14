import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardCategoryWithRelated } from '../models/api/card-category-with-related';
import { SocialNetwork } from '../models/api/social-network';
import { URLS } from './urls';

@Injectable()
export class CardCategoryService {

    constructor(
        private _http: HttpClient
    ) { }

    public getAllWithRelated(): Observable<CardCategoryWithRelated[]> {
        return this._http.get<CardCategoryWithRelated[]>(`${URLS.api.cardCategories}/list`);
    }
}