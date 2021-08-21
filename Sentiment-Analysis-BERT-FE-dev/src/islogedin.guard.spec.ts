import { TestBed } from '@angular/core/testing';

import { IslogedinGuard } from './islogedin.guard';

describe('IslogedinGuard', () => {
  let guard: IslogedinGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IslogedinGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
