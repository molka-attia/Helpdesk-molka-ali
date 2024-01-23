import { Component, OnInit ,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket/ticket.model';
import { tickets } from '../ticket/tickets-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { users } from '../user/users-list';
import { User } from '../user/user.model';
import { groupes } from 'src/app/admin/groupe/groupes-list';
import {Groupe} from 'src/app/admin/groupe/groupe.model';
import { jsPDF } from "jspdf";
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

//import * as jsPDF from 'jspdf';




// export interface UserData {
//   spécialité: string;
//   Description: string;
//   Priorité: string;
//   affecter: string;
//   Datedecréation:string;
// }
// const FRUITS: string[] = [
//   'blueberry',
//   'lychee',
//   'kiwi',
//   'mango',
//   'peach',
//   'lime',
//   'pomegranate',
//   'pineapple',
// ];
// const NAMES: string[] = [
//   'Maia',
//   'Asher',
//   'Olivia',
//   'Atticus',
//   'Amelia',
//   'Jack',
//   'Charlotte',
//   'Theodore',
//   'Isla',
//   'Oliver',
//   'Isabella',
//   'Jasper',
//   'Cora',
//   'Levi',
//   'Violet',
//   'Arthur',
//   'Mia',
//   'Thomas',
//   'Elizabeth',
// ];

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent  implements OnInit {
  public showAddUserForm = false;
  public showMembreForm = false;
  public showaffecterForm = false;
  public showTicketDetails = false;
  public showTicketaffectation = false;
  public showEditGroupForm=false;
  //  public currentgroupe=groupes[0];
  public cuurentgroupe:string ;
  public fetchedTicket=groupes;
  public fetchedgroupecloturer=groupes;
  public fetchedTechniciens=users;
  public user:User;
  public technicienaffecte:User;

  public ticketsnoncloturer;
  public ticketsnumber;
  public numberofticketstoday;
  public ticketsnoncloturer2;
 // public listtechniciens :any;
  formajouter:FormGroup;
  formaddGroupe:FormGroup;
  formEditGroupe:FormGroup;
  formEditDate:FormGroup;
  today:Date;

  

  constructor(private userService : AdminService, private route:ActivatedRoute,private router:Router) { }
j=0;

public userperweek:any;
  public currentuser=users[0];
  public fetchedUser=users;
  public fetchedUserperdate=users;
  public fetchedUserTicket=users;
  public fetchedusertickettotal=users;
  public listtechniciens=users;
test: String[] = [
  "ios os scnd-font-color",
  "linux os scnd-font-colo",
  "win os scnd-font-color",

];
colors: String[] = [
  "quesito ios",
  "quesito mac",
  "quesito win",
  "quesito linux"

];

 ngOnInit(): void {
  this.formEditDate = new FormGroup({
    datedebut: new FormControl(null,{validators:[Validators.required]}),
    datefin: new FormControl(null,{validators:[Validators.required]}),
 
  });


 this.today=new Date();
 this.userService.getGroupescloturer().subscribe(
  (resultatTicket) => {
    this.fetchedgroupecloturer = resultatTicket;
     console.log(resultatTicket);
  }  
  );
  this.userService.gettimeticketpertechnicien().subscribe(
    (resultatTicket) => {
      this.fetchedUserperdate = resultatTicket;
      
       console.log(resultatTicket);
       this.j=this.fetchedUserperdate.length;
    } 
   
    );

    this.userService.getStatstickets().subscribe((res:any)=>{
      this.ticketsnoncloturer2 = res.tickets;
      //this. clubsCount = res.teams;
      //this.title = res.title
    });
    this.userService.getStatstickets2().subscribe((res:any)=>{
      this.ticketsnoncloturer = res.tickets;
      //this. clubsCount = res.teams;
      //this.title = res.title
    });

//allticketsnumber
this.userService.allticketsnumber().subscribe((res:any)=>{
  this.ticketsnumber = res.tickets;
  //this. clubsCount = res.teams;
  //this.title = res.title
});
this.userService.numberofticketstoday().subscribe((res:any)=>{
  this.numberofticketstoday = res.tickets;
  //this. clubsCount = res.teams;
  //this.title = res.title
});



this.userService.userticketsnumbernoncloturerperweek().subscribe((resultatTicket) => {
    this.userperweek = resultatTicket;
    
    // console.log(resultatTicket);

  } 
 
  );





   this.userService.gettechnicienticketspercent().subscribe(
     (resultatUser) => {
       this.fetchedUser = resultatUser;
     
        console.log(resultatUser);
     }
   );
   
   this.userService.gettechnicienticketspercentallticket().subscribe(
    (resultatUser) => {
      this.fetchedUserTicket = resultatUser;
    
       console.log(resultatUser);
    }
  );
//gettechnicienticketstotalpercentallticket
this.userService.gettechnicienticketstotalpercentallticket().subscribe(
  (resultatUser) => {
    this.fetchedusertickettotal = resultatUser;
  
     console.log(resultatUser);
  }
);}




onEditchangerDate(){
  this.userService.userticketsnumbernoncloturerperweekedit(this.formEditDate.value.datedebut,this.formEditDate.value.datefin).subscribe((resultatTicket) => {
    this.userperweek = resultatTicket;
    
     console.log(resultatTicket);

  } 
 
  );
}





public openPDF(): void {
  let DATA: any = document.getElementById('htmlData');
  html2canvas(DATA).then((canvas) => {
    let fileWidth = 330;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save('performance des techniciens.pdf');
  });
}
public openPDF2(): void {
  let DATA: any = document.getElementById('htmlData2');
  html2canvas(DATA).then((canvas) => {
    let fileWidth = 220;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save('performance des techniciens.pdf');
  });
}


}


 




