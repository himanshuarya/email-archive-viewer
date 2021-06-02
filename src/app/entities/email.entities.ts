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
  displayedEmails: EmailArchive[];
  filteredArchiveEmails: EmailArchive[];
  selectedIndex: number;
  searchInput: string;
  searchText: string;
}
