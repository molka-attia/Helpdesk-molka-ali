import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable, Subject, throwError } from 'rxjs';


import { User } from '../admin/user/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {










  
  API_URL: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  authToken:any;
  user:any;
  private authStatusListener = new Subject<boolean>();
  private typeListener = new Subject<string>();
  constructor(private httpClient: HttpClient ,private router:Router,private http:HttpClient,private flashMessagesService : FlashMessagesService) { }

  addUser(user:User){
    /** prenom: {type: String, required: false},
   tel: {type: String, required: false},
   poste: {type: String, required: false}, */ 
   const userData = new FormData();
   userData.append('name',user.name);
   userData.append('prenom',user.prenom);
  
   userData.append('email',user.email);
   userData.append('tel',user.tel);
   userData.append('poste',user.poste);
   userData.append('password',user.password);
   userData.append('type',user.type);
   userData.append('departement_id',user.departement_id);
   userData.append('user_img',user.user_img);

 //  userData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);

   //console.log(userData);
    this.http.post(`http://localhost:3000/api/users/addUser`,userData)
    .subscribe(res=>{
      console.log(res);


   });
 }
 
  signup(user: User,form:FormGroup) {
    const userData = new FormData();
    userData.append('name',user.name);
    userData.append('email',user.email);
    userData.append('password',user.password);
    // userData.append('type',"utilisateur");
    userData.append('user_img',user.user_img);

  //  userData.append('club_id',JSON.parse(localStorage.getItem('user')).club_id);

    //console.log(userData);
    //  this.httpClient.post<any>(`http://localhost:3000/api/users/addUser`,userData)
     this.httpClient.post<any>(`http://localhost:3000/api/auth/signup`, userData)
     .subscribe( (res):any =>{
       console.log(res);
       if(res.status == 201) {
            localStorage.setItem('user_id',JSON.stringify(res.userId));
            
            this.router.navigate(['/']);
            form.reset();
            let element: HTMLElement = document.getElementById('signIn') as HTMLElement;
            element.click();
             this.flashMessagesService.show('You are now registered and can log in', { cssClass: 'alert-success'});
          }

    });

    // this.httpClient.post<any>(`http://localhost:3000/api/auth/signup`, userData).subscribe( (res):any =>{
    //   if(res.status == 201) {
    //     localStorage.setItem('user_id',JSON.stringify(res.userId));
    //     this.router.navigate(['/admin']);
    //     form.reset();
    //     let element: HTMLElement = document.getElementById('signIn') as HTMLElement;
    //     element.click();
    //     // this.flashMessagesService.show('You are now registered and can log in', { cssClass: 'alert-success'});
    //   }
    // }

    // );
  }

    login(user: User){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    this.httpClient.post<{status,token,user}>('http://localhost:3000/api/auth/login',user,{headers:headers}).subscribe(res => {
      if(res.status == 200) {
        this.storeUserData(res.token,res.user);
        const type = JSON.parse(localStorage.getItem('user')).type;
        if(type=='admin'){
        this.router.navigate(['/admin/dash']);}
        if(type=="technicien"){
           this.router.navigate(['/technicien/dash']);}
           if(type=='utilisateur'){
            this.router.navigate(['/utilisateur/mainuser']);
           }
        this.authStatusListener.next(true);
        this.typeListener.next(res.user.type);
      }else{
        // this.flashMessagesService.show('Something went wrong',{cssClass:'alert-danger'});
      }
    },err => {
      // this.flashMessagesService.show('Email or Password Incorrect ! ',{cssClass:'alert-danger'});
    }
      );
  }

 

  getTypeListener() {
    return this.typeListener.asObservable();
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.authStatusListener.next(false);
    this.typeListener.next(null);
    this.router.navigate(['/']);
  }
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  storeUserData(token:string,user:any){
    this.authToken = token;
    this.user = user;
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
  }

  getDepartements() {
    //ticketscloturer 
    return this.http.get<any>(`http://localhost:3000/api/departement/getdepartement`);
    }
  
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}


