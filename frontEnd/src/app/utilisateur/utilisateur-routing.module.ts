import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateurComponent } from './utilisateur.component';
import { TicketComponent } from './ticket/ticket.component';
import { MainDashUtilisateurComponent } from './main-dash-utilisateur/main-dash-utilisateur.component';
import{ArchiveComponent}from './archive/archive.component';
const routes: Routes = [{ path: '', component: UtilisateurComponent },
{ path: 'ticket', component:TicketComponent },
{ path: 'mainuser', component:MainDashUtilisateurComponent },
{ path: 'archive', component:ArchiveComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
