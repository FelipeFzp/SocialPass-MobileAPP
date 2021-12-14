import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
    selector: 'app-about',
    templateUrl: 'about.page.html',
    styleUrls: ['about.page.scss'],
})
export class AboutPage {

    public appVersionCode: string;

    constructor(
        private _appVersion: AppVersion
    ) { }

    ionViewDidEnter() {
        this._appVersion.getVersionNumber().then(value => this.appVersionCode = value.toString());
    }
}
