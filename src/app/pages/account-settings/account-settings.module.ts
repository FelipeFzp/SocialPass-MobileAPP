import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AccountSettingsPage } from './account-settings.page';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AccountSettingsPage
      }
    ])
  ],
  declarations: [
    AccountSettingsPage,
    PasswordUpdateComponent
  ]
})
export class AccountSettingsPageModule { }
