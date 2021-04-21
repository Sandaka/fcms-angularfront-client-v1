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
  LOGGED_USER_ID = "userId";
  LOGGED_MEMBER_ID = "memberId";
  LOGGED_TRAINER_ID = "trainerId";

  public userName: string;
  public password: string;
  public userRole: string;
  public userId: number;

  private baseUrl = 'http://localhost:9090/fcms/v1';

  constructor(private http: HttpClient) { }

  authenticationService(userName: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login?userName=${userName}&password=${password}`, {
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
    return this.http.post(`${this.baseUrl}/login?userName=${userName}&password=${password}`, {});
  }

  createBasicAuthToken(userName: string, password: string) {
    return 'Basic ' + window.btoa(userName + ":" + password)
  }

  registerSuccessfulLogin(userName, password, userRole, userId) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, userName);
    sessionStorage.setItem(this.LOGGED_USER_ROLE, userRole);
    sessionStorage.setItem(this.LOGGED_USER_ID, userId);
    console.log("Register user : " + this.USER_NAME_SESSION_ATTRIBUTE_NAME + "=" + userName + " role : " + userRole + "user Id: " + userId);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.LOGGED_USER_ROLE);
    sessionStorage.removeItem(this.LOGGED_USER_ID);
    sessionStorage.removeItem(this.LOGGED_MEMBER_ID);
    sessionStorage.removeItem(this.LOGGED_TRAINER_ID);
    this.userName = null;
    this.password = null;
    this.userRole = null;
    this.userId = null;
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

  getLoggedUserId() {
    let userId = sessionStorage.getItem(this.LOGGED_USER_ID);
    if (null === userId) return 0
    return userId
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

  // to save member id in session
  getMemberDetails(userId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/memberByUserId/` + userId);
  }

  getTrainerDetails(userId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/trainerByUserId/` + userId);
  }

  saveMemberIdInSession(memberId: any) {
    sessionStorage.setItem(this.LOGGED_MEMBER_ID, memberId);
  }

  saveTrainerIdInSession(trainerrId: any) {
    sessionStorage.setItem(this.LOGGED_TRAINER_ID, trainerrId);
  }
}
