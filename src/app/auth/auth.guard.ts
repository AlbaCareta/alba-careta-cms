import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { switchMap, take } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AngularFireAuth) {
  }

  canActivate() {
    return this.auth.authState
      .pipe(
        take(1), switchMap(async (user) => {
          if (user) {
            if (user.isAnonymous) {
              this.router
                .navigate(['login'])
                .then()
              return false
            } else {
              return true
            }
          } else {
            this.router
              .navigate(['login'])
              .then()
            return false
          }
        })
      )
  }
}
