import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashUtilisateurComponent } from './main-dash-utilisateur.component';

describe('MainDashUtilisateurComponent', () => {
  let component: MainDashUtilisateurComponent;
  let fixture: ComponentFixture<MainDashUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDashUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDashUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
