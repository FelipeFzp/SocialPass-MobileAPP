import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SocialMediaHelper } from '../../../common/helpers/social-media-helper';
import { CardIcon } from '../../../models/api/card-icons';
import { SocialNetwork } from '../../../models/api/social-network';
import { CardIconOutput } from '../../../models/output/card-icon-output';
import { SocialMediaIntegration } from '../../../models/social-media-integration';
import { AlertService } from '../../../services/alert.service';
import { AppPlatformService } from '../../../services/app-platform.service';
import { AuthService } from '../../../services/auth.service';
import { CardService } from '../../../services/card.service';
import { LoaderService } from '../../../services/loader.service';
import { SocialNetworkService } from '../../../services/social-network.service';
import { ToastService } from '../../../services/toast.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-icon-edit',
  templateUrl: './icon-edit.component.html',
  styleUrls: ['./icon-edit.component.scss'],
})
export class IconEditComponent implements OnInit {
  @Input() public icon?: CardIcon;

  public socialNetworks: SocialNetwork[] = [];
  public selectedNetwork: SocialNetwork;
  public iconForm: FormGroup;
  public socialNetworkAutoConfigured: boolean;

  public socialNetworkIntegrations: SocialMediaIntegration = {
    email: {
      hasGoogleIntegration: true,
      hasFacebookIntegration: true,
      hasLinkedinIntegration: true
    },
    // 'facebook': {
    //   hasFacebookIntegration: true
    // }
  };

  private _socialMediaHelper: SocialMediaHelper;

  constructor(
    private _socialNetworkService: SocialNetworkService,
    private _loader: LoaderService,
    private _toast: ToastService,
    private _modalCtrl: ModalController,
    private _cardService: CardService,
    private _alertService: AlertService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    public platform: AppPlatformService,
  ) {
    this._socialMediaHelper = new SocialMediaHelper(this._userService);
    this.initForm();
  }

  ngOnInit() {
    if (this.icon) {
      this.setForm();
    }

    this.getSocialNetworks(() => {
      this.verifySocialNetwork();

      const linkedinAuthToken = this._activatedRoute.snapshot.queryParams.code;
      if (linkedinAuthToken) {
        this.selectedNetwork = this.socialNetworks.find(s => s.key == this._activatedRoute.snapshot.queryParams.configuring);
        this.iconForm.get('socialNetwork').setValue(this.selectedNetwork.id);

        this.configureFromLinkedin(linkedinAuthToken);
      }
    });
  }

  private initForm(): void {

    this.iconForm = new FormGroup({
      socialNetwork: new FormControl(null, Validators.required),
      link: new FormControl(null),
      nick: new FormControl(null),
      title: new FormControl(null),
    });
  }

  private setForm(): void {
    this.iconForm.get('socialNetwork').setValue(this.icon.socialNetwork.id);
    this.iconForm.get('title').setValue(this.icon?.title);

    if (this.icon.nick) {
      this.iconForm.get('nick').setValue(this.icon.nick);
    } else {
      this.iconForm.get('link').setValue(this.icon.link);
    }
  }

  public verifySocialNetwork(): void {
    this.socialNetworkAutoConfigured = false;
    const socialControl = this.iconForm.get('socialNetwork');
    this.selectedNetwork = this.socialNetworks.find(sn => sn.id == socialControl.value);

    if (this.selectedNetwork) {
      if (this.selectedNetwork.baseUrl) {
        this.iconForm.get('nick').setValidators(Validators.required);
      } else {
        this.iconForm.get('link').setValidators(Validators.required);
      }
    }
  }

  private getSocialNetworks(cb?: () => void): void {
    // this._loader.show();
    this._socialNetworkService.getAll().subscribe(response => {
      this._loader.dismiss();
      this.socialNetworks = response;
      if (cb) { cb(); }
    }, error => {
      // this._loader.dismiss();
      this._toast.showHttpError(error);
    });
  }

  public save(): void {
    const icon: CardIconOutput = {
      socialNetworkId: this.iconForm.get('socialNetwork').value,
      nick: this.iconForm.get('nick').value,
      link: this.iconForm.get('link').value,
      title: this.iconForm.get('title').value,
    };

    let serviceCall: Observable<CardIcon>;
    let successMessage: string;

    if (this.icon) {
      icon.key = this.icon.key;
      serviceCall = this._cardService.updateIcon(icon);
      successMessage = 'Ícone editado 😉';
    } else {
      serviceCall = this._cardService.addIcon(icon);
      successMessage = 'Ícone adicionado 😃';
    }

    this._loader.show();
    serviceCall.subscribe(response => {
      this._loader.dismiss();
      this._toast.show(successMessage);
      this._modalCtrl.dismiss({ ok: true });
    }, error => {
      this._loader.dismiss();
      this._toast.showHttpError(error);
    });
  }

  public cancel(): void {
    this._modalCtrl.dismiss();
  }

  public remove(): void {

    this._alertService.show({
      subHeader: 'Tem certeza que deseja excluir?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          cssClass: 'danger',
          handler: () => {
            this._loader.show();
            this._cardService.removeIcon(this.icon.key).subscribe(response => {
              this._loader.dismiss();
              this._toast.show('Ícone removido');
              this._modalCtrl.dismiss({ ok: true });
            }, error => {
              this._loader.dismiss();
              this._toast.showHttpError(error);
            });
          }
        }
      ]
    });
  }

  public async configureFromFacebook(): Promise<void> {
    const profile = await this._socialMediaHelper.loginWithFacebook();
    switch (this.selectedNetwork.key) {
      case 'email':
        this.iconForm.get('nick').setValue(profile.email);
        break;
      case 'facebook':
        this.iconForm.get('nick').setValue(profile.link.replace('https://www.facebook.com/', ''));
        break;
    }
    this.socialNetworkAutoConfigured = true;
  }

  public async configureFromGoogle(): Promise<void> {
    const profile = await this._socialMediaHelper.loginWithGoogle();
    switch (this.selectedNetwork.key) {
      case 'email':
        this.iconForm.get('nick').setValue(profile.email);
        break;
    }
    this.socialNetworkAutoConfigured = true;
  }

  public async configureFromLinkedin(authenticationToken?: string): Promise<void> {
    const profile = await this._socialMediaHelper.loginWithLinkedin(authenticationToken, this._getLinkedinRedirectUrl());
    switch (this.selectedNetwork.key) {
      case 'email':
        this.iconForm.get('nick').setValue(profile.email);
        break;
    }
    this.socialNetworkAutoConfigured = true;
  }

  private _getLinkedinRedirectUrl(): string {
    return `${window.location.href.split('?')[0]}?configuring=${this.selectedNetwork.key}`;
  }
}
