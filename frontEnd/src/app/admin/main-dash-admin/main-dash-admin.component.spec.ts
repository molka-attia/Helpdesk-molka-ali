import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashAdminComponent } from './main-dash-admin.component';

describe('MainDashAdminComponent', () => {
  let component: MainDashAdminComponent;
  let fixture: ComponentFixture<MainDashAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDashAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDashAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
