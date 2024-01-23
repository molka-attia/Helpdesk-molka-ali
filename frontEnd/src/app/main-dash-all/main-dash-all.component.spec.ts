import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashAllComponent } from './main-dash-all.component';

describe('MainDashAllComponent', () => {
  let component: MainDashAllComponent;
  let fixture: ComponentFixture<MainDashAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDashAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDashAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
