import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Observable } from 'rxjs';
import { Card } from '../models/api/card';
import { CardBackground } from '../models/api/card-background';
import { CardIcon } from '../models/api/card-icons';
import { AddressOutput } from '../models/output/address-output';
import { CardIconOrderOutput } from '../models/output/card-icon-order-output';
import { CardIconOutput } from '../models/output/card-icon-output';
import { IpService } from './ip.service';
import { URLS } from './urls';

@Injectable()
export class CardService {

    constructor(
        private _http: HttpClient,
        private _ipService: IpService
    ) { }

    public get(): Observable<Card> {
        return this._http.get<Card>(`${URLS.api.cards}/my`);
    }

    public setBackground(bg: any): Observable<CardBackground> {
        const data = new FormData();

        if (Array.isArray(bg))
            data.append('colorRgb', JSON.stringify(bg));
        else
            data.append('image', bg);

        return this._http.post<CardBackground>(`${URLS.api.cards}/background`, data);
    }

    public setBlur(level: number): Observable<CardBackground> {
        return this._http.post<CardBackground>(`${URLS.api.cards}/background/blur`, {
            blur: level
        });
    }

    public addIcon(body: CardIconOutput): Observable<CardIcon> {
        return this._http.post<CardIcon>(`${URLS.api.cards}/addIcon`, body);
    }

    public updateIcon(body: CardIconOutput): Observable<CardIcon> {
        return this._http.put<CardIcon>(`${URLS.api.cards}/updateIcon`, body);
    }

    public removeIcon(iconKey: string): Observable<void> {
        return this._http.delete<void>(`${URLS.api.cards}/removeIcon/${iconKey}`);
    }

    public updateOrder(cardIconOrder: CardIconOrderOutput): Observable<CardIcon[]> {
        return this._http.put<CardIcon[]>(`${URLS.api.cards}/updateIconOrder`, cardIconOrder);
    }

    public updateCategories(categoriesIds: string[]): Observable<void> {
        return this._http.put<void>(`${URLS.api.cards}/updateCategories`, categoriesIds);
    }

    public updateAddress(address: AddressOutput): Observable<Address> {
        return this._http.put<Address>(`${URLS.api.cards}/updateAddress`, address);
    }

    public registerView(cardId: string): Observable<void> {
        return new Observable(observer => {
            this._ipService.getIpv6().subscribe(ip => {
                this._http.patch<void>(`${URLS.api.cards}/registerView`, { cardId, clientAddress: ip })
                    .subscribe(r => observer.next(r));
            })
        })
    }
}