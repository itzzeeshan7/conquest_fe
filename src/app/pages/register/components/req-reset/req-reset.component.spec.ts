import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqResetComponent } from './req-reset.component';

describe('ReqResetComponent', () => {
  let component: ReqResetComponent;
  let fixture: ComponentFixture<ReqResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReqResetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
