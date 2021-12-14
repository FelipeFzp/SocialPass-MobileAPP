import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CardCollectionsPage } from './card-collections.page';

@NgModule({
  declarations: [
    CardCollectionsPage
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CardCollectionsPage
      }
    ])
  ]
})
export class CardCollectionsModule { }
