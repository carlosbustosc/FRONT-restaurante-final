import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRestauranteComponent } from './login-restaurante.component';

describe('LoginRestauranteComponent', () => {
  let component: LoginRestauranteComponent;
  let fixture: ComponentFixture<LoginRestauranteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRestauranteComponent]
    });
    fixture = TestBed.createComponent(LoginRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
