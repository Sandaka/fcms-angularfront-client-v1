import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { LoginService } from 'src/app/modules/user_module/login/login/login.service';
import { Router } from '@angular/router';
// import { MenusService } from './menus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus = [];
  constructor(public sidebarservice: SidebarService, public loginService: LoginService, private router: Router) {
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit() {
  }

  // toggleSidebar() {
  //   this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  // }
  // toggleBackgroundImage() {
  //   this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  // }
  // hideSidebar() {
  //   this.sidebarservice.setSidebarState(true);
  // }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
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
    return this.sidebarservice.hasBackgroundImage;
  }

  logoutAdmin() {
    this.router.navigate(['/login']);
    return this.loginService.logout();    
  }

}
