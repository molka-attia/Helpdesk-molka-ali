import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './user.model';
import { users } from './users-list';
import { Departement } from './departement.model';
import { departements } from './departements-list';
import {AdminService } from '../../services/admin.service';
import {Subject} from 'rxjs';
import { Location } from '@angular/common';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public usersList : User[] = users;
 
 public imagePreview:string;

  constructor( public _location: Location,private userService : AdminService, private route:ActivatedRoute,private router:Router,private _router:Router) {
   
   }
    formaddUser:FormGroup;
    formEdit:FormGroup;
    public techniciens=false;
   public showAddUserForm = false;
   public showUserDetails = false;
   public showEditUserForm=false;
   public currentuser=users[0];
   public fetchedUser=users;

   public fetchedDepatments=departements;
   public listtechniciens=users;
 
  ngOnInit(): void {
    this.techniciens=false;
    this.userService.getUsers().subscribe(
      (resultatUser) => {
        this.fetchedUser = resultatUser;
      
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
     user_img: new FormControl(null,{validators:[Validators.required]}),
    });

     /** prenom: {type: String, required: false},
    tel: {type: String, required: false},
    poste: {type: String, required: false}, */ 
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
   oneEditSubmit(userId:string){

    this.userService.EditUser(this.formEdit.value,userId);
    
    this.showEditUserForm = false;
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
  async onAddSubmit(){
    await this.userService.addUser(this.formaddUser.value);
    this.showAddUserForm = false;
    this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
      });
   // this.router.navigate(['dash-respo/events']);
  }
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
