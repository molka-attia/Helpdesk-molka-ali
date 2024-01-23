import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { departements } from 'src/app/admin/user/departements-list';

import { FlashMessagesService } from 'angular2-flash-messages';


import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  name:string;
  email:string;
  password:string;
  formSignUp:FormGroup;
  formLogin:FormGroup;
  imagePreview:string;
  public fetchedDepatments=departements;
   
  constructor(private authService:AuthService, private router:Router,public flashMessagesService : FlashMessagesService) { }

  ngOnInit(): void {
    this.authService.getDepartements().subscribe(
      (resultatUser) => {
        this.fetchedDepatments = resultatUser;
      
         console.log(resultatUser);
      }
    );
    this.formSignUp= new FormGroup({
      name: new FormControl(null,{validators:[Validators.required]}),
      prenom: new FormControl(null,{validators:[Validators.required]}),
      email: new FormControl(null,{validators:[Validators.required]}),
      tel: new FormControl(null,{validators:[Validators.required]}),
      poste: new FormControl(null,{validators:[Validators.required]}),
     password: new FormControl(null,{validators:[Validators.required]}),
     departement_id: new FormControl(null,{validators:[Validators.required]}),
     user_img: new FormControl(null,{validators:[Validators.required]}),

    });

    this.formLogin= new FormGroup({
      email: new FormControl(null,{validators:[Validators.required , Validators.email]}),
      password: new FormControl(null,{validators:[Validators.required]})
    });
 
  }



  onSigninSubmit(){
     this.authService.login(this.formLogin.value);
    // this.flashMessagesService.show('vous êtes maintenant authentifié !', { cssClass: 'alert-success', timeout: 1000 });
  }

  async onSignUpSubmit(){
    //async onAddSubmit(){
      await this.authService.addUser(this.formSignUp.value);
      this.flashMessagesService.show('vous êtes maintenant inscrit !', { cssClass: 'alert-success', timeout: 1000 });
     // this.showAddUserForm = false;
     // this.router.navigate(['dash-respo/events']);
    }
  //   this.authService.signup(this.formSignUp.value,this.formSignUp);
 
  // }

  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formSignUp.patchValue({user_img:file});
    this.formSignUp.get('user_img').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }

 

}
