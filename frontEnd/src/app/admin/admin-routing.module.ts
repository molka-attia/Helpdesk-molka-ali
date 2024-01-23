import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import {MainDashAdminComponent} from './main-dash-admin/main-dash-admin.component';
import {UserComponent} from './user/user.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import {TicketComponent} from './ticket/ticket.component';
import {ArchiveComponent} from './archive/archive.component';
import {GroupeComponent} from './groupe/groupe.component';
import {TechnicienComponent} from './technicien/technicien.component';


const routes: Routes = [{ path: '', component: AdminComponent },
{ path: 'dash', component: MainDashAdminComponent },
{ path: 'user', component:UserComponent },
{ path: 'test', component: UtilisateurComponent  },
{ path: 'ticket', component:TicketComponent },
{ path: 'archive', component:ArchiveComponent },
{ path: 'groupe', component:GroupeComponent },
{ path: 'technicien', component:TechnicienComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
