import { TestBed } from '@angular/core/testing';

import { CredencialesGuard } from './credenciales.guard';

describe('CredencialesGuard', () => {
  let guard: CredencialesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CredencialesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
