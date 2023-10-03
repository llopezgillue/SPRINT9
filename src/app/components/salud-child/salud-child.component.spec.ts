import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludChildComponent } from './salud-child.component';

describe('SaludChildComponent', () => {
  let component: SaludChildComponent;
  let fixture: ComponentFixture<SaludChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaludChildComponent]
    });
    fixture = TestBed.createComponent(SaludChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
