import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SocialMediaHelper } from '../../common/helpers/social-media-helper';
import { User } from '../../models/api/user';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
declare var FB;

@Component({
    selector: 'app-linked-accounts',
    templateUrl: 'linked-accounts.page.html',
    styleUrls: ['linked-accounts.page.scss'],
})
export class LinkedAccountsPage implements OnInit {
    private _socialMediaHelper: SocialMediaHelper;
    public user: User;

    constructor(
        private _userService: UserService,
        private _authService: AuthService,
        private _loaderService: LoaderService,
        private _toastService: ToastService,
        private _activatedRoute: ActivatedRoute,
        private _navCtrl: NavController,
    ) {
        this._socialMediaHelper = new SocialMediaHelper(this._userService);
    }

    ngOnInit() {
        const linkedinAuthToken = this._activatedRoute.snapshot.queryParams.code;
        if (linkedinAuthToken) {
            this.toggleLinkedinAccountLink(linkedinAuthToken);
        }
    }

    ionViewDidEnter() {
        this._userService.getLoggedUser()
            .subscribe(user => this.user = user);
    }

    public async toggleGoogleAccountLink(): Promise<void> {
        this._loaderService.show();
        if (this.user.googleUserId) {
            this._userService.unlinkGoogleAccount(this.user.googleUserId)
                .subscribe(async (user) => {
                    this.user = user;
                    this._loaderService.dismiss();
                }, error => {
                    this._toastService.show('Falha ao desvincular conta.')
                    this._loaderService.dismiss();
                });
        } else {
            try {
                const profile = await this._socialMediaHelper.loginWithGoogle();
                this._userService.linkGoogleAccount(profile.id)
                    .subscribe(user => {
                        this.user = user;
                        this._loaderService.dismiss();
                    }, error => {
                        this._toastService.showHttpError(error);
                        this._loaderService.dismiss();
                    });
            }
            catch (error) {
                this._toastService.show(error);
                this._loaderService.dismiss();
            }
        }
    }

    public async toggleLinkedinAccountLink(authenticationToken?: string): Promise<void> {
        this._loaderService.show();
        if (this.user?.linkedinUserId) {
            this._userService.unlinkLinkedinAccount(this.user.linkedinUserId)
                .subscribe((user) => {
                    this.user = user;
                    this._loaderService.dismiss();
                }, error => {
                    this._toastService.show('Falha ao desvincular conta.')
                    this._loaderService.dismiss();
                });
        } else {
            try {
                const profile = await this._socialMediaHelper.loginWithLinkedin(authenticationToken, this._getLinkedinRedirectUrl());
                this._userService.linkLinkedinAccount(profile.id)
                    .subscribe(user => {
                        this.user = user;
                        this._navCtrl.navigateRoot('/linked-accounts', { replaceUrl: true });
                        this._loaderService.dismiss();
                    }, error => {
                        this._toastService.showHttpError(error);
                        this._loaderService.dismiss();
                    });
            } catch (error) {
                this._toastService.show('Falha ao vincular conta.')
                this._loaderService.dismiss();
            }
        }
    }

    public async toggleFacebookAccountLink(): Promise<void> {
        this._loaderService.show();
        if (this.user.facebookUserId) {
            this._userService.unlinkFacebookAccount(this.user.facebookUserId)
                .subscribe((user) => {
                    this.user = user
                    FB.logout();
                    this._loaderService.dismiss();
                }, error => {
                    this._toastService.show('Falha ao desvincular conta.')
                    this._loaderService.dismiss()
                });
        } else {
            try {
                const profile = await this._socialMediaHelper.loginWithFacebook();
                this._userService.linkFacebookAccount(profile.id)
                    .subscribe(user => {
                        this.user = user;
                        this._loaderService.dismiss();
                    }, error => {
                        this._toastService.showHttpError(error);
                        this._loaderService.dismiss();
                    });
            }
            catch (error) {
                this._toastService.show(error);
                this._loaderService.dismiss();
            }
        }
    }

    private _getLinkedinRedirectUrl(): string {
        const redirectRoute = this._activatedRoute.snapshot.queryParams.redirectRoute;
        return `${window.location.href.split('?')[0]}${redirectRoute ? ('?redirectRoute=' + redirectRoute) : ''}`;
    }
}
