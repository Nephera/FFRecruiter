import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypartiesComponent } from './myparties.component';

describe('MypartiesComponent', () => {
  let component: MypartiesComponent;
  let fixture: ComponentFixture<MypartiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MypartiesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
