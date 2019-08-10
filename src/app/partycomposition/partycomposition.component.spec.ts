import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartycompositionComponent } from './partycomposition.component';

describe('PartycompositionComponent', () => {
  let component: PartycompositionComponent;
  let fixture: ComponentFixture<PartycompositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartycompositionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartycompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
