import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecteDialogComponent } from './projecte-dialog.component';

describe('ProjecteDialogComponent', () => {
  let component: ProjecteDialogComponent;
  let fixture: ComponentFixture<ProjecteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjecteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjecteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
