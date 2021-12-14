import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AccountFollowsPage } from './account-follows.page';

@NgModule({
  declarations: [
    AccountFollowsPage
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AccountFollowsPage
      }
    ])
  ]
})
export class AccountFollowsModule { }
