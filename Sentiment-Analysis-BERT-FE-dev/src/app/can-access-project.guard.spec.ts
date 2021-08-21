import { TestBed } from '@angular/core/testing';

import { CanAccessProjectGuard } from './can-access-project.guard';

describe('CanAccessProjectGuard', () => {
  let guard: CanAccessProjectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanAccessProjectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
