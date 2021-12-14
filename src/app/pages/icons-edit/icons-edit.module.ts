import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { IconEditComponent } from './icon-edit/icon-edit.component';
import { IconsEditPage } from './icons-edit.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IconsEditPage,
    IconEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: IconsEditPage
      }
    ])
  ]
})
export class IconsEditModule { }
