import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectesComponent } from './projectes.component';

describe('ProjectesComponent', () => {
  let component: ProjectesComponent;
  let fixture: ComponentFixture<ProjectesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
