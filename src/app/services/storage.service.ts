import { AppData } from '../models/app-data';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

    private static DATA_KEY = 'app_data';

    public data: AppData;
    public dataSubject: Subject<AppData> = new Subject();

    constructor(
        private _storage: Storage
    ) { }

    public loadData(): Observable<AppData> {
        return new Observable(observer => {
            this._storage.get(StorageService.DATA_KEY)
                .then(value => {
                    this.data = value;
                    observer.next(value);
                    this.dataSubject.next(this.data);
                });
        });
    }

    public saveData(): Observable<void> {
        return new Observable(observer => {
            this._storage.set(StorageService.DATA_KEY, this.data)
                .then(x => {
                    observer.next();
                    this.dataSubject.next(this.data);
                });
        });
    }
}