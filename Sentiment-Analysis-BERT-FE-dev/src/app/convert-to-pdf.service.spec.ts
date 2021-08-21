import { TestBed } from '@angular/core/testing';

import { ConvertToPdfService } from './convert-to-pdf.service';

describe('ConvertToPdfService', () => {
  let service: ConvertToPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertToPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
