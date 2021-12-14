import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { Card } from '../models/api/card';
import { URLS } from './urls';
import { User } from '../models/api/user';
import { SearchDefaultCategoriesList } from '../models/api/search-default-categories-list';
import { GpsService } from './gps.service';
import { IpService } from './ip.service';
import { TrendSearchAutocompleteResult } from '../models/api/trend-search-autocomplete-result';

@Injectable()
export class TrendsService {

    constructor(
        private _http: HttpClient,
        private _gpsService: GpsService,
        private _ipService: IpService
    ) { }

    public search(searchTerms: string[], page: number, limit: number): Observable<User[]> {

        return this._http.post<User[]>(`${URLS.api.trends}/search/${page}/${limit}`, {
            terms: searchTerms
        });
    }

    public getAutocompletes(searchTerm: string): Observable<TrendSearchAutocompleteResult[]> {
        return this._http.post<TrendSearchAutocompleteResult[]>(`${URLS.api.trends}/autocompletes`, {
            term: searchTerm
        });
    }

    public searchWithDefaultCategory(defaultCategoryId: string, searchTerms: string[], page: number, limit: number): Observable<User[]> {

        return new Observable<User[]>(observer => {
            this._ipService.getIpv6().subscribe(ip => {

                this._http.post<User[]>(`${URLS.api.trends}/home/category/${defaultCategoryId}/${page}/${limit}`, {
                    terms: searchTerms,
                    clientAddress: ip,
                    coords: {
                        latitude: this._gpsService.coordinates?.latitude,
                        longitude: this._gpsService.coordinates?.longitude
                    }
                }).subscribe(response => {
                    observer.next(response);
                    observer.complete();
                }, error => {
                    observer.error(error);
                });
            });
        });
    }

    public listDefaultCategories(): Observable<SearchDefaultCategoriesList> {
        return new Observable<SearchDefaultCategoriesList>(observer => {
            this._ipService.getIpv6().subscribe(ip => {
                this._http.post<SearchDefaultCategoriesList>(`${URLS.api.trends}/home/categories`, {
                    clientAddress: ip,
                    coords: {
                        latitude: this._gpsService.coordinates?.latitude,
                        longitude: this._gpsService.coordinates?.longitude
                    }
                }).subscribe(response => {
                    observer.next(response);
                    observer.complete();
                }, error => {
                    observer.error(error);
                });;
            });
        });
    }


}
