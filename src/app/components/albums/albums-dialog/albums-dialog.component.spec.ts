import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsDialogComponent } from './albums-dialog.component';

describe('AlbumsDialogComponent', () => {
  let component: AlbumsDialogComponent;
  let fixture: ComponentFixture<AlbumsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
