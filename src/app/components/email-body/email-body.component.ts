import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EmailArchive } from 'src/app/entities/email.entities';

@Component({
  selector: 'app-email-body',
  templateUrl: './email-body.component.html',
  styleUrls: ['./email-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailBodyComponent {
  @Input()
  public email: EmailArchive;

  @Input()
  public searchText: string;
}
