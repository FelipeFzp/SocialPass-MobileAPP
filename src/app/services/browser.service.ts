import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable()
export class BrowserService {

    constructor(
        private _inAppBrowser: InAppBrowser,
        private _platform: Platform
    ) { }

    public redirectToUrl(url: string): void {
        if (this._platform.is('cordova')) {
            this._inAppBrowser.create(url, '_system');
        } else {
            window.open(url, '_blank');
        }
    }
}