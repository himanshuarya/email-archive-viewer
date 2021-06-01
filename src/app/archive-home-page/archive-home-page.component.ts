import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ArchiveHomeVm, EmailArchive } from '../entities/email.entities';
import { EmailService } from '../service/email.service';

@Component({
  selector: 'app-archive-home-page',
  templateUrl: './archive-home-page.component.html',
  styleUrls: ['./archive-home-page.component.scss']
})
export class ArchiveHomePageComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public vm: ArchiveHomeVm;
  public readonly pageSize = 40;
  public readonly displayedColumns: string[] = ['email'];
  private inputSub: Subscription;
  private inputChanged: Subject<string> = new Subject<string>();
  private readonly arrowDown: string = 'ArrowDown';
  private readonly arrowUp: string = 'ArrowUp';

  public constructor(private el: ElementRef, private emailService: EmailService) { }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent): void {
    if (event.key === this.arrowDown && this.vm.selectedIndex < this.pageSize - 1) {
      this.vm.selectedIndex++;
    } else if (event.key === this.arrowUp && this.vm.selectedIndex > 0) {
      this.vm.selectedIndex--;
    }
    this.el.nativeElement.querySelectorAll('td')[this.vm.selectedIndex]?.scrollIntoViewIfNeeded();
  }

  public async ngOnInit(): Promise<void> {
    this.vm = {
      archiveEmails: [],
      displayedEmails: [],
      filteredArchiveEmails: [],
      selectedIndex: 0,
      currentPageIndex: 0,
      searchInput: '',
      searchText: '',
    };

    this.inputSub = this.inputChanged.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((input: string) => {
        this.vm.searchInput = input;
        this.updateResults();
      });

    this.vm.archiveEmails = await this.emailService.getEmailArchives();
    this.vm.filteredArchiveEmails = [...this.vm.archiveEmails];
    this.vm.displayedEmails = this.vm.archiveEmails.slice(0, this.pageSize);
  }

  public onPageChange(pageIndex: number): void {
    this.vm.currentPageIndex = pageIndex;
    this.vm.selectedIndex = 0;
    this.vm.displayedEmails = [...this.vm.filteredArchiveEmails.slice(this.vm.currentPageIndex * this.pageSize,
      (this.vm.currentPageIndex + 1) * this.pageSize)];
  }

  public onSearch(input: string): void {
    this.inputChanged.next(input);
  }

  public ngOnDestroy(): void {
    this.inputSub?.unsubscribe();
  }

  private updateResults(): void {
    this.paginator.firstPage();
    this.vm.selectedIndex = 0;
    const searchText: string = this.vm.searchInput.trim().toLowerCase();

    this.vm.filteredArchiveEmails = !searchText ? [...this.vm.archiveEmails] :
      this.vm.archiveEmails.filter((email: EmailArchive) => email.subject.toLowerCase().indexOf(searchText) > 0 ||
        email.body.toLowerCase().indexOf(searchText) > 0);

    this.vm.displayedEmails = this.vm.filteredArchiveEmails.slice(0, this.pageSize);
    if (this.vm.displayedEmails.length > 0) {
      this.vm.searchText = searchText;
    }
  }
}
