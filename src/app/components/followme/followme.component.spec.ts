import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowmeComponent } from './followme.component';

describe('FollowmeComponent', () => {
  let component: FollowmeComponent;
  let fixture: ComponentFixture<FollowmeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowmeComponent]
    });
    fixture = TestBed.createComponent(FollowmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
