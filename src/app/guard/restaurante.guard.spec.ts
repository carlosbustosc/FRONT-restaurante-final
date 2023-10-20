import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { restauranteGuard } from './restaurante.guard';

describe('restauranteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => restauranteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
