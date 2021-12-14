import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FileHelper } from '../../common/helpers/file-helper';

export interface ImageCropOptions {
  file: any;
  aspectRatio?: number,
  width: number;
}

export interface ImageCropResult {
  base64: string;
  file: any;
}

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss'],
})
export class ImageCropComponent implements OnInit {

  @Input() public file: any;
  @Input() public aspectRatio?: number;
  @Input() public width: number;

  private _result: ImageCropResult;

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  public imageCropped(event: ImageCroppedEvent) {

    FileHelper.base64ToFile(event.base64, 'image.png').then(file => {
      this._result = {
        base64: event.base64,
        file
      }
    });
  }

  public confirmImage(): void {
    this.modalCtrl.dismiss(this._result);
  }

  public cancel(): void {
    this.modalCtrl.dismiss();
  }

}
