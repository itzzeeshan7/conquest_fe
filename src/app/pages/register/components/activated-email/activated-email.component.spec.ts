import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedEmailComponent } from './activated-email.component';

describe('ActivatedEmailComponent', () => {
  let component: ActivatedEmailComponent;
  let fixture: ComponentFixture<ActivatedEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivatedEmailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivatedEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
