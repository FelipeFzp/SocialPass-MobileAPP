import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core/dist/types/components/alert/alert-interface'
import { Observable } from 'rxjs';

@Injectable()
export class AlertService {

    constructor(
        private _alertCtrl: AlertController
    ) { }

    public show(options: AlertOptions, cb?: (alert: HTMLIonAlertElement) => void): void {
        this._alertCtrl.create(options)
            .then(alert => {
                alert.present();

                if (cb)
                    cb(alert);
            });
    }
}