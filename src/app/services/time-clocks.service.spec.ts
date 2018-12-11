import { TestBed, inject } from '@angular/core/testing';

import { TimeClocksService } from './time-clocks.service';

describe('TimeClocksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeClocksService]
    });
  });

  it('should be created', inject([TimeClocksService], (service: TimeClocksService) => {
    expect(service).toBeTruthy();
  }));
});
