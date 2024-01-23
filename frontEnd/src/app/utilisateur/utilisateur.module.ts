import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { UtilisateurComponent } from './utilisateur.component';
import { TicketComponent } from './ticket/ticket.component';
import { MainDashUtilisateurComponent } from './main-dash-utilisateur/main-dash-utilisateur.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArchiveComponent } from './archive/archive.component';
import { MatTableModule } from '@angular/material/table';

import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    UtilisateurComponent,
    TicketComponent,
    MainDashUtilisateurComponent,
    ArchiveComponent
  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule, 
    MatTableModule
  ]
})
export class UtilisateurModule { }
