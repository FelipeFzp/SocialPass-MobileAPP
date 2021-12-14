import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform, PopoverController } from '@ionic/angular';
import { Card } from '../../../../models/api/card';
import { CardIcon } from '../../../../models/api/card-icons';
import { User } from '../../../../models/api/user';
import { BrowserService } from '../../../../services/browser.service';
import { CardService } from '../../../../services/card.service';
import { ToastService } from '../../../../services/toast.service';
import { UserService } from '../../../../services/user.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { environment } from '../../../../../environments/environment';
import { WebClipboard } from '../../../../common/helpers/web-clipboard.helper';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthService } from '../../../../services/auth.service';
import { StorageService } from '../../../../services/storage.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  public isMyCard: boolean = true;

  public card: Card;
  public isDesktop: boolean = true;
  public user: User;

  public fabIsOpen: boolean = false;
  public background: string = 'rgb(255, 255, 255)';
  public backBackgroundColor: string;
  public blur: number = 0;

  constructor(
    public navCtrl: NavController,
    private _cardService: CardService,
    private _toast: ToastService,
    private _browserService: BrowserService,
    private _userService: UserService,
    private _socialSharing: SocialSharing,
    private _platform: Platform,
    private _alert: AlertService,
    private _modal: ModalController,
    private _router: Router,
    private _authService: AuthService,
    private _storageService: StorageService,
    private _activatedRoute: ActivatedRoute,
    private _popoverController: PopoverController,
  ) {
  }

  ngOnInit() {
    this._router.events.subscribe(r => {
      if (r instanceof NavigationEnd && r.url == "/home/card") {
        this.user = null;
        this.card = null;

        this.getCard(() => {
          this.defineBackground();
          this.defineBlur();
          this._userService.getLoggedUser().subscribe(user => this.user = user);
          this.isMyCard = true;
        });
      }
    })
  }

  ionViewDidEnter() {
    const userName = this._activatedRoute.snapshot.queryParams.userName;
    this.isMyCard = !userName;

    this.user = null;
    this.card = null;

    if (this.isMyCard) {
      this.getCard(() => {
        this.defineBackground();
        this.defineBlur();

        this.handleWelcomeModal();
      });
      this._userService.getLoggedUser().subscribe(user => this.user = user);
    } else {

      this._userService.getByNickname(userName)
        .subscribe(user => {
          this._userService.getLoggedUser()
            .subscribe(loggedUser => {
              this.user = user;
              this.user['followedBy'] = !!loggedUser.following?.find(f => f.user == this.user.id);

              this.card = user.card;

              this.defineBackground();
              this.defineBlur();

              this._cardService.registerView(this.card.id)
                .subscribe(r => r);
            })

        })
    }
  }

  public async showCardStatistics(): Promise<void> {
    const cardCategoriesNames = this.card.categories?.map(p => p.name);
    await this._alert.show({
      header: '📑 Métricas do cartão',
      cssClass: 'modal-90-40',
      buttons: ['Fechar'],
      message: `Seguidores: <b>${this.card.followersCount}</b>
            <br>Acessos: <b>${this.card.viewsCount}</b>
            <br>Acessos únicos: <b>${this.card.uniqueViewsCount}</b>
            <br><br>
            #${cardCategoriesNames.map(c => c.replace(' ', '')).join('<br>#')}`
    })
  }

  public toggleFollow(): void {
    this._userService.toggleFollow(this.user.id, !this.user['followedBy'])
      .subscribe(r => {
        this.user['followedBy'] = !this.user['followedBy'];
        this._storageService.dataSubject.next(this._storageService.data);
      });
  }

  private handleWelcomeModal(): void {
    if (this.card.categories?.length <= 0) {
      this._modal.create({
        component: WelcomeComponent,
        backdropDismiss: false,
        keyboardClose: false,
        swipeToClose: false,
        cssClass: 'modal-100-100',
        componentProps: {
          categoriesIDs: this.card.categories.map(p => p.id),
        }
      }).then(r => {
        r.present();

        r.onDidDismiss()
          .then(result => {
            this.card.categories = result.data.categoriesIds;
            this._cardService.updateCategories(result.data.categoriesIds)
              .subscribe(r => { });
          })
      })
    }
  }

  private getCard(cb?: () => void): void {
    // this._loader.show();
    this._cardService.get().subscribe(response => {
      // this._loader.dismiss();

      this.card = response;

      if (cb) cb();

    }, error => {
      // this._loader.dismiss();
      this._toast.showHttpError(error);
    });
  }

  private defineBackground(): void {
    if (this.card.background.imageUrl) {
      this.background = `url(${this.card.background.imageUrl})`;
    } else if (this.card.background.colorRgb) {
      const rgb = this.card.background.colorRgb;
      this.background = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }

    if (this.card.background.contrastColor.includes('#000'))
      this.backBackgroundColor = '#fff';
    else
      this.backBackgroundColor = '#000';
  }

  private defineBlur(): void {
    if (this.card.background.blur != undefined) {
      this.blur = this.card.background.blur;
    }
  }

  public share(): void {

    const shareData = {
      title: this.user.name,
      text: this.user.bio,
      url: this.getUserCardUrl()
    }


    if (this._platform.is('cordova')) {
      this._socialSharing.share(shareData.title, shareData.text, null, shareData.url);
    } else if (navigator['share']) {
      navigator['share'](shareData);
    } else {
      WebClipboard.copy(shareData.url)
        .then(success => {
          if (success)
            this._toast.show('Link copiado para sua área de transferência');
          else {
            this._toast.show('Não foi possivel compartilhar');
          }
        });
    }
  }

  public goToLink(url: string): void {
    this._browserService.redirectToUrl(url);
  }

  public get icons(): CardIcon[] {
    // const addAppIcon: CardIcon = {
    //   key: 'placeholder',
    //   link: undefined,
    //   position: undefined,
    //   socialNetwork: undefined
    // };

    return this.card.icons.sort((a, b) => a.position - b.position);
    // .concat([addAppIcon]);
  }

  private getUserCardUrl(): string {
    return `${environment.publicAddress}/${this.user.nickname.replace(' ', '')}`;
  }

}
