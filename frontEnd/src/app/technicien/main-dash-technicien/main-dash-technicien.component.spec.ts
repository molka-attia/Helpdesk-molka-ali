import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashTechnicienComponent } from './main-dash-technicien.component';

describe('MainDashTechnicienComponent', () => {
  let component: MainDashTechnicienComponent;
  let fixture: ComponentFixture<MainDashTechnicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDashTechnicienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDashTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
