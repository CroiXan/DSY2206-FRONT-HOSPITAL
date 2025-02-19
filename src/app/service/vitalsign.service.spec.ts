import { TestBed } from '@angular/core/testing';

import { VitalsignService } from './vitalsign.service';

describe('VitalsignService', () => {
  let service: VitalsignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitalsignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
