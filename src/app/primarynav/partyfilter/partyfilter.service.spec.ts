import { TestBed } from '@angular/core/testing';

import { PartyfilterService } from './partyfilter.service';

describe('PartyfilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartyfilterService = TestBed.get(PartyfilterService);
    expect(service).toBeTruthy();
  });
});
