import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartycardComponent } from './partycard.component';

describe('PartycardComponent', () => {
  let component: PartycardComponent;
  let fixture: ComponentFixture<PartycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartycardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
