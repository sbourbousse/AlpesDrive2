import { TestBed } from '@angular/core/testing';

import { PointRelaisService } from './point-relais.service';

describe('PointRelaisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointRelaisService = TestBed.get(PointRelaisService);
    expect(service).toBeTruthy();
  });
});
