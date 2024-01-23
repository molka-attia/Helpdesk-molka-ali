import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {AdminService } from '../../services/admin.service';
import { users } from '../../admin/user/users-list';
import { User } from '../../admin/user/user.model';
import { groupes } from 'src/app/admin/groupe/groupes-list';
import {Groupe} from 'src/app/admin/groupe/groupe.model';
import { departements } from 'src/app/admin/user/departements-list';
import { Location } from '@angular/common';
@Component({
  selector: 'app-main-dash-utilisateur',
  templateUrl: './main-dash-utilisateur.component.html',
  styleUrls: ['./main-dash-utilisateur.component.css']
})
export class MainDashUtilisateurComponent implements OnInit {
  technicienId = localStorage.getItem('user');
  constructor(public _location: Location,private userService : AdminService,private _router:Router) { }
  public user:User;
  public technicienaffecte:User;
  public imagePreview:string;
  formEdit:FormGroup;
  public allticketscount;
  public ticketscloturer;
  public ticketsnoncloturer;
  public fetchedDepatments=departements;
  ngOnInit(): void {
    this.userService.getStatsusernumberoftickets(JSON.parse(this.technicienId).userId).subscribe((res:any)=>{
      this.allticketscount = res.tickets;
      //this. clubsCount = res.teams;
      //this.title = res.title
    });
    this.userService.getDepartements().subscribe(
      (resultatUser) => {
        this.fetchedDepatments = resultatUser;
      
         console.log(resultatUser);
      }
    );
  //  getStatsusernumberofticketscloturer

  this.userService.getStatsusernumberofticketscloturer(JSON.parse(this.technicienId).userId).subscribe((res:any)=>{
    this.ticketscloturer = res.tickets;
    //this. clubsCount = res.teams;
    //this.title = res.title
  });
  this.userService.getStatsusernumberofticketsnoncloturer(JSON.parse(this.technicienId).userId).subscribe((res:any)=>{
    this.ticketsnoncloturer = res.tickets;
    //this. clubsCount = res.teams;
    //this.title = res.title
  });
    this.userService.getUser(JSON.parse(this.technicienId).userId) .subscribe(
      (resultat:any) => {
        console.log(resultat);
        this.user = resultat;
      
      });


    


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
 // getUser(id:String)
 oneEditSubmit(){

  this.userService.EditUser(this.formEdit.value,JSON.parse(this.technicienId).userId);
  this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
    console.log(decodeURI(this._location.path()));
    this._router.navigate([decodeURI(this._location.path())]);
    }); 
 
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
}
