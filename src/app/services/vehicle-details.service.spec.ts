import { TestBed } from '@angular/core/testing';

import { VehicleDetailsService } from './vehicle-details.service';

describe('VehicleDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleDetailsService = TestBed.get(VehicleDetailsService);
    expect(service).toBeTruthy();
  });
});
