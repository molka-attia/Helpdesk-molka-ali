import { Injectable } from '@angular/core';
import {CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  canActivate(): boolean{
    const type = JSON.parse(localStorage.getItem('user')).type;
    if(type=='admin'){
      return true;
    }
    else{
      return false;
    }
  }

}
