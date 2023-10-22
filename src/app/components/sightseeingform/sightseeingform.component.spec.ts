import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightseeingformComponent } from './sightseeingform.component';

describe('SightseeingformComponent', () => {
  let component: SightseeingformComponent;
  let fixture: ComponentFixture<SightseeingformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SightseeingformComponent]
    });
    fixture = TestBed.createComponent(SightseeingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
