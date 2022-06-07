import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoAtencionesComponent } from './motivo-atenciones.component';

describe('MotivoAtencionesComponent', () => {
  let component: MotivoAtencionesComponent;
  let fixture: ComponentFixture<MotivoAtencionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivoAtencionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoAtencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
