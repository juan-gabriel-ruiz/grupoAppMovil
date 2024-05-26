// import { CanActivateFn } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterState, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export const AuthGuard implements CanActivateFn {


  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  CanActivateFn (
    route:ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean |  UrlTree>  | boolean | UrlTree  {

      let user = localStorage.getItem('user');


      return  new Promise((resolve) => {

        this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {

          if(auth){
           if (user) resolve(true);
          }
          else{
            this.utilsSvc.routerLink('/auth');
            resolve(false);
          }

        })

      });
    }

}
