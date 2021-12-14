import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Coordinates } from '../models/coordinates';

@Injectable()
export class GpsService {

    private _coordinates: Coordinates;

    public coordinatesSubject: Subject<Coordinates> = new Subject();

    constructor(
        private _geolocation: Geolocation,
        private _platform: Platform
    ) {
        this.getCurrentCoordinates();
    }

    private async getCurrentCoordinates(): Promise<void> {

        this._coordinates = await new Promise<Coordinates>((resolve, reject) => {
            if (this._platform.is('cordova')) {
                this._geolocation.getCurrentPosition().then(data => {
                    resolve(data.coords);
                });
            } else {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        resolve(position.coords);
                    });
                }
            }
        });

        this.coordinatesSubject.next(this.coordinates);
        this.coordinatesSubject.complete();
    }

    public get coordinates(): Coordinates {
        return this._coordinates;
    }
}