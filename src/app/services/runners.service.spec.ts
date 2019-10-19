import { TestBed, inject } from '@angular/core/testing';

import { RunnersService } from './runners.service';

describe('RunnersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RunnersService]
    });
  });

  it('should be created', inject([RunnersService], (service: RunnersService) => {
    expect(service).toBeTruthy();
  }));
});
