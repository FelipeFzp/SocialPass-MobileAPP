import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss'],
})
export class LostPasswordComponent implements OnInit {
  public step: 'email' | 'code' | 'password' = 'email';
  public sendingEmail: boolean = false;
  public changingPassword: boolean = false;

  public emailFormControl: FormControl = new FormControl('', [Validators.email, Validators.required])
  public passwordFormGroup: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  private _verificationCode: string;

  constructor(private _userService: UserService,
    private _toastService: ToastService,
    private _navCtrl: NavController
  ) { }

  ngOnInit() { }

  public sendRecoveryCode(): void {
    this.sendingEmail = true;
    this._userService.sendLostPasswordEmail(this.emailFormControl.value)
      .subscribe(() => {
        this.step = 'code';
        this.sendingEmail = false;
      }, (error) => {
        this._toastService.showHttpError(error);
        this.sendingEmail = false;
      });
  }

  public validateCode(firstDigit: HTMLInputElement, secondDigit: HTMLInputElement, thirdDigit: HTMLInputElement, fourthDigit: HTMLInputElement): void {
    this._verificationCode = `${firstDigit.value}${secondDigit.value}${thirdDigit.value}${fourthDigit.value}`;

    this._userService.confirmLostPasswordEmail(this.emailFormControl.value, this._verificationCode)
      .subscribe(() => {
        this.step = 'password';
      }, () => {
        firstDigit.value = '';
        secondDigit.value = '';
        thirdDigit.value = '';
        fourthDigit.value = '';
        this._verificationCode = '';
        firstDigit.focus();
        this._toastService.show('Código inválido, verifique o código correto no seu email.');
      });
  }

  public changePassword(): void {
    this.changingPassword = true;
    this._userService.recoverPassword(this._verificationCode, this.passwordFormGroup.controls.password.value, this.emailFormControl.value)
      .subscribe(() => {
        this._toastService.show('Senha atualizada com sucesso, entre com sua nova senha 😉🚀');
        this._navCtrl.navigateRoot('/login');
        this.changingPassword = false;
      }, (error) => {
        this._toastService.showHttpError(error);
        this.changingPassword = false;
      });
  }

}
