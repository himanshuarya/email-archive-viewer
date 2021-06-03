import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EmailArchive } from '../entities/email.entities';
import { EmailService } from '../service/email.service';

@Component({
  selector: 'app-archive-home-page',
  templateUrl: './archive-home-page.component.html',
  styleUrls: ['./archive-home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchiveHomePageComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public displayedEmails: EmailArchive[];
  public filteredArchiveEmails: EmailArchive[];
  public selectedIndex: number;
  public searchInput: string;
  public searchText: string;
  public readonly pageSize = 40;
  public readonly displayedColumns: string[] = ['email'];
  private archiveEmails: EmailArchive[];
  private currentPageIndex: number = 0;
  private inputSub: Subscription;
  private inputChanged: Subject<string> = new Subject<string>();
  private readonly arrowDown: string = 'ArrowDown';
  private readonly arrowUp: string = 'ArrowUp';

  public constructor(private el: ElementRef, private emailService: EmailService, private cdr: ChangeDetectorRef) { }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent): void {
    if (event.key === this.arrowDown && this.selectedIndex < this.pageSize - 1) {
      this.selectedIndex++;
      this.el.nativeElement.querySelectorAll('td')[this.selectedIndex]?.scrollIntoViewIfNeeded();
    } else if (event.key === this.arrowUp && this.selectedIndex > 0) {
      this.selectedIndex--;
      this.el.nativeElement.querySelectorAll('td')[this.selectedIndex]?.scrollIntoViewIfNeeded();
    }
  }

  public async ngOnInit(): Promise<void> {
    this.displayedEmails = [];
    this.filteredArchiveEmails = [];
    this.selectedIndex = 0;
    this.searchInput = '';
    this.searchText = '';

    this.inputSub = this.inputChanged.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((input: string) => {
        this.searchInput = input;
        this.updateResults();
      });

    this.archiveEmails = await this.emailService.getEmailArchives();
    this.filteredArchiveEmails = [...this.archiveEmails];
    this.displayedEmails = this.archiveEmails.slice(0, this.pageSize);
    this.cdr.detectChanges();
  }

  public onPageChange(pageIndex: number): void {
    this.currentPageIndex = pageIndex;
    this.selectedIndex = 0;
    this.displayedEmails = [...this.filteredArchiveEmails.slice(this.currentPageIndex * this.pageSize,
      (this.currentPageIndex + 1) * this.pageSize)];
  }

  public onSearch(input: string): void {
    this.inputChanged.next(input);
  }

  public ngOnDestroy(): void {
    this.inputSub?.unsubscribe();
  }

  private updateResults(): void {
    this.paginator.firstPage();
    this.selectedIndex = 0;
    const searchText: string = this.searchInput.trim().toLowerCase();

    this.filteredArchiveEmails = !searchText ? [...this.archiveEmails] :
      this.archiveEmails.filter((email: EmailArchive) => email.subject.toLowerCase().indexOf(searchText) >= 0 ||
        email.body.toLowerCase().indexOf(searchText) >= 0);

    this.displayedEmails = this.filteredArchiveEmails.slice(0, this.pageSize);
    if (this.displayedEmails.length > 0) {
      this.searchText = searchText;
    }
    this.cdr.detectChanges();
  }
}
