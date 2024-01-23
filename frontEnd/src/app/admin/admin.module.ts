import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDatepickerModule } from "@angular/material/datepicker";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MainDashAdminComponent } from './main-dash-admin/main-dash-admin.component';
import { UserComponent } from './user/user.component';
import { TicketComponent } from './ticket/ticket.component';
import { ReactiveFormsModule , FormsModule,} from '@angular/forms';
import { ArchiveComponent } from './archive/archive.component';
import { GroupeComponent } from './groupe/groupe.component';
import { TechnicienComponent } from './technicien/technicien.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { MatTableModule } from '@angular/material/table';







@NgModule({
  declarations: [
    AdminComponent,
    MainDashAdminComponent,
    UserComponent,
    TicketComponent,
    ArchiveComponent,
    GroupeComponent,
    TechnicienComponent,
    UtilisateurComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule, 
    MatTableModule,
    MatDatepickerModule ,
    FormsModule,

  ]
})
export class AdminModule { }
