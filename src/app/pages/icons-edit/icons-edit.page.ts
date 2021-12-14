import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonReorder, ModalController, NavController, Platform } from '@ionic/angular';
import { ColorHelper } from '../../common/helpers/color-helper';
import { FileHelper } from '../../common/helpers/file-helper';
import { Card } from '../../models/api/card';
import { CardIcon } from '../../models/api/card-icons';
import { CardService } from '../../services/card.service';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
import { AddressConfigComponent } from '../../shared/address-config/address-config.component';
import { AddressConfig } from '../../shared/address-config/models/address-config';
import { IconEditComponent } from './icon-edit/icon-edit.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { AppPlatformService } from 'src/app/services/app-platform.service';


@Component({
  selector: 'app-icons-edit',
  templateUrl: './icons-edit.page.html',
  styleUrls: ['./icons-edit.page.scss'],
})
export class IconsEditPage implements OnInit {

  @ViewChild('imageInput', { static: false }) public fileInput: ElementRef;

  public card: Card;
  public categoriesIds: string[];

  public background = {
    rgbColor: null,
    image: {
      file: null,
      url: ''
    }
  }

  public isCordova: boolean;

  public addressConfig: AddressConfig;

  constructor(
    private _cardService: CardService,
    private _loader: LoaderService,
    private _toast: ToastService,
    private _modalCtrl: ModalController,
    private _activatedRoute: ActivatedRoute,
    private _platform: Platform,
    public appPlatform: AppPlatformService,
    private _navCtrl: NavController,
    private _camera: Camera,
    private _crop: Crop,
  ) {
    this.isCordova = this._platform.is('cordova');
  }

  ngOnInit() {
    this.getCard();

    if (this._activatedRoute.snapshot.queryParams.openAdd || this._activatedRoute.snapshot.queryParams.configuring) {
      this.openIcon();
    }
  }

  private getCard(): void {
    // this._loader.show();
    this._cardService.get().subscribe(response => {
      // this._loader.dismiss();

      this.card = response;
      this.categoriesIds = this.card.categories.map(p => p.id);

      this.addressConfig = this.card.address;

      if (this.card.background.colorRgb) {
        this.background.rgbColor = this.card.background.colorRgb;
        this.background.image.file = null;
        this.background.image.url = null;
      }
      else {
        this.background.rgbColor = null;
        this.background.image.url = this.card.background.imageUrl;
        this.background.image.file = null;
      }

    }, error => {
      // this._loader.dismiss();
      this._toast.showHttpError(error);
    });
  }

  public updateCategories(categoriesIds: string[]): void {
    this._cardService.updateCategories(categoriesIds)
      .subscribe(r => r);
  }

  public openAddressConfig(): void {
    this._modalCtrl.create({
      component: AddressConfigComponent,
      componentProps: {
        address: this.addressConfig
      },
      cssClass: 'modal-40-80'
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(result => {
        console.log(result.data);
        if (result.data) {
          this.addressConfig = result.data;
          this._cardService.updateAddress(this.addressConfig).subscribe(response => response, error => {
            this._toast.showHttpError(error)
          });
        }
      });
    });
  }

  public reorder(e: CustomEvent): void {
    e.detail.complete();
    this._cardService.updateOrder(e.detail).subscribe(response => {
      this.card.icons = response;
      console.log(this.card.icons.map(ic => `${ic.position} - ${ic.socialNetwork.title}`));
    }, error => {
      this._toast.showHttpError(error);
    });
  }

  public colorBackgroundChanged(color: string): void {
    const rgbColor = ColorHelper.hexToRgb(color);

    this.background.rgbColor = rgbColor;

    this.background.image.file = null;
    this.background.image.url = null;
  }

  private getCameraOptions(options: { fromGallery?: boolean } = {}): CameraOptions {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this._camera.DestinationType.FILE_URI,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: options.fromGallery ? this._camera.PictureSourceType.PHOTOLIBRARY : this._camera.PictureSourceType.CAMERA,
      targetWidth: 400,
      targetHeight: 400,
    };

    return cameraOptions;
  }

  public getPicture(options: { fromGallery?: boolean } = {}): void {

    if (this.isCordova) {
      this._loader.show();

      this._camera.getPicture(this.getCameraOptions(options)).then((imageData: string) => {

        FileHelper.cordovaFilePathToFile(imageData).then(file => {

          FileHelper.fileToBase64(file).then(base64 => {
            this.background.image.url = base64;

            FileHelper.fileToBlob(file).then(file => {
              this.background.image.file = file;

              this._loader.dismiss();
            });

          });
        });

      }).catch(error => {
        this._loader.dismiss();
        this._toast.show('Algo errado...');
      });

    } else {
      this.fileInput.nativeElement.click();
    }
  }

  public async onImageSelected(event): Promise<void> {

    if (event.target.files && event.target.files.length > 0) {
      const image = event.target.files[0];

      FileHelper.fileToBase64(image).then(async base64 => {

        this.background.image.file = image;
        this.background.image.url = base64;

        this.background.rgbColor = null;

        this.fileInput.nativeElement.value = null;

      });
    }
  }

  public updateBlur(blurLevel: number): void {
    console.log(blurLevel);
    this._cardService.setBlur(blurLevel)
      .subscribe(response => {
        this.card.background.blur = blurLevel
      }, error => {
        this._toast.showHttpError(error);
      });
  }

  public updateBackground(): void {
    this._loader.show();
    this._cardService.setBackground(this.background.rgbColor || this.background.image.file).subscribe(response => {
      this._loader.dismiss();
      this.getCard();
    }, error => {
      this._loader.dismiss();
      console.log(error);
      this._toast.showHttpError(error);
    });
  }

  public async openIcon(icon?: CardIcon): Promise<void> {
    const modal = await this._modalCtrl.create({
      component: IconEditComponent,
      componentProps: { icon },
      cssClass: 'modal-40-80'
    });

    modal.onDidDismiss().then(result => {
      if (result.data && result.data.ok)
        this.getCard();
    });

    modal.present();
  }

  public get icons(): CardIcon[] {
    if (!this.card)
      return [];

    return this.card.icons.sort((a, b) => a.position - b.position);
  }

  public get showButtonBgUpdate(): boolean {
    if (this.card.background.colorRgb)
      return this.background.rgbColor != this.card.background.colorRgb;
    else
      return this.background.image.url != this.card.background.imageUrl;
  }
}
