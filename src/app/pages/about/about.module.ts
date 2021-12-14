import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AboutPage } from './about.page';

@NgModule({
  declarations: [
    AboutPage
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutPage
      }
    ])
  ]
})
export class AboutModule { }
