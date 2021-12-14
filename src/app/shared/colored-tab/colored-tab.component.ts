import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColoredTabsService } from '../../services/colored-tabs.service';
import { ColoredTab } from './models/colored-tab';


@Component({
  selector: 'app-colored-tab',
  templateUrl: './colored-tab.component.html',
  styleUrls: ['./colored-tab.component.scss'],
})
export class ColoredTabComponent {
  @Input() tabs: ColoredTab[];
  @Output() onTabClick = new EventEmitter<string>();
  @Output() onTabChange = new EventEmitter<void>();

  public selectedTabIndex: number = 1;

  constructor(public tabsService: ColoredTabsService) {
  }

  public updateTabCustomSelector(tab: string): void {
    this.selectedTabIndex = this.tabs?.findIndex(p => p.id == tab) + 1;
  }
}
