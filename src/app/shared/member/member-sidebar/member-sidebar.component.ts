import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/user_module/login/login/login.service';
import { MemberSidebarService } from './member-sidebar.service';

@Component({
  selector: 'app-member-sidebar',
  templateUrl: './member-sidebar.component.html',
  styleUrls: ['./member-sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class MemberSidebarComponent implements OnInit {

  menus = [];
  userName: any;

  constructor(public memberSidebarService: MemberSidebarService, public loginService: LoginService, private router: Router) {
    this.menus = memberSidebarService.getMenuList();
  }

  ngOnInit() {
    this.userName = sessionStorage.getItem("authenticatedUser");
  }

  getSideBarState() {
    return this.memberSidebarService.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.memberSidebarService.hasBackgroundImage;
  }

  logoutMember() {
    this.router.navigate(['/login']);
    return this.loginService.logout();
  }
}
