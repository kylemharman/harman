import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacesBarComponent } from './spaces-bar.component';

describe('LeftSidebarComponent', () => {
  let component: SpacesBarComponent;
  let fixture: ComponentFixture<SpacesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpacesBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
