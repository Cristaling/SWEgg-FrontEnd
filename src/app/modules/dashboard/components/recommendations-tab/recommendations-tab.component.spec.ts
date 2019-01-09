import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsTabComponent } from './recommendations-tab.component';

describe('RecommendationsTabComponent', () => {
  let component: RecommendationsTabComponent;
  let fixture: ComponentFixture<RecommendationsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
