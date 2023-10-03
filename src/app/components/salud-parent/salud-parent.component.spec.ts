import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludParentComponent } from './salud-parent.component';

describe('SaludParentComponent', () => {
  let component: SaludParentComponent;
  let fixture: ComponentFixture<SaludParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaludParentComponent]
    });
    fixture = TestBed.createComponent(SaludParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
