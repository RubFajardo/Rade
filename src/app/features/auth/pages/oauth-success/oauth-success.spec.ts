import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthSuccess } from './oauth-success';

describe('OauthSuccess', () => {
  let component: OauthSuccess;
  let fixture: ComponentFixture<OauthSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OauthSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OauthSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
