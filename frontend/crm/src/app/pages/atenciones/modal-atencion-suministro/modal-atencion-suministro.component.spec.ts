import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtencionSuministroComponent } from './modal-atencion-suministro.component';

describe('ModalAtencionSuministroComponent', () => {
  let component: ModalAtencionSuministroComponent;
  let fixture: ComponentFixture<ModalAtencionSuministroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAtencionSuministroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAtencionSuministroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
