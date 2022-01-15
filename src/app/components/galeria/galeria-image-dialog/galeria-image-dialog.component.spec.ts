import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaImageDialogComponent } from './galeria-image-dialog.component';

describe('GaleriaImageDialogComponent', () => {
  let component: GaleriaImageDialogComponent;
  let fixture: ComponentFixture<GaleriaImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
