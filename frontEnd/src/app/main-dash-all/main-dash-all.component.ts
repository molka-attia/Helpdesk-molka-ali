import { Component,  OnDestroy, OnInit  } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../admin/user/user.model';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-main-dash-all',
  templateUrl: './main-dash-all.component.html',
  styleUrls: ['./main-dash-all.component.css']
})
export class MainDashAllComponent implements OnInit ,OnDestroy {
  private authListenerSubs : Subscription;
  private typeListenerSubs : Subscription;
  userIsAuthenticated = false;
  userType:string;
  technicien : boolean;
  utilisateur : boolean;
  admin:boolean=false;
token2:any;
aff=0;
technicienId = localStorage.getItem('user');
public user:User;
  constructor(
    public authService : AuthService,
    private userService : AdminService,
    ) { }

    ngOnInit(): void {
      this.authListenerSubs= this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
        this.userIsAuthenticated= isAuthenticated;
      });
  
      /** technicienId = localStorage.getItem('user');
  constructor(private userService : AdminService) { }
  */
      this.userService.getUser(JSON.parse(this.technicienId).userId) .subscribe(
        (resultat:any) => {
          console.log(resultat);
          this.user = resultat;
        
        });
      const token = localStorage.getItem('id_token');
      if(token){
        this.userIsAuthenticated=true;
      }
      
      
      const type = JSON.parse(localStorage.getItem('user')).type;
      if(type=="technicien"){
        this.technicien=true;
        this.utilisateur=false;
        this.admin=false;
      }
      if(type=="admin"){
        this.admin=true;
        this.technicien=false;
        this.utilisateur=false;
      }
      if(type=="utilisateur"){
        this.utilisateur=true;
      }
    
      this.typeListenerSubs = this.authService.getTypeListener().subscribe(type=>{
        this.userType = type;

        if(type=='technicien'){
          this.technicien = true;
          this.admin=false;
          this.utilisateur=false;
        }
        else if(type=='utilisateur'){
          this.technicien = false;
          this.admin=false;
          this.utilisateur=true;
        }
        else{
          this.admin=true;
          this.technicien = false;
          this.utilisateur=false;
          
        }

      });





      


    }
    ngOnDestroy(): void {
      // this.typeListenerSubs.unsubscribe();
      // this.authListenerSubs.unsubscribe();
    }
  onLogoutClick() {
    this.authService.logout();
  }
  afficher(){
    if(this.aff==0){
    this.aff=1;}
    else{
      this.aff=0;
    }

  }
}
