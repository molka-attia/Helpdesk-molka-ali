import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsTechnicienGuard implements CanActivate {
  canActivate(): boolean{
    const type = JSON.parse(localStorage.getItem('user')).type;
    if(type=='technicien'){
      return true;
    }
    else{
      return false;
    }
  }

}
