import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { EmailBodyComponent } from './email-body.component';

@NgModule({
  declarations: [
    EmailBodyComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    EmailBodyComponent
  ]
})
export class EmailBodyModule { }
