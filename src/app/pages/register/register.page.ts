import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { UserRegisterOutput } from '../../models/output/user-register-output';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FileHelper } from '../../common/helpers/file-helper';
import { ImageCropComponent, ImageCropOptions, ImageCropResult } from '../../shared/image-crop/image-crop.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { removeSpaces } from '../../common/form-controls/remove-spaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('imageInput', { static: false }) public fileInput: ElementRef;

  public step: 'register' | 'confirmation' = 'register';
  public sendingConfirmationEmail: boolean = false;
  public registerForm: FormGroup;

  public imageLoaded = {
    file: null,
    url: ''
  }

  public _nicknameSubject = new Subject<string>();

  public showNicknameExists = false;

  public isCordova: boolean;

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
    this._nicknameSubject
      .pipe(
        debounceTime(1000)
      )
      .subscribe(nickname => {
        if (!nickname) {
          this.registerForm.get('nickname').setErrors({ incorrect: true });
          return;
        }
        this._userService.nicknameExists(nickname).subscribe(response => {
          if (response === true) {
            this.showNicknameExists = true;
            this.registerForm.get('nickname').setErrors({ incorrect: true });
          } else {
            this.showNicknameExists = false;
            this.registerForm.get('nickname').setErrors(null);
          }
        }, error => {
          this._toast.showHttpError(error);
        });
      });

      this.registerForm.statusChanges.subscribe(r => {
        console.log(this.registerForm);
      })
  }

  private initForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      nickname: new FormControl(null, [Validators.required, removeSpaces]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
  }

  public register(): void {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      this._toast.show('Preencha todos os campos obrigatórios');
      throw new Error('Invalid form');
    }

    this.sendingConfirmationEmail = true;
    this._userService.sendEmailConfirmation(this.registerForm.controls.email.value)
      .subscribe(() => {
        this.step = 'confirmation';
        this.sendingConfirmationEmail = false;
      }, (error) => {
        this._toast.showHttpError(error);
        this.sendingConfirmationEmail = false;
      });
  }

  public validateCode(firstDigit: HTMLInputElement, secondDigit: HTMLInputElement, thirdDigit: HTMLInputElement, fourthDigit: HTMLInputElement): void {
    this._userService.confirmEmail(this.registerForm.controls.email.value, `${firstDigit.value}${secondDigit.value}${thirdDigit.value}${fourthDigit.value}`)
      .subscribe(() => {
        const user: UserRegisterOutput = {
          name: this.registerForm.get('name').value,
          email: this.registerForm.get('email').value,
          nickname: this.registerForm.get('nickname').value,
          password: this.registerForm.get('password').value,
          image: this.imageLoaded?.file
        }

        this._loader.show();
        this._userService.register(user)
          .subscribe(response => {
            this._loader.dismiss();
            this._toast.show('Registrado com sucesso 😃');
            this.navCtrl.navigateRoot('/home/card');
          }, error => {
            this._loader.dismiss();
            this._toast.showHttpError(error);
          });
      }, () => {
        firstDigit.value = '';
        secondDigit.value = '';
        thirdDigit.value = '';
        fourthDigit.value = '';
        firstDigit.focus();
        this._toast.show('Código inválido, verifique o código correto no seu email.');
      });
  }

  public verifyIfNicknameExists(nickname: string): void {
    this._nicknameSubject.next(nickname);
  }

  public verifyPassword(): void {
    setTimeout(() => {
      const password = this.registerForm.get('password');
      const confirmPassword = this.registerForm.get('confirmPassword');

      if (password.value != confirmPassword.value || password.value?.length <= 4 || confirmPassword.value?.length <= 4) {
        password.setErrors({ incorrect: true });
        confirmPassword.setErrors({ incorrect: true });
      } else {
        password.setErrors(null);
        confirmPassword.setErrors(null);
      }
    }, 100);
  }

  private getCameraOptions(options: { fromGallery?: boolean } = {}): CameraOptions {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this._camera.DestinationType.FILE_URI,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: options.fromGallery ? this._camera.PictureSourceType.PHOTOLIBRARY : this._camera.PictureSourceType.CAMERA
    };

    return cameraOptions;
  }

  public getPicture(options: { fromGallery?: boolean } = {}): void {

    if (this.isCordova) {
      this._loader.show();

      this._camera.getPicture(this.getCameraOptions(options)).then((imageData: string) => {

        this._crop.crop(imageData).then(croppedImage => {
          FileHelper.cordovaFilePathToFile(croppedImage).then(file => {

            FileHelper.fileToBase64(file).then(base64 => {

              this.imageLoaded.url = base64;

              FileHelper.fileToBlob(file).then(file => {
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
        this._toast.show('Erro ao abrir câmera');
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
        cssClass: 'modal-90-90'
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
