import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {
    private _showing: boolean;
    private _loader: HTMLIonLoadingElement;

    constructor(
        private _loadingController: LoadingController
    ) { }

    public show(message?: string): void {
        this._showing = true;
        this._loadingController.create({
            message: message || 'Carregando...'
        }).then((l) => {
            if (this._showing) {
                this._loader = l;
                this._loader.present();
            }
        });
    }

    public dismiss(): void {

        const result = this.close();
        if (!result) {
            setTimeout(() => {
                this.close();
            }, 1000);
        }
    }

    private close(): boolean {

        const condition = this._loader && this._showing;

        if (condition) {
            this._showing = false;
            this._loader.dismiss();
        }

        return condition;
    }
}