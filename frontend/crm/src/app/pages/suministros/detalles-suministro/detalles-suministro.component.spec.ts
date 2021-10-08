import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesSuministroComponent } from './detalles-suministro.component';

describe('DetallesSuministroComponent', () => {
  let component: DetallesSuministroComponent;
  let fixture: ComponentFixture<DetallesSuministroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesSuministroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesSuministroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
