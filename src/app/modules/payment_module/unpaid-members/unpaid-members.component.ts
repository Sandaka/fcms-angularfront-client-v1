import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UnpaidMembers } from 'src/app/classes/unpaidMembers';
import { UnpaidMembersService } from './unpaid-members.service';

@Component({
  selector: 'app-unpaid-members',
  templateUrl: './unpaid-members.component.html',
  styleUrls: ['./unpaid-members.component.scss']
})
export class UnpaidMembersComponent implements OnInit {

  unpaidMemberList: Observable<UnpaidMembers[]>;

  constructor(private unpaidMembersService: UnpaidMembersService) { }

  ngOnInit() {
    this.loadMembers();
  }


  loadMembers() {
    this.unpaidMembersService.loadMembers().subscribe(data => {
      this.unpaidMemberList = data;
    });
    console.log(this.unpaidMemberList);
  }
}
