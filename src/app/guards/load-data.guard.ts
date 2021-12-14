import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadDataGuard implements CanActivate {

    constructor(
        private _storageService: StorageService,
        private _navCtrl: NavController,
        private _toastService: ToastService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this._storageService.loadData().subscribe(data => {
                if (data) {
                    observer.next(true);
                } else {
                    this._navCtrl.navigateRoot('/login', {
                        queryParams: {
                            redirectRoute: state.url
                        }
                    });
                    observer.next(false);
                }
            });
        });
    }

}