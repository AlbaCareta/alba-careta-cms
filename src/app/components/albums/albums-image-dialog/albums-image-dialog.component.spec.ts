import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsImageDialogComponent } from './albums-image-dialog.component';

describe('AlbumsImageDialogComponent', () => {
  let component: AlbumsImageDialogComponent;
  let fixture: ComponentFixture<AlbumsImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
