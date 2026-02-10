import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserView } from './user-view';

describe('UserView', () => {
  let component: UserView;
  let fixture: ComponentFixture<UserView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
