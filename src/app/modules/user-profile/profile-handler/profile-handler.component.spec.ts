import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHandlerComponent } from './profile-handler.component';

describe('ProfileHandlerComponent', () => {
  let component: ProfileHandlerComponent;
  let fixture: ComponentFixture<ProfileHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
