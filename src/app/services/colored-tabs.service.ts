import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColoredTabsService {
  public show: boolean = true;

  constructor() { }

  public toggleTabs(show: boolean): void {
    this.show = show;
  }
}
