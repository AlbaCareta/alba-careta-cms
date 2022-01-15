import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaVideoDialogComponent } from './galeria-video-dialog.component';

describe('GaleriaVideoDialogComponent', () => {
  let component: GaleriaVideoDialogComponent;
  let fixture: ComponentFixture<GaleriaVideoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaVideoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
