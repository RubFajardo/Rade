import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAvatar } from './edit-avatar';

describe('EditAvatar', () => {
  let component: EditAvatar;
  let fixture: ComponentFixture<EditAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAvatar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
