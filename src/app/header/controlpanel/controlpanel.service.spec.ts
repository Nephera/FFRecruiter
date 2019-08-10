import { TestBed } from '@angular/core/testing';

import { ControlpanelService } from './controlpanel.service';

describe('ControlpanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlpanelService = TestBed.get(ControlpanelService);
    expect(service).toBeTruthy();
  });
});