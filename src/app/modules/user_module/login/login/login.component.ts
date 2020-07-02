import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthDetail } from 'src/app/classes/authDetail';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  userAuth: AuthDetail;

  constructor(private loginService: LoginService, private route: ActivatedRoute,
    private router: Router, ) { }

  ngOnInit() {
  }

  handleLogin() {
    console.log(this.password + "--" + this.username);
    this.loginService.findUserExists(this.username, this.password).subscribe((result) => {
      if (null === result) {
        this.errorMessage = 'Invalid Credentials!';
        this.invalidLogin = true;
      } else {
        this.userAuth = new AuthDetail();
        this.userAuth = result;
        if ('inactivated' === this.userAuth.loginMessage) {
          console.log("inactivated user " + this.userAuth.loginMessage);
          this.errorMessage = 'User has been inactivated!'
          this.invalidLogin = true;
          this.loginSuccess = false;
        } else {
          console.log("user found " + this.userAuth.loginMessage + " " + this.userAuth.userRole);
          this.loginService.registerSuccessfulLogin(this.userAuth.userName, this.userAuth.password, this.userAuth.userRole);

          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful.';

          if ('1' === this.userAuth.userRole) {
            this.router.navigate(['/admin']);
          } else if ('2' === this.userAuth.userRole) {
            this.router.navigate(['/trainer']);
          } else {
            this.router.navigate(['/member']);
          }

        }
      }

    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }

}
