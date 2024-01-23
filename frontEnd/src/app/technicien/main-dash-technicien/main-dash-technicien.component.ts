import { Component, OnInit } from '@angular/core';
import {AdminService } from '../../services/admin.service';
import {TechnicienService } from '../../services/technicien.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../admin/user/user.model';
import { users } from '../../admin/user/users-list';
import { groupes } from 'src/app/admin/groupe/groupes-list';
import { departements } from 'src/app/admin/user/departements-list';
@Component({
  selector: 'app-main-dash-technicien',
  templateUrl: './main-dash-technicien.component.html',
  styleUrls: ['./main-dash-technicien.component.css']
})
export class MainDashTechnicienComponent implements OnInit {
  technicienId = localStorage.getItem('user');
  public AllticketsCount;
  public techticketscount;
  public user;
  public imagePreview:string;
  public ticketstrait;
  formaddUser:FormGroup;
  public showEditUserForm=false;
  public usersList : User[] = users;
  public fetchedUser=users;
  public listtechniciens :any;
  public groupeid:string;
public demandes;
public demandeenvoyer;
  formEdit:FormGroup;
  public fetchedTicket=groupes;
  public fetchedDepatments=departements;
  public techgroupes:any;
  
  constructor(private userService : AdminService,private technicienService:TechnicienService) {
   
   }
    


  ngOnInit(): void {
console.log(JSON.parse(this.technicienId).userId)
// this.userService.getgroupestech("628223a04f6cdd98cde283da").subscribe((res:any)=>{
//   this.techgroupes = res.tickets;
//   //this. clubsCount = res.teams;
//   //this.title = res.title
//   console.log(res.tickets)
// });


this.technicienService.statticketsencoursdetrait(JSON.parse(this.technicienId).userId).subscribe((res:any)=>{
  this.ticketstrait = res.tickets;
  console.log(this.ticketstrait)
  //this. clubsCount = res.teams;
  //this.title = res.title
});


    this.userService.getStatstickets().subscribe((res:any)=>{
      this.AllticketsCount = res.tickets;
      //this. clubsCount = res.teams;
      //this.title = res.title
    });
    this.userService.getDepartements().subscribe(
      (resultatUser) => {
        this.fetchedDepatments = resultatUser;
      
         console.log(resultatUser);
      }
    );
    this.userService.getStatstechtickets(JSON.parse(this.technicienId).userId).subscribe((res:any)=>{
      this.techticketscount = res.tickets;
      //this. clubsCount = res.teams;
      //this.title = res.title
    });

    this.userService.getGroupes().subscribe(
      (resultatTicket) => {
        this.fetchedTicket = resultatTicket;
         console.log(resultatTicket);
      }  
      );

    this.userService.getUser(JSON.parse(this.technicienId).userId) .subscribe(
      (resultat:any) => {
        console.log(resultat);
        this.user = resultat;
      
      });

//
      this.technicienService.getdemandesstats(JSON.parse(this.technicienId).userId) .subscribe((res:any)=>{
        
         
          this.demandes = res.demandes;
        
        });
        this.technicienService.getdemandesstatsemmetteur(JSON.parse(this.technicienId).userId) .subscribe((res:any)=>{
        
         
          this.demandeenvoyer = res.demandes;
        
        });

      // this.userService.getequipeid(JSON.parse(this.technicienId).userId).subscribe(
      //   (res:any) => {
      //     this.groupeid = res.groupe_id;
      //     this.userService.getTechniciensofthegroupe(res.groupe_id._id).subscribe(
      //       (resultatTicket) => {
      //         this.listtechniciens = resultatTicket;
      //          console.log(resultatTicket);
      //       }  
      //       );
        
      //   }
      // );

    





      this.formEdit = new FormGroup({
            name: new FormControl(null,{validators:[Validators.required]}),
        prenom: new FormControl(null,{validators:[Validators.required]}),
        email: new FormControl(null,{validators:[Validators.required]}),
        tel: new FormControl(null,{validators:[Validators.required]}),
        poste: new FormControl(null,{validators:[Validators.required]}),
       password: new FormControl(null,{validators:[Validators.required]}),
       departement_id: new FormControl(null,{validators:[Validators.required]}),
       user_img: new FormControl(null,{validators:[Validators.required]}),
  
      });
    }
    oneEditSubmit(){

      this.userService.EditTechnicien(this.formEdit.value,JSON.parse(this.technicienId).userId);
      this.showEditUserForm = false;
     
    }
    onImagePicked2(event :Event){
      const file = (event.target as HTMLInputElement).files[0];
    this.formEdit.patchValue({user_img:file});
    this.formEdit.get('user_img').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  
    }
    onClickCloseForm(){
      this.showEditUserForm = false;
    }
    onClickShowForm(){
     
  this.showEditUserForm=true;
    }

  
}
