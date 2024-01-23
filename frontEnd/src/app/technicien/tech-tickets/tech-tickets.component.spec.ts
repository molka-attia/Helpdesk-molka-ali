import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTicketsComponent } from './tech-tickets.component';

describe('TechTicketsComponent', () => {
  let component: TechTicketsComponent;
  let fixture: ComponentFixture<TechTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
