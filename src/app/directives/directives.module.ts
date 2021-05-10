import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

@NgModule({
  declarations: [
    HighlightDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective
  ]
})
export class DirectivesModule { }
