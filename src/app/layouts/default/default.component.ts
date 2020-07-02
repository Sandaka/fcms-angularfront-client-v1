import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/admin/sidebar/sidebar.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(public sidebarservice: SidebarService) { }
  
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }
  
  ngOnInit() {
  }

}
