import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(
    public router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole: any = route.data.expectedRole;
    const item = localStorage.getItem('user');
    if (item === '' || item === null) {
      if (route.routeConfig.path !== 'login') {
        this.router.navigate(['/index/home']);
        return false;
      } else {
        return true;
      }
    }
    if (expectedRole !== undefined && expectedRole === 'admin' && JSON.parse(item).type !== expectedRole) {
      this.router.navigate(['/index/home']);
      return false;
    }
    if (route.routeConfig.path === 'login') {
      this.router.navigate(['/client/home']);
      return false;
    }
    return true;
  }
}
