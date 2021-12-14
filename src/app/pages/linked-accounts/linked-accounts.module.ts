import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LinkedAccountsPage } from './linked-accounts.page';

@NgModule({
  declarations: [
    LinkedAccountsPage
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LinkedAccountsPage
      }
    ])
  ]
})
export class LinkedAccountsPageModule { }
