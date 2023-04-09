import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailsDialogComponent } from './thumbnails-dialog.component';

describe('ThumbnailsDialogComponent', () => {
  let component: ThumbnailsDialogComponent;
  let fixture: ComponentFixture<ThumbnailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbnailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbnailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
