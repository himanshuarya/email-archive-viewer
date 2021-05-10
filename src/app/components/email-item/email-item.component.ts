import { Component, Input } from '@angular/core';
import { EmailArchive } from 'src/app/entities/email.entities';

@Component({
  selector: 'app-email-item',
  templateUrl: './email-item.component.html',
  styleUrls: ['./email-item.component.scss']
})
export class EmailItemComponent {
  @Input()
  public email: EmailArchive;

  @Input()
  public searchText: string;
}
