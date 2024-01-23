import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicienRoutingModule } from './technicien-routing.module';
import { TechnicienComponent } from './technicien.component';
import { MainDashTechnicienComponent } from './main-dash-technicien/main-dash-technicien.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { TechTicketsComponent } from './tech-tickets/tech-tickets.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    TechnicienComponent,
    MainDashTechnicienComponent,
    AllTicketsComponent,
    TechTicketsComponent,
    
  ],
  imports: [
    CommonModule,
    TechnicienRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule, 
    MatTableModule,
    FormsModule
  ]
})
export class TechnicienModule { }
