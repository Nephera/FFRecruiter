import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticdirectoryComponent } from './staticdirectory.component';

describe('StaticdirectoryComponent', () => {
  let component: StaticdirectoryComponent;
  let fixture: ComponentFixture<StaticdirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticdirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticdirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
