import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColoredTabModule } from '../../shared/colored-tab/colored-tab.module';
import { LoadDataGuard } from '../../guards/load-data.guard';
import { StorageService } from '../../services/storage.service';
import { NavController } from '@ionic/angular';

@Component({
  template: ''
})
class RedirectComponent {
  constructor(private _localStorage: StorageService,
    private _navCtrl: NavController) {
    this._localStorage.loadData()
      .subscribe(d => {
        if (d?.user) {
          this._navCtrl.navigateRoot('/home/card');
        }
        else {
          this._navCtrl.navigateRoot('/home/search');
        }
      })
  }
}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ColoredTabModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: '',
            component: RedirectComponent,
          },
          {
            path: 'search',
            loadChildren: () => import('./tabs/search/search.module').then(m => m.SearchModule),
          },
          {
            path: 'card',
            loadChildren: () => import('./tabs/card/card.module').then(m => m.CardModule),
            canActivate: [LoadDataGuard]
          }
        ]
      }
    ])
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule { }
