import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { EmailItemComponent } from './email-item.component';

@NgModule({
  declarations: [
    EmailItemComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    EmailItemComponent
  ]
})
export class EmailItemModule { }
