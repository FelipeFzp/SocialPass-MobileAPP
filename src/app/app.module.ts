import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { LoadDataGuard } from './guards/load-data.guard';
import { LoaderService } from './services/loader.service';
import { ToastService } from './services/toast.service';
import { AuthService } from './services/auth.service';
import { AppPlatformService } from './services/app-platform.service';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';
import { CardService } from './services/card.service';
import { BrowserService } from './services/browser.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialNetworkService } from './services/social-network.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { Camera } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { MenuService } from './services/menu.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { CardCategoryService } from './services/card-category.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GpsService } from './services/gps.service';
import { IpService } from './services/ip.service';
import { ColoredTabsService } from './services/colored-tabs.service';
import { CardCollectionService } from './services/card-collection.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    IonicStorageModule.forRoot(),
    NgxMaskIonicModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppVersion,
    InAppBrowser,
    Camera,
    Crop,
    File,
    SocialSharing,
    Clipboard,
    Geolocation,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    // guards
    LoadDataGuard,

    // services
    LoaderService,
    ToastService,
    StorageService,
    AuthService,
    AppPlatformService,
    UserService,
    AlertService,
    CardService,
    BrowserService,
    SocialNetworkService,
    MenuService,
    CardCategoryService,
    GpsService,
    IpService,
    ColoredTabsService,
    CardCollectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
