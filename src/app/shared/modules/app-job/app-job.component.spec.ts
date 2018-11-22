import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppJobComponent } from './app-job.component';

describe('AppJobComponent', () => {
  let component: AppJobComponent;
  let fixture: ComponentFixture<AppJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
