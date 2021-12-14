import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FileHelper } from '../../common/helpers/file-helper';
import { ImageCropComponent, ImageCropOptions, ImageCropResult } from '../../shared/image-crop/image-crop.component';
import { User } from '../../models/api/user';
import { UserOutput } from '../../models/output/user-output';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { removeSpaces } from '../../common/form-controls/remove-spaces';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit {

  @ViewChild('imageInput', { static: false }) public fileInput: ElementRef;

  public accountForm: FormGroup;

  public imageLoaded = {
    file: null,
    url: ''
  }

  public user: User;

  public isCordova: boolean;

  public _nicknameSubject = new Subject<string>();

  public showNicknameExists = false;

  constructor(
    private _toast: ToastService,
    public navCtrl: NavController,
    private _loader: LoaderService,
    private _userService: UserService,
    private _camera: Camera,
    private _crop: Crop,
    private _platform: Platform,
    public modalCtrl: ModalController
  ) {
    this.isCordova = this._platform.is('cordova');
    this.initForm();
  }

  ngOnInit() {
    this.getUser(() => this.setForm());

    this._nicknameSubject
      .pipe(
        debounceTime(1000)
      )
      .subscribe(nickname => {
        this._userService.nicknameExists(nickname).subscribe(response => {
          if (response === true) {
            this.showNicknameExists = true;
            this.accountForm.get('nickname').setErrors({ incorrect: true });
          } else {
            this.showNicknameExists = false;
            this.accountForm.get('nickname').setErrors(null);
          }
        }, error => {
          this._toast.showHttpError(error);
        });
      });
  }

  private initForm(): void {
    this.accountForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      nickname: new FormControl(null, [Validators.required, removeSpaces]),
      bio: new FormControl(null, [Validators.required]),
    });
  }

  private setForm(): void {
    this.accountForm.get('name').setValue(this.user.name);
    this.accountForm.get('email').setValue(this.user.email);
    this.accountForm.get('nickname').setValue(this.user.nickname);
    this.accountForm.get('bio').setValue(this.user.bio);

    this.imageLoaded.url = this.user.imageUrl;
  }

  public verifyIfNicknameExists(nickname: string): void {
    this._nicknameSubject.next(nickname);
  }

  private getUser(cb?: () => void): void {
    this._loader.show();
    this._userService.getLoggedUser().subscribe(response => {
      this._loader.dismiss();
      this.user = response;
      if (cb) cb();
    }, error => {
      this._loader.dismiss();
      this._toast.showHttpError(error);
    });
  }

  public save(): void {

    if (!this.accountForm.valid) {
      this.accountForm.markAllAsTouched();
      this._toast.show('Preencha todos os campos obrigatórios');
      throw new Error('Invalid form');
    }

    if (this.accountForm.controls.bio.invalid) {
      this._toast.show('A biografia excedeu o limite de 165 caracteres.');
    }


    const user: UserOutput = {
      id: this.user.id,
      name: this.accountForm.get('name').value,
      email: this.accountForm.get('email').value,
      nickname: this.accountForm.get('nickname').value,
      bio: this.accountForm.get('bio').value,
      image: this.imageLoaded.file
    }

    this._loader.show();
    this._userService.update(user).subscribe(response => {
      this._loader.dismiss();
      this._toast.show('Editado com sucesso 😃');
    }, error => {
      this._loader.dismiss();
      this._toast.showHttpError(error);
    });
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

        this._crop.crop(imageData).then(croppedImage => {
          FileHelper.cordovaFilePathToFile(croppedImage).then(fileCropped => {

            FileHelper.fileToBase64(fileCropped).then(base64 => {
              this.imageLoaded.url = base64;

              FileHelper.fileToBlob(fileCropped).then(file => {
                this.imageLoaded.file = file;

                this._loader.dismiss();
              });

            });
          });

        }).catch(error => {
          this._loader.dismiss();
          this._toast.show('Algo errado...');
        });

      }).catch(error => {
        this._loader.dismiss();
        this._toast.show('Erro ao abrir câmera' + error);
      });
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  public onImageSelected(event): void {

    if (event.target.files && event.target.files.length > 0) {
      const image = event.target.files[0];

      const cropOptions: ImageCropOptions = {
        file: image,
        width: 600,
        aspectRatio: 1 / 1
      }

      this.modalCtrl.create({
        component: ImageCropComponent,
        componentProps: cropOptions,
        cssClass: 'modal-40-80'
      }).then(modal => {
        modal.onDidDismiss().then(result => {
          if (result.data) {

            const data: ImageCropResult = result.data;

            this.imageLoaded.file = data.file;
            this.imageLoaded.url = data.base64;

            this.fileInput.nativeElement.value = null;
          }
        });

        modal.present();
      });
    }
  }
}
