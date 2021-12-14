import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardService } from '../../../../../../services/card.service';
import { ToastService } from '../../../../../../services/toast.service';
import { AddressConfigComponent } from '../../../../../../shared/address-config/address-config.component';
import { AddressConfig } from '../../../../../../shared/address-config/models/address-config';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  @Input() categoriesIDs: string[];

  public maxCategories: number = 3;
  public selectedCategoriesIds: string[];

  public formIsValid: boolean = false;

  public addressConfig: AddressConfig;
  public showBackdrop: boolean = false;

  constructor(
    private _modalCtrl: ModalController,
    private _cardService: CardService,
    private _toast: ToastService
  ) {
  }

  ngOnInit() {
    this.getCard();
  }

  private getCard(): void {
    this._cardService.get().subscribe(response => {
      this.addressConfig = response.address;
    }, error => {
      this._toast.showHttpError(error);
    });
  }

  public onCategoriesChange(categoriesIds: string[]): void {
    this.selectedCategoriesIds = categoriesIds;

    this._checkFormValidity();
  }

  private _checkFormValidity(): void {
    this.formIsValid = this.selectedCategoriesIds.length > 0 &&
      this.selectedCategoriesIds.length <= this.maxCategories;
  }

  public onDoneClick(): void {
    this._modalCtrl.dismiss({
      categoriesIds: this.selectedCategoriesIds,
      address: undefined //TODO: usar componente do Igor
    })
  }

  public openAddressConfig(): void {
    this._modalCtrl.create({
      component: AddressConfigComponent,
      componentProps: {
        address: this.addressConfig
      },
      cssClass: 'modal-80-50-border'
    }).then(modal => {
      modal.present();
      this.showBackdrop = true;
      modal.onDidDismiss().then(result => {
        this.showBackdrop = false;
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

}
