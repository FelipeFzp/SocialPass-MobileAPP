import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpResponseHelper } from '../common/helpers/http-response-helper';

@Injectable()
export class ToastService {
    private static DURATION = 3000;

    constructor(
        private _toastController: ToastController
    ) { }

    public async show(message: string, duration: number = ToastService.DURATION) {

        this._toastController.create({
            duration,
            message,
            position: 'bottom',
            translucent: true,
            color: 'light',
            buttons: ['X']
        }).then(toast => toast.present());
    }

    public async showHttpError(error: any) {
        this._toastController.create({
            duration: ToastService.DURATION,
            message: HttpResponseHelper.mapErrorResponse(error).message,
            buttons: ['X']
        }).then(toast => toast.present());
    }
}