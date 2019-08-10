import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryformComponent } from './recoveryform.component';

describe('RecoveryformComponent', () => {
  let component: RecoveryformComponent;
  let fixture: ComponentFixture<RecoveryformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecoveryformComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
