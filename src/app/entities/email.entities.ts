export interface EmailArchive {
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  date: string;
}

export interface ArchiveHomeVm {
  archiveEmails: EmailArchive[];
  displayedEmails: EmailArchive[];
  filteredArchiveEmails: EmailArchive[];
  selectedIndex: number;
  currentPageIndex: number;
  searchInput: string;
  searchText: string;
}
