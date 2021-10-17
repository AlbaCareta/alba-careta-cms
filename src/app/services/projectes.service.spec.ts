import { TestBed } from '@angular/core/testing';

import { ProjectesService } from './projectes.service';

describe('ProjectesService', () => {
  let service: ProjectesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
