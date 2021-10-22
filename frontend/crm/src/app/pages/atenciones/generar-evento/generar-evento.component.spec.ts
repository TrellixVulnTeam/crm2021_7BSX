import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarEventoComponent } from './generar-evento.component';

describe('GenerarEventoComponent', () => {
  let component: GenerarEventoComponent;
  let fixture: ComponentFixture<GenerarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
