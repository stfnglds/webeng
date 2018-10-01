import { TestBed } from '@angular/core/testing';

import { AddressbooksService } from './addressbooks.service';

describe('AddressbooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressbooksService = TestBed.get(AddressbooksService);
    expect(service).toBeTruthy();
  });
});
