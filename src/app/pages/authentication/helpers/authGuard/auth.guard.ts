import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../_service/auth.service';
import {TokenStorageService} from '../../_service/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenStorageService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ((this.tokenService.getUser() === null) || (!this.checkLogin())) {
      this.authService.setLoggedin(false);
      this.authService.signOut();
      this.router.navigate(['/authentication/login']);
      return false;
    } else {
      return this.checkLogin();
    }
  }

  checkLogin(): boolean {
    return this.authService.isLoggedIn.getValue();
  }
}
