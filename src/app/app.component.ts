import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, IonMenu } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage.service';
import { LoaderService } from './services/loader.service';
import * as moment from 'moment';
import { AuthService } from './services/auth.service';
import { MenuService } from './services/menu.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { GpsService } from './services/gps.service';
import { UserService } from './services/user.service';
import { UserFollowStatistics } from './models/api/user-follow-statistics';
import { AppPlatformService } from './services/app-platform.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  @ViewChild('menu', { static: false }) public menu: IonMenu;

  public userShortName: string;
  public followStatistics: UserFollowStatistics;
  public userFollowersCount: number;

  public currentMenuSelected: string;

  public desktopVersion = {
    isDesktop: false
  }

  constructor(
    private _platform: Platform,
    private _splashScreen: SplashScreen,
    private _statusBar: StatusBar,
    private _loaderService: LoaderService,
    public navCtrl: NavController,
    public storageService: StorageService,
    private _authService: AuthService,
    private _userService: UserService,
    private _menuService: MenuService,
    public route: ActivatedRoute,
    public router: Router,
    private _gpsService: GpsService,
    public appPlatform: AppPlatformService
  ) {
    this.initializeApp();
    this._gpsService.coordinatesSubject.subscribe(coordinates => {
      console.log(coordinates);
    });
  }

  initializeApp() {
    moment.locale('pt-BR');

    this._platform.ready().then(() => {
      this._statusBar.backgroundColorByHexString('#23A6D5');
      this._statusBar.styleLightContent();
      this._splashScreen.hide();

      this._menuService.toggleMenuEmitter.subscribe(() => this.menu.toggle());
    });

    if (this._platform.width() >= this._platform.height()) {
      this.desktopVersion.isDesktop = true;
    }
  }

  ngOnInit() {
    this.refreshAuth();
    this._menuService.toggleMenuEmitter.subscribe(() => {
      this._userService.getFollowInfos()
        .subscribe(result => this.followStatistics = result);
    })
    this.storageService.dataSubject
      .subscribe(data => {
        if (data) {
          let namePaths = data.user.name.split(' ');
          this.userShortName = namePaths[0];

          if (!this.followStatistics) {
            this._userService.getFollowInfos()
              .subscribe(result => this.followStatistics = result);
          }
        }
      })

    this.router.events.subscribe(r => {
      if (r instanceof NavigationStart) {
        let navigationStart = r as NavigationStart;
        this.currentMenuSelected = navigationStart.url;
      }
    });
  }

  private refreshAuth(): void {
    this.storageService.loadData().subscribe(data => {
      if (data && data.token) {
        this._authService.refresh().subscribe(response => {
        }, error => {
          this.navCtrl.navigateRoot('/login', {
            queryParams: {
              redirectRoute: this.router.routerState.snapshot.url
            }
          });
        });
      }
    });
  }

  public logout(): void {
    this._loaderService.show();
    this._authService.logout()
      .subscribe(r => {
        this._loaderService.dismiss();
      });
  }
}
