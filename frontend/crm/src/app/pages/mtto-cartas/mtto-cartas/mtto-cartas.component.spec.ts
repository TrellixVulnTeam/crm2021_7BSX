import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttoCartasComponent } from './mtto-cartas.component';

describe('MttoCartasComponent', () => {
  let component: MttoCartasComponent;
  let fixture: ComponentFixture<MttoCartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MttoCartasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MttoCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
