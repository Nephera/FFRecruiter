import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyscheduleComponent } from './partyschedule.component';

describe('PartyscheduleComponent', () => {
  let component: PartyscheduleComponent;
  let fixture: ComponentFixture<PartyscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartyscheduleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
