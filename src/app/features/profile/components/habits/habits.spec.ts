import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Habits } from './habits';

describe('Habits', () => {
  let component: Habits;
  let fixture: ComponentFixture<Habits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Habits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Habits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
