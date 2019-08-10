import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartydirectoryComponent } from './partydirectory.component';

describe('PartydirectoryComponent', () => {
  let component: PartydirectoryComponent;
  let fixture: ComponentFixture<PartydirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartydirectoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartydirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
