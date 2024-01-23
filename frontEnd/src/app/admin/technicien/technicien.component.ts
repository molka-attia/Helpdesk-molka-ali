import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './user.model';
import { users } from './users-list';
import {AdminService } from '../../services/admin.service';
import { Groupe } from '../groupe/groupe.model';
import { groupes } from '../groupe/groupes-list';
import { departements } from '../user/departements-list';
import { Location } from '@angular/common';


@Component({
  selector: 'app-technicien',
  templateUrl: './technicien.component.html',
  styleUrls: ['./technicien.component.css']
})
export class TechnicienComponent implements OnInit {
  public usersList : User[] = users;
 
 public imagePreview:string;

  constructor(public _location: Location,private userService : AdminService, private route:ActivatedRoute,private router:Router,private fb: FormBuilder,private _router:Router) {
   
   }
    formaddUser:FormGroup;
    formEdit:FormGroup;
    public techniciens=false;
   public showAddUserForm = false;
   public showUserDetails = false;
   public showTechnicienaffecter = false;
   public showEditUserForm=false;
   public currentuser=users[0];
   public fetchedUser=users;
   public listtechniciens=users;
   public fetchedspecialite;
   public fetchedgroupes=groupes;
   formAffecter:FormGroup;
   public fetchedDepatments=departements;
   

  ngOnInit(): void {
    this.techniciens=false;
    this.userService.getTechniciens().subscribe(
      (resultatUser) => {
        this.fetchedUser = resultatUser;
         console.log(resultatUser);
      }

    );

    this.userService.getTechniciens().subscribe(
      (resultatUser) => {
        this.fetchedspecialite = resultatUser;
         console.log(resultatUser);
      }
      );
      this.userService.getDepartements().subscribe(
        (resultatUser) => {
          this.fetchedDepatments = resultatUser;
        
           console.log(resultatUser);
        }
      );
    
    this.formaddUser = new FormGroup({
      name: new FormControl(null,{validators:[Validators.required]}),
      prenom: new FormControl(null,{validators:[Validators.required]}),
      email: new FormControl(null,{validators:[Validators.required]}),
      tel: new FormControl(null,{validators:[Validators.required]}),
      poste: new FormControl(null,{validators:[Validators.required]}),
     password: new FormControl(null,{validators:[Validators.required]}),
     departement_id: new FormControl(null,{validators:[Validators.required]}),
     groupe_id: new FormControl(null,{validators:[Validators.required]}),
     user_img: new FormControl(null,{validators:[Validators.required]}),
    });

    this.formEdit = new FormGroup({
      name: new FormControl(null,{validators:[Validators.required]}),
      prenom: new FormControl(null,{validators:[Validators.required]}),
      email: new FormControl(null,{validators:[Validators.required]}),
      tel: new FormControl(null,{validators:[Validators.required]}),
      poste: new FormControl(null,{validators:[Validators.required]}),
     password: new FormControl(null,{validators:[Validators.required]}),
     departement_id: new FormControl(null,{validators:[Validators.required]}),
    // type: new FormControl(null,{validators:[Validators.required]}),
     user_img: new FormControl(null,{validators:[Validators.required]}),

    });
    this.formAffecter = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.formAffecter.get('checkArray') as FormArray;
  
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
   // console.log(this.formAffecter.value)
    console.log(this.currentuser._id)
    console.log(this.formAffecter.value.checkArray[0])
  //  for(var a in this.formaffecterplusieurtech.value.checkArray.length){
    for (let i = 0; i < this.formAffecter.value.checkArray.length; i++) {
      console.log(this.formAffecter.value.checkArray[i])
     // this.userService.AffecterTechnicien(this.cuurentgroupe,this.formaffecterplusieurtech.value.checkArray[i]);
    // this.userService.EditTechnicien(this.formAffecter.value.checkArray[i],this.currentuser._id);
     this.userService.AffecterTechnicien(this.formAffecter.value.checkArray[i],this.currentuser._id);
    } 
    this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
      });
  
   //  console.log(this.formaffecterplusieurtech.value.checkArray.length)
   
  }














   oneEditSubmit(userId:string){

    this.userService.EditTechnicien(this.formEdit.value,userId);
    this.showEditUserForm = false;
    this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
      });
  }
  oneAffceterSubmit(userId:string){

    this.userService.AffecterTechnicien(this.formAffecter.value.groupe_id,userId);
    //this.showTechnicienaffecter = false;
    this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
      });
    
   
   
  }
  onDeleteUser(user:string){
    // this.route.paramMap.subscribe(params=>{
      // const userId=params.get("id");
      // const userId=id;
      //  console.log(user.id)
      //  this.currentuser=user;
       this.userService.DeleteUser(user);
       this.showUserDetails = false;
       this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
        console.log(decodeURI(this._location.path()));
        this._router.navigate([decodeURI(this._location.path())]);
        });
    //this.router.navigate(['admin/user']);
  // })
  }
  onClickShowForm4(){
 
    console.log( this.currentuser);
  
  
    this.userService.getGroupes().subscribe(
      (resultatTicket) => {
        this.fetchedgroupes = resultatTicket;
         console.log(resultatTicket);
      }  
      );
    this.showUserDetails = false;
    
this.showTechnicienaffecter=true;
  }
  
  async onAddSubmit (){

  


     await  this.userService.ajoutertechnicien(this.formaddUser.value);

     await this.userService.getGroupes().subscribe(
      (resultatTicket) => {
        this.fetchedgroupes = resultatTicket;
         console.log(resultatTicket);
      }  
      ); 
   

 await this.userService.getTechniciens().subscribe(
    (resultatUser) => {
      this.fetchedspecialite = resultatUser;
      this.currentuser=  this.fetchedspecialite[(this.fetchedspecialite.length)-1];
       console.log(this.fetchedspecialite.length);
    }
    );
    this.userService.envoyermailech(this.formaddUser.value);
   //this.showAddUserForm = false;
   console.log( this.currentuser);
   //this.onClickShowForm4();
   
   this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
    console.log(decodeURI(this._location.path()));
    this._router.navigate([decodeURI(this._location.path())]);
    });
 
   // this.router.navigate(['dash-respo/events']);
  }

  // async onAddSubmit(){

  //   this.userService.getGroupes().subscribe(
  //     (resultatTicket) => {
  //       this.fetchedgroupes = resultatTicket;
  //        console.log(resultatTicket);
  //     }  
  //     );


  //  // this.userService.envoyermailech(this.formaddUser.value);
  //   this.showAddUserForm = false;
  //  // this.router.navigate(['dash-respo/events']);
  // }
  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formaddUser.patchValue({user_img:file});
    this.formaddUser.get('user_img').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

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

  onClickShowForm(){
    this.showAddUserForm = true;
    
    this.userService.getGroupes().subscribe(
      (resultatTicket) => {
        this.fetchedgroupes = resultatTicket;
         console.log(resultatTicket);
      }  
      );
  }
  onClickCloseForm(){
    this.showAddUserForm = false;
  }
  onClickShowForm2(user:User){
    this.showUserDetails = true;
    this.currentuser=user;

  }
  onClickCloseForm2(){
    this.showUserDetails = false;
  }

  onClickCloseForm3(){
    this.showEditUserForm = false;
  }
  onClickShowForm3(){
    this.showUserDetails = false;
this.showEditUserForm=true;
  }

  onClickCloseForm4(){
    
    this.showTechnicienaffecter = false;
  }


  async  onclickaffichertechniciens(){
this.techniciens=false;
await    this.userService.getTechniciens().subscribe(
  (resultatTicket) => {
    this.listtechniciens = resultatTicket;
     console.log(resultatTicket);
  }  
  );

  }

  async  onclickafficherutilisateurs(){
    this.techniciens=true;
    await this.userService.getUsers().subscribe(
      (resultatUser) => {
        this.fetchedUser = resultatUser;
         console.log(resultatUser);
      }
      );
  }


}
