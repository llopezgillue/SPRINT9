import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPaseoComponent } from './editar-paseo.component';

describe('EditarPaseoComponent', () => {
  let component: EditarPaseoComponent;
  let fixture: ComponentFixture<EditarPaseoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPaseoComponent]
    });
    fixture = TestBed.createComponent(EditarPaseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
