import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable()
export class AppPlatformService {

    public isPhone: boolean;
    public isCordova: boolean;
    public isWeb: boolean;

    constructor(
        private _platform: Platform
    ) {
        this.verifyPlatform();
    }

    private verifyPlatform(): void {
        this.isPhone =
            this._platform.is('android')
            || this._platform.is('ios')
            || this._platform.is('iphone')
            || this._platform.is('ipad');

        this.isWeb = this._platform.is('pwa')
            || this._platform.is('mobileweb')
            || this._platform.is('desktop');

        this.isCordova = this._platform.is('cordova');
    }
}