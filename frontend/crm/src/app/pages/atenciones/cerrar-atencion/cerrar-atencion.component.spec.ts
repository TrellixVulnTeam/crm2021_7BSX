import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarAtencionComponent } from './cerrar-atencion.component';

describe('CerrarAtencionComponent', () => {
  let component: CerrarAtencionComponent;
  let fixture: ComponentFixture<CerrarAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CerrarAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CerrarAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
