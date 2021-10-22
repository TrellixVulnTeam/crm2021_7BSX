import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucionEventoComponent } from './resolucion-evento.component';

describe('ResolucionEventoComponent', () => {
  let component: ResolucionEventoComponent;
  let fixture: ComponentFixture<ResolucionEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolucionEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolucionEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
