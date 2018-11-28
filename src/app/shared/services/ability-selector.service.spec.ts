import { TestBed, inject } from '@angular/core/testing';

import { AbilitySelectorService } from './ability-selector.service';

describe('AbilitySelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbilitySelectorService]
    });
  });

  it('should be created', inject([AbilitySelectorService], (service: AbilitySelectorService) => {
    expect(service).toBeTruthy();
  }));
});
