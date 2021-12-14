import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialNetwork } from '../models/api/social-network';
import { URLS } from './urls';

@Injectable()
export class SocialNetworkService {

    constructor(
        private _http: HttpClient
    ) { }

    public getAll(): Observable<SocialNetwork[]> {
        return this._http.get<SocialNetwork[]>(URLS.api.socialNetworks);
    }
}