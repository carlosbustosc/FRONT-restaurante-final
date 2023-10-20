import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternaRestauranteComponent } from './interna-restaurante.component';

describe('InternaRestauranteComponent', () => {
  let component: InternaRestauranteComponent;
  let fixture: ComponentFixture<InternaRestauranteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternaRestauranteComponent]
    });
    fixture = TestBed.createComponent(InternaRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
