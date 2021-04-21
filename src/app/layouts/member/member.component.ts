import { Component, OnInit } from '@angular/core';
import { MemberSidebarService } from 'src/app/shared/member/member-sidebar/member-sidebar.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  constructor(private memberSidebarService: MemberSidebarService) { }

  ngOnInit() {
  }

  getSideBarState() {
    return this.memberSidebarService.getSidebarState();
  }

}
