import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Friends } from './friends';

describe('Friends', () => {
  let component: Friends;
  let fixture: ComponentFixture<Friends>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Friends]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Friends);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
