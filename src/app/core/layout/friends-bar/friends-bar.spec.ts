import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsBar } from './friends-bar';

describe('FriendsBar', () => {
  let component: FriendsBar;
  let fixture: ComponentFixture<FriendsBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
