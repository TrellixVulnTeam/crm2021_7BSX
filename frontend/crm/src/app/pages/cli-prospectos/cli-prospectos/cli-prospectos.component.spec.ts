import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliProspectosComponent } from './cli-prospectos.component';

describe('CliProspectosComponent', () => {
  let component: CliProspectosComponent;
  let fixture: ComponentFixture<CliProspectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CliProspectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CliProspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
