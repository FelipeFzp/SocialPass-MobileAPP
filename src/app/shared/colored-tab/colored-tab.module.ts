import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColoredTabComponent } from './colored-tab.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ColoredTabComponent
  ],
  exports: [
    ColoredTabComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ColoredTabModule { }
