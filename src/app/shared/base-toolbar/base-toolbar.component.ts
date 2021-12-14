import { Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ToolbarButton } from './toolbar-buttom';

@Component({
  selector: 'base-toolbar',
  templateUrl: './base-toolbar.component.html',
  styleUrls: ['./base-toolbar.component.scss'],
})
export class BaseToolbarComponent {

  @Input() public title: string;
  @Input() public showButtonMenu: boolean = true;
  @Input() public showButtonBack: boolean = false;

  @Input() public toolbarButtons: ToolbarButton[] = [];

  @Input() public buttonBackRoute: string;

  constructor(
    private _navCtrl: NavController,
    private _cdRef: ChangeDetectorRef,
    private _platform: Platform
  ) {
    this._platform.backButton.subscribe(() => {
      this.goBack();
    });
  }

  public async goBack(): Promise<void> {
    if (this.buttonBackRoute)
      this._navCtrl.navigateRoot(this.buttonBackRoute);
    else {
      this._navCtrl.back();
      await this._navCtrl.pop();
    }
  }
}
