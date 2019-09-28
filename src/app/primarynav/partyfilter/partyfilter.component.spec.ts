import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyfilterComponent } from './partyfilter.component';

describe('PartyfilterComponent', () => {
  let component: PartyfilterComponent;
  let fixture: ComponentFixture<PartyfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
