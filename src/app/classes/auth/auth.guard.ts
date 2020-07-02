import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { LoginService } from 'src/app/modules/user_module/login/login/login.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private userService: LoginService) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (sessionStorage.getItem('userRole') != null) {
            let roles = next.data["roles"] as Array<string>;
            if (roles) {
                var match = this.userService.roleMatch(roles);
                console.log("match : "+match)
                if (match) return true;
                else {
                    this.router.navigate(['/forbidden']);
                    return false;
                }
            }
            else
                return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
