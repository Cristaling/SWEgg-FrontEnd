import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteOnJobComponent } from './invite-on-job.component';

describe('InviteOnJobComponent', () => {
  let component: InviteOnJobComponent;
  let fixture: ComponentFixture<InviteOnJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteOnJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteOnJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
