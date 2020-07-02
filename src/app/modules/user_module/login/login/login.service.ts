import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  LOGGED_USER_ROLE = "userRole";
  public userName: string;
  public password: string;
  public userRole: string;

  private baseUrl = 'http://localhost:9090/fcms/v1/login';

  constructor(private http: HttpClient) { }

  authenticationService(userName: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}?userName=${userName}&password=${password}`, {
      headers: { authorization: this.createBasicAuthToken(userName, password) }
    }).pipe(map((res) => {
      this.userName = userName;
      this.password = password;
      // this.registerSuccessfulLogin(userName, password);
    }));
  }

  findUserExists(userName: string, password: string): Observable<any> {
    this.userName = userName;
    this.password = password;
    // this.registerSuccessfulLogin(userName, password);
    return this.http.post(`${this.baseUrl}?userName=${userName}&password=${password}`, {});
  }

  createBasicAuthToken(userName: string, password: string) {
    return 'Basic ' + window.btoa(userName + ":" + password)
  }

  registerSuccessfulLogin(userName, password, userRole) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, userName);
    sessionStorage.setItem(this.LOGGED_USER_ROLE, userRole);
    console.log("Register user : " + this.USER_NAME_SESSION_ATTRIBUTE_NAME + "=" + userName + " role : " + userRole);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.LOGGED_USER_ROLE);
    this.userName = null;
    this.password = null;
    this.userRole = null;
    console.log("logout: " + this.userName);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }

  getLoggedUserRole() {
    let userRole = sessionStorage.getItem(this.LOGGED_USER_ROLE);
    if (null === userRole) return ''
    return userRole
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    // var userRoles = JSON.parse(sessionStorage.getItem('userRole'));
    var userRoles: string[] = [JSON.parse(sessionStorage.getItem('userRole'))];
    console.log(allowedRoles + "");
    console.log(userRoles + "");
    allowedRoles = allowedRoles + "";
    // userRoles = userRoles+"";

    if (allowedRoles === userRoles + "") {
      console.log("matched");
      isMatch = true;
    }

    // allowedRoles.forEach(element1 => {
    //   console.log("allowedRoles element.. " + element1);
    //   userRoles.forEach(element2 => {
    //     console.log("allowedRoles element.. " + element2+" "+(element1.toString === element2.toString));
    //     if (element1 === element2) {
    //       console.log("matched");
    //     }
    //   });
    // });

    // allowedRoles.forEach(element => {
    //   if (userRoles.indexOf(element) > -1) {
    //     isMatch = true;
    //     // return isMatch;
    //   }
    // });
    return isMatch;
  }
}
