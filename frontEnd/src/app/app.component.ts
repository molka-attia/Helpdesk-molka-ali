import { Component, OnDestroy, OnInit  } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,OnDestroy {
  private authListenerSubs : Subscription;
  private typeListenerSubs : Subscription;
  userIsAuthenticated = false;
  userType:string;
  technicien : boolean;
  admin:boolean=false;
token2:any;

  constructor(
    public authService : AuthService,
    ) { }

    ngOnInit(): void {
      this.authListenerSubs= this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
        this.userIsAuthenticated= isAuthenticated;
      });
      
      const token = localStorage.getItem('id_token');
      
      if(token){
        this.userIsAuthenticated=true;
      }
      const type = JSON.parse(localStorage.getItem('user')).type;
      if(type=="technicien"){
        this.technicien=true;
      }
      if(type=="admin"){
        this.admin=true;
      }
      else{this.admin=false;}
      this.typeListenerSubs = this.authService.getTypeListener().subscribe(type=>{
        this.userType = type;

        if(type=='technicien'){
          this.technicien = true;
        }
        else{
          this.technicien = false;
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
}
