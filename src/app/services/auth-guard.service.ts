import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let role = route.data["role"] as string;

    const userType = this.authService.userType;
    const isAuth = this.authService.isAuth;
    if (isAuth && userType == role) {
      return true;
    } else {
      this.router.navigate(['/connexion']);
      return false;
    }
  }

}
