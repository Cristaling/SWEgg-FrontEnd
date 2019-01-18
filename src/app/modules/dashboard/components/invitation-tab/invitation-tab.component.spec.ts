import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationTabComponent } from './invitation-tab.component';

describe('InvitationTabComponent', () => {
  let component: InvitationTabComponent;
  let fixture: ComponentFixture<InvitationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
