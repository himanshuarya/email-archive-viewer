import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchiveHomePageComponent } from './archive-home-page.component';

describe('ArchiveHomePageComponent', () => {
  let component: ArchiveHomePageComponent;
  let fixture: ComponentFixture<ArchiveHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
