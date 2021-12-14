import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable, Subject } from 'rxjs';
import { URLS } from './urls';
import { StorageService } from './storage.service';
import { LoginOutput } from '../models/output/login-output';
import { UserToken } from '../models/api/user-token';
import { MenuService } from './menu.service';
import { NavController } from '@ionic/angular';
import { FacebookLoginOutput } from '../models/output/facebook-login-output';
import { GoogleLoginOutput } from '../models/output/google-login-output';
import { LinkedinLoginOutput } from '../models/output/linkedin-login-output';

@Injectable()
export class AuthService {
    public onLoggedChange = new Subject<boolean>();

    constructor(
        private _http: HttpClient,
        private _storageService: StorageService,
        private _menuService: MenuService,
        private _navCtrl: NavController,
    ) { }

    public login(l: LoginOutput): Observable<UserToken> {
        return new Observable(observer => {
            this._http.post<UserToken>(`${URLS.api.auth}/login`, l).subscribe(response => {

                this._storageService.data = {
                    user: response.user,
                    token: response.token
                };

                this._storageService.saveData().subscribe(data => {
                    observer.next(response);
                    this.onLoggedChange.next();
                });

            }, error => {
                observer.error(error);
            });
        });
    }

    public loginWithFacebook(l: FacebookLoginOutput): Observable<UserToken> {
        return new Observable(observer => {
            this._http.post<UserToken>(`${URLS.api.auth}/login/facebook`, l)
                .subscribe(response => {
                    this._storageService.data = {
                        user: response.user,
                        token: response.token
                    };

                    this._storageService.saveData().subscribe(data => {
                        observer.next(response);
                        this.onLoggedChange.next();
                    });

                }, error => {
                    observer.error(error);
                });
        });
    }

    public loginWithGoogle(l: GoogleLoginOutput): Observable<UserToken> {
        return new Observable(observer => {
            this._http.post<UserToken>(`${URLS.api.auth}/login/google`, l)
                .subscribe(response => {
                    this._storageService.data = {
                        user: response.user,
                        token: response.token
                    };

                    this._storageService.saveData().subscribe(data => {
                        observer.next(response);
                        this.onLoggedChange.next();
                    });

                }, error => {
                    observer.error(error);
                });
        });
    }

    public loginWithLinkedin(l: LinkedinLoginOutput): Observable<UserToken> {
        return new Observable(observer => {
            this._http.post<UserToken>(`${URLS.api.auth}/login/linkedin`, l)
                .subscribe(response => {
                    this._storageService.data = {
                        user: response.user,
                        token: response.token
                    };

                    this._storageService.saveData().subscribe(data => {
                        observer.next(response);
                        this.onLoggedChange.next();
                    });

                }, error => {
                    observer.error(error);
                });
        });
    }

    public logout(redirectRoute: string = '/home/search'): Observable<UserToken> {
        return new Observable(observer => {
            setTimeout(() => {
                this._storageService.data = null;
                this._storageService.saveData().subscribe(() => {
                    this._menuService.menuToggle();

                    this.onLoggedChange.next();
                    observer.next();
                    this._navCtrl.navigateRoot(redirectRoute);
                });
            }, 2000);
        });
    }

    public refresh(): Observable<UserToken> {
        return new Observable(observer => {

            if (!this._storageService.data)
                observer.error(new Error('Token inválido'));

            this._http.post<UserToken>(`${URLS.api.auth}/refresh`, null)
                .subscribe(response => {
                    this._storageService.data = {
                        user: response.user,
                        token: response.token
                    };

                    this._storageService.saveData().subscribe(data => {
                        observer.next(response);
                        this.onLoggedChange.next();
                    });
                }, error => {
                    observer.error(error);
                });
        });
    }

    public getAuthorizationHeaders(): any {
        return {
            Authorization: `Bearer ${this._storageService.data.token}`
        }
    }
}