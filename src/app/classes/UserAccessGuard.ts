// import { Injectable } from '@angular/core';
// import {
//     Router,
//     ActivatedRouteSnapshot,
//     CanActivate,
//     RouterStateSnapshot
// } from '@angular/router';

// import { LoginService } from '../modules/user_module/login/login/login.service';

// @Injectable({ providedIn: 'root' })
// export class UserAccessGuard implements CanActivate {

//     constructor(private loginService: LoginService, private router: Router) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         // return route.data['onlyGuests'] != authService.isAuthenticated();
//         // return route.data[this.loginService.getLoggedUserRole()];


//         if (sessionStorage.getItem('userRole') != null) {
//             let roles = route.data["roles"] as Array<string>;
//             if (roles) {
//                 var match = this.loginService.roleMatch(roles);
//                 if (match) {
//                     return true;
//                 } else {
//                     this.router.navigate(['/login']);
//                     return false;
//                 }
//             }
//             else
//                 return true;
//         }
//         this.router.navigate(['/login']);
//         return false;





//         // const currentRole = this.loginService.getLoggedUserRole();
//         // console.log("user auth gaurd : " + currentRole);
//         // if ('' === currentRole) {
//         //     this.router.navigate(['/login']);
//         //     return false;
//         // }else{
//         //     return true;
//         // }


//         // if ('' === currentRole) {
//         //     this.router.navigate(['/login']);
//         //     return false;
//         // } else if ('1' === currentRole) {
//         //     this.router.navigate(['/admin']);
//         //     return true;
//         // } else if ('2' === currentRole) {
//         //     console.log("trainer logged...");
//         //     this.router.navigate(['trainer']);
//         //     return true;
//         // } else if ('3' === currentRole) {
//         //     this.router.navigate(['/member']);
//         //     return true;
//         // } else {
//         //     return false;
//         // }

//     }
// }