import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordDividerComponent } from './word-divider.component';

describe('WordDividerComponent', () => {
  let component: WordDividerComponent;
  let fixture: ComponentFixture<WordDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
