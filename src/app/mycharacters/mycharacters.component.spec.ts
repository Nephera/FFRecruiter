import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycharactersComponent } from './mycharacters.component';

describe('MycharactersComponent', () => {
  let component: MycharactersComponent;
  let fixture: ComponentFixture<MycharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MycharactersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
