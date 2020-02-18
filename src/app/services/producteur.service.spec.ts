import { TestBed } from '@angular/core/testing';

import { ProducteurService } from './producteur.service';

describe('ProducteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProducteurService = TestBed.get(ProducteurService);
    expect(service).toBeTruthy();
  });
});
