import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit ,OnDestroy {
  private authListenerSubs : Subscription;
  private typeListenerSubs : Subscription;
  userIsAuthenticated = false;
  userType:string;
  manager : boolean;
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
      
      


    }
    ngOnDestroy(): void {
      // this.typeListenerSubs.unsubscribe();
      // this.authListenerSubs.unsubscribe();
    }
  onLogoutClick() {
    this.authService.logout();
  }
}