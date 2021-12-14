import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyPipe } from './money.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { CalendarPipe } from './calendar.pipe';
import { SocialIconPipe } from './social-icon.pipe';
import { CssRgbPipe } from './css-rgb.pipe';

@NgModule({
  declarations: [
    MoneyPipe,
    DateFormatPipe,
    CalendarPipe,
    SocialIconPipe,
    CssRgbPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MoneyPipe,
    DateFormatPipe,
    CalendarPipe,
    SocialIconPipe,
    CssRgbPipe
  ]
})
export class PipesModule { }
