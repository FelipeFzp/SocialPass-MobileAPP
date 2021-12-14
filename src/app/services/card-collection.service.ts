import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardCollection } from '../models/api/card-collection';
import { URLS } from './urls';

@Injectable()
export class CardCollectionService {

    constructor(
        private _http: HttpClient
    ) { }

    public getAvailableCollections(): Observable<CardCollection[]> {
        return this._http.get<CardCollection[]>(`${URLS.api.cardCollections}/available`);
    }

    public getCollectionsWithCards(): Observable<CardCollection[]> {
        return this._http.get<CardCollection[]>(`${URLS.api.cardCollections}/withCards`);
    }

    public deleteCollection(collectionId: string): Observable<void> {
        return this._http.delete<void>(`${URLS.api.cardCollections}/${collectionId}`);
    }

    public createCollection(collectionName: string): Observable<CardCollection> {
        return this._http.post<CardCollection>(`${URLS.api.cardCollections}`, {
            collection: {
                name: collectionName
            }
        });
    }

    public toggleCardIntoCollection(collectionId: string, cardId: string): Observable<void> {
        return this._http.patch<void>(`${URLS.api.cardCollections}/${collectionId}/card/${cardId}`, {});
    }
}