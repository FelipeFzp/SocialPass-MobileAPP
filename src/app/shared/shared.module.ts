import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BaseContentComponent } from './base-content/base-content.component';
import { BaseToolbarComponent } from './base-toolbar/base-toolbar.component';
import { PipesModule } from '../pipes/pipes.module';
import { CounterComponent } from './counter/counter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxMaskIonicModule } from 'ngx-mask-ionic'
import { ImageCropComponent } from './image-crop/image-crop.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CategoriesSelectComponent } from './categories-select/categories-select.component';
import { AddressConfigComponent } from './address-config/address-config.component';
import { CardCollectionSelectorComponent } from './card-collection-selector/card-collection-selector.component';

@NgModule({
  declarations: [
    BaseContentComponent,
    BaseToolbarComponent,
    CounterComponent,
    ImageCropComponent,
    CategoriesSelectComponent,
    AddressConfigComponent,
    CardCollectionSelectorComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    NgxMaskIonicModule,
    ImageCropperModule,
  ],
  exports: [
    BaseContentComponent,
    BaseToolbarComponent,
    IonicModule,
    PipesModule,
    CounterComponent,
    NgxMaskIonicModule,
    ImageCropComponent,
    CategoriesSelectComponent,
    AddressConfigComponent,
    CardCollectionSelectorComponent,
  ]
})
export class SharedModule { }
