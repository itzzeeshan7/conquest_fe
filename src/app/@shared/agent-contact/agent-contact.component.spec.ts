import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentContactComponent } from './agent-contact.component';

describe('AgentContactComponent', () => {
  let component: AgentContactComponent;
  let fixture: ComponentFixture<AgentContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgentContactComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
