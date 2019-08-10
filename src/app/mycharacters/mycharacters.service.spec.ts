import { TestBed } from '@angular/core/testing';

import { MycharactersService } from './mycharacters.service';

describe('MycharactersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MycharactersService = TestBed.get(MycharactersService);
    expect(service).toBeTruthy();
  });
});
