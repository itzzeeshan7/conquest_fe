import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentCardComponent } from './apartament-card.component';

describe('ApartmentCardComponent', () => {
  let component: ApartmentCardComponent;
  let fixture: ComponentFixture<ApartmentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
