import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.scss'],
})
export class BaseContentComponent implements OnInit {

  @Input() public background: string = '#fff';
  @Input() public backBackground: string = '#fff';
  @Input() public blur: number = 0;
  @Input() public showBackgroundOverlay: boolean = false;

  constructor() { }

  ngOnInit() { }

}
