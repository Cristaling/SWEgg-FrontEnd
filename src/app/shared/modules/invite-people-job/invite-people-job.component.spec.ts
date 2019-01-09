import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePeopleJobComponent } from './invite-people-job.component';

describe('InvitePeopleJobComponent', () => {
  let component: InvitePeopleJobComponent;
  let fixture: ComponentFixture<InvitePeopleJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitePeopleJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitePeopleJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
