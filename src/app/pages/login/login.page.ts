import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { HttpResponseHelper } from 'src/app/common/helpers/http-response-helper';
import { NavController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { SocialMediaHelper } from '../../common/helpers/social-media-helper';
import { AppPlatformService } from '../../services/app-platform.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  private _socialMediaHelper: SocialMediaHelper;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _http: HttpClient,
    private _toast: ToastService,
    public navCtrl: NavController,
    private _loader: LoaderService,
    private _activatedRoute: ActivatedRoute,
    public platform: AppPlatformService
  ) {
    this.initForm();
    this._socialMediaHelper = new SocialMediaHelper(this._userService);
  }

  ngOnInit() {
    const linkedinAuthToken = this._activatedRoute.snapshot.queryParams.code;
    if (linkedinAuthToken) {
      this.loginWithLinkedin(linkedinAuthToken);
    }
  }

  public async loginWithGoogle(): Promise<void> {
    this._loader.show();

    try {
      const profile = await this._socialMediaHelper.loginWithGoogle();
      this._authService.loginWithGoogle({
        email: profile.email,
        fullName: profile.name,
        userId: profile.id
      }).subscribe(response => {
        this._loader.dismiss();
        let redirectRoute = this._activatedRoute.snapshot.queryParams.redirectRoute;
        this.navCtrl.navigateRoot(redirectRoute || '/home/search');
      }, error => {
        this._toast.show(HttpResponseHelper.mapErrorResponse(error).message || 'Falha ao fazer login com o Google. 😟');
      })
    } catch (error) {
      this._toast.show(error);
      this._loader.dismiss();
    }
  }

  public async loginWithFacebook(): Promise<void> {
    this._loader.show();

    try {
      const profile = await this._socialMediaHelper.loginWithFacebook();
      this._authService.loginWithFacebook({
        email: profile.email,
        fullName: profile.name,
        userId: profile.id
      }).subscribe(response => {
        this._loader.dismiss();
        let redirectRoute = this._activatedRoute.snapshot.queryParams.redirectRoute;
        this.navCtrl.navigateRoot(redirectRoute || '/home/search');
      }, error => {
        this._toast.show(HttpResponseHelper.mapErrorResponse(error).message || 'Falha ao fazer login com o Facebook. 😟');
      })
    } catch (error) {
      this._toast.show(error);
      this._loader.dismiss();
    }
  }

  public async loginWithLinkedin(authenticationToken?: string): Promise<void> {
    this._loader.show();
    const profile = await this._socialMediaHelper.loginWithLinkedin(authenticationToken, this._getLinkedinRedirectUrl());

    this._authService.loginWithLinkedin({
      userId: profile.id,
      email: profile.email,
      fullName: profile.name
    }).subscribe(response => {
      this._loader.dismiss();
      let redirectRoute = this._activatedRoute.snapshot.queryParams.redirectRoute;
      this.navCtrl.navigateRoot(redirectRoute || '/home/search');
    }, error => {
      this._toast.show(HttpResponseHelper.mapErrorResponse(error).message || 'Falha ao fazer login com o Linkedin. 😟');
    })
  }

  private _getLinkedinRedirectUrl(): string {
    const redirectRoute = this._activatedRoute.snapshot.queryParams.redirectRoute;
    return `${window.location.href.split('?')[0]}${redirectRoute ? ('?redirectRoute=' + redirectRoute) : ''}`;
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
  }

  public login(): void {

    this._loader.show();

    this._authService.login({
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }).subscribe(response => {
      this._loader.dismiss();
      let redirectRoute = this._activatedRoute.snapshot.queryParams.redirectRoute;
      this.navCtrl.navigateRoot(redirectRoute || '/home/search');
    }, error => {
      this._loader.dismiss();
      this._toast.show(HttpResponseHelper.mapErrorResponse(error).message);
    });

  }

  public recoverPassword(): void {
    this.navCtrl.navigateRoot('/lost-password');
  }
}
