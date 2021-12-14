import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../../../pipes/pipes.module';
import { SharedModule } from '../../../../shared/shared.module';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    CardComponent,
    WelcomeComponent,
  ],
  exports: [
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: CardComponent
      }
    ])
  ]
})
export class CardModule { }
