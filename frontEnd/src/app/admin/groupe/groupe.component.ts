import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Groupe } from './groupe.model';
import { groupes } from './groupes-list';
import {AdminService } from '../../services/admin.service';
import { users } from '../user/users-list';
import { User } from '../user/user.model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {
  public showAddUserForm = false;
  public showMembreForm = false;
  public showaffecterForm = false;
  public showTicketDetails = false;
  public showTicketaffectation = false;
  public showEditGroupForm=false;
  public showalltechniciens=false;
  //  public currentgroupe=groupes[0];
  public cuurentgroupe:string ;
  public fetchedTicket=groupes;
  public fetchedgroupecloturer=groupes;
  public fetchedTechniciens=users;
  public user:User;
  public technicienaffecte:User;
  public listtechniciens :any;
  public fetchedalltechniciens:any;
  formajouter:FormGroup;
  formaddGroupe:FormGroup;
  formEditGroupe:FormGroup;
  formaffecterplusieurtech:FormGroup;
  public currentuser:any;
  public fetchedUser=users;
  public showUserDetails = false;
  
 
  constructor(public _location: Location,private userService : AdminService, private route:ActivatedRoute,private router:Router,private fb: FormBuilder,private _router:Router) { }

  ngOnInit(): void {
   


    this.userService.getGroupes().subscribe(
      (resultatTicket) => {
        this.fetchedTicket = resultatTicket;
         console.log(resultatTicket);
      }  
      );
      this.userService.getTechniciens().subscribe(
        (resultatUser) => {
          this.fetchedalltechniciens = resultatUser;
           console.log(resultatUser);
        }
  
      );


      this.userService.getGroupescloturer().subscribe(
        (resultatTicket) => {
          this.fetchedgroupecloturer = resultatTicket;
           console.log(resultatTicket);
        }  
        );
      this.formaddGroupe = new FormGroup({
        specialite: new FormControl(null,{validators:[Validators.required]}),
      
     
      });
      this.formEditGroupe = new FormGroup({
        specialite: new FormControl(null,{validators:[Validators.required]}),
      
     
      });
      // this.formaffecterplusieurtech = new FormGroup({
      //   tech: new FormControl(null,{validators:[Validators.required]}),
      
     
      // });
      this.formaffecterplusieurtech = this.fb.group({
        checkArray: this.fb.array([])
      })
      
}

onCheckboxChange(e) {
  const checkArray: FormArray = this.formaffecterplusieurtech.get('checkArray') as FormArray;

  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}
submitForm() {
  console.log(this.formaffecterplusieurtech.value)
//  for(var a in this.formaffecterplusieurtech.value.checkArray.length){
  for (let i = 0; i < this.formaffecterplusieurtech.value.checkArray.length; i++) {
    console.log(this.formaffecterplusieurtech.value.checkArray[i])
    this.userService.AffecterTechnicien(this.cuurentgroupe,this.formaffecterplusieurtech.value.checkArray[i]);
  } 
  this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
    console.log(decodeURI(this._location.path()));
    this._router.navigate([decodeURI(this._location.path())]);
    });
 //  console.log(this.formaffecterplusieurtech.value.checkArray.length)
 
}

onAddSubmit(){
  this.userService.addGroupe(this.formaddGroupe.value.specialite);
   this.showAddUserForm = false;
   this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
    console.log(decodeURI(this._location.path()));
    this._router.navigate([decodeURI(this._location.path())]);
    });
  // this.router.navigate(['dash-respo/events']);
 }

 

 onClickDeleteGroupe(user:string){
 
     this.userService.DeleteGroupe(user);
     this.router.navigate(['admin/groupe']);
     this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
      });

}


onClickDeleteMembre(groupe:string,user:string){
  this.userService.DeleteMembre(this.cuurentgroupe,user);
  this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
    console.log(decodeURI(this._location.path()));
    this._router.navigate([decodeURI(this._location.path())]);
    });


}



onClickAffecter(){
  const formArray: FormArray = this.formaffecterplusieurtech.get('myChoices') as FormArray; 
  /* Selected */
   if(this.formaffecterplusieurtech.value.tech.target.checked){ // Add a new control in the arrayForm 
    formArray.push(new FormControl(this.formaffecterplusieurtech.value.tech.target.value)); }

   // Source: https://prograide.com/pregunta/31796/Angular-ReactiveForms--Produire-un-tableau-de-valeurs-de-cases-a-cocher
  console.log(formArray)
//}
}
onClickShowFormalltechniciens(){
  this.showalltechniciens=true;
}


onClickcloseFormalltechniciens(){
  this.showalltechniciens=false;
}

onClickShowForm(){
  this.showAddUserForm = true;
}
onClickCloseForm(){
  this.showAddUserForm = false;
}

onClickCloseFormEdit(){
  this.showEditGroupForm = false;
}


onClickShowFormEdit(id:string){

 this.cuurentgroupe=id;
  this.showEditGroupForm = true;

  //this.id=user;
}

onClickCloseFormtechniciens(){
  this.showMembreForm = false;
}


async onClickShowFormtechniciens(id:string){
  await    this.userService.getTechniciensofthegroupe(id).subscribe(
    (resultatTicket) => {
      this.listtechniciens = resultatTicket;
       console.log(id);
    }  
    );
 this.cuurentgroupe=id;
  this.showMembreForm  = true;
  //this.id=user;
}
onEditSubmit(user:string){
     
  this.userService.EditGroupe(this.formEditGroupe.value.specialite,this.cuurentgroupe);
  console.log(this.cuurentgroupe);
   this.showEditGroupForm = false;
   this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
    console.log(decodeURI(this._location.path()));
    this._router.navigate([decodeURI(this._location.path())]);
    });
  // this.router.navigate(['dash-respo/events']);
 }
 onClickShowForm2(user:User){
  this.showUserDetails = true;
  this.userService.getUser(user._id).subscribe(
    (resultatUser) => {
      this.currentuser = resultatUser;
       console.log(resultatUser);
    }
    );
 // this.currentuser=user;

}
 onClickCloseForm2(){
  this.showUserDetails = false;
}


}
