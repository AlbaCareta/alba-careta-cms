import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaImageEditorComponent } from './galeria-image-editor.component';

describe('GaleriaImageEditorComponent', () => {
  let component: GaleriaImageEditorComponent;
  let fixture: ComponentFixture<GaleriaImageEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaImageEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaImageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
