import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LostPasswordComponent } from './lost-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BaseContentComponent } from '../../shared/base-content/base-content.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LostPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LostPasswordComponent
      }
    ])
  ]
})
export class LostPasswordModule { }
