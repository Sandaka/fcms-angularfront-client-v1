import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TrainerSidebarService } from './trainer-sidebar.service';
import { LoginService } from 'src/app/modules/user_module/login/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-sidebar',
  templateUrl: './trainer-sidebar.component.html',
  styleUrls: ['./trainer-sidebar.component.scss'],

  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class TrainerSidebarComponent implements OnInit {

  menus = [];
  userName: any;

  constructor(public trainerSidebarService: TrainerSidebarService, public loginService: LoginService, private router: Router) {
    this.menus = trainerSidebarService.getMenuList();
  }

  ngOnInit() {
    this.userName = sessionStorage.getItem("authenticatedUser");
  }

  getSideBarState() {
    return this.trainerSidebarService.getSidebarState();
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
    return this.trainerSidebarService.hasBackgroundImage;
  }

  logoutTrainer() {
    this.router.navigate(['/login']);
    return this.loginService.logout();
  }
}
