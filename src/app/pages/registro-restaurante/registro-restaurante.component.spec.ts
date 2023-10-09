import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRestauranteComponent } from './registro-restaurante.component';

describe('RegistroRestauranteComponent', () => {
  let component: RegistroRestauranteComponent;
  let fixture: ComponentFixture<RegistroRestauranteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroRestauranteComponent]
    });
    fixture = TestBed.createComponent(RegistroRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
