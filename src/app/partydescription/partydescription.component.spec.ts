import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartydescriptionComponent } from './partydescription.component';

describe('PartydescriptionComponent', () => {
  let component: PartydescriptionComponent;
  let fixture: ComponentFixture<PartydescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartydescriptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartydescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
