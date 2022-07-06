import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtencionesGestcomercialesComponent } from './modal-atenciones-gestcomerciales.component';

describe('ModalAtencionesGestcomercialesComponent', () => {
  let component: ModalAtencionesGestcomercialesComponent;
  let fixture: ComponentFixture<ModalAtencionesGestcomercialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAtencionesGestcomercialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAtencionesGestcomercialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
