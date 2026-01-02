import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleViewingComponent } from './schedule-viewing.component';

describe('ScheduleViewingComponent', () => {
  let component: ScheduleViewingComponent;
  let fixture: ComponentFixture<ScheduleViewingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleViewingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleViewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
