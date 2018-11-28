import { TestBed, inject } from '@angular/core/testing';

import { EndorsementsService } from './endorsements.service';

describe('EndorsementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndorsementsService]
    });
  });

  it('should be created', inject([EndorsementsService], (service: EndorsementsService) => {
    expect(service).toBeTruthy();
  }));
});
