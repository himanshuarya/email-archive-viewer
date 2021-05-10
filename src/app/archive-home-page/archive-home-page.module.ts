import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { EmailBodyModule } from '../components/email-body/email-body.module';
import { EmailItemModule } from '../components/email-item/email-item.module';
import { ArchiveHomePageComponent } from './archive-home-page.component';

const routes: Routes = [{ path: '', component: ArchiveHomePageComponent }];

@NgModule({
  declarations: [ArchiveHomePageComponent],
  imports: [
    CommonModule,
    EmailItemModule,
    EmailBodyModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ]
})
export class ArchiveHomePageModule { }
