import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteEmailLinkSignUpComponent } from './complete-email-link-sign-up.component';

describe('CompleteEmailLinkSignUpComponent', () => {
  let component: CompleteEmailLinkSignUpComponent;
  let fixture: ComponentFixture<CompleteEmailLinkSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteEmailLinkSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteEmailLinkSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
