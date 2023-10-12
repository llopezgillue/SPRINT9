import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register1Component } from './register1.component';



describe('RegisterComponent', () => {
  let component: Register1Component;
  let fixture: ComponentFixture<Register1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Register1Component]
    });
    fixture = TestBed.createComponent(Register1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
