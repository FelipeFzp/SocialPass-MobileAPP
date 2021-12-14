import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from '../../services/menu.service';
import { StorageService } from '../../services/storage.service';
import { ColoredTab } from '../../shared/colored-tab/models/colored-tab';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public tabs: ColoredTab[];

  constructor(private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _navCtrl: NavController,
    private _authService: AuthService,
    private _menuService: MenuService) {
    this.loadTabs();

    this._authService.onLoggedChange
      .subscribe(r => {
        this.loadTabs();
      });
  }

  public onTabClick(tabId: string): void {
    switch (tabId) {
      case 'menu':
        this._storageService.loadData()
          .subscribe(r => {
            if (r?.token) {
              this._menuService.menuToggle();
            } else {
              this._navCtrl.navigateRoot('/login', {
                queryParams: {
                  redirectRoute: '/home/card'
                }
              });
            }
          });
        break;
      case 'card':
        this._navCtrl.navigateRoot('/home/card');
        break;
    }
  }

  public loadTabs(): void {

    this._storageService.loadData()
      .subscribe(r => {

        let image = 'assets/images/logo_full.png';
        if (r?.token) {
          image = r?.user?.imageUrl || '../../../assets/images/default-avatar.png';
        }

        this.tabs = undefined;
        this.tabs = [
          {
            id: 'search',
            route: 'search',
            icon: 'search',
            label: 'Buscar'
          },
          {
            id: 'card',
            route: 'card',
            imageUrl: image,
            label: 'Meu cartão'
          },
          {
            id: 'menu',
            icon: 'menu',
            label: 'Menu'
          },
        ]
      })
  }
}
