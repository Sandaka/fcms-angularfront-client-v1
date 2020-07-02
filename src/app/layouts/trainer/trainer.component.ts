import { Component, OnInit } from '@angular/core';
import { TrainerSidebarService } from 'src/app/shared/trainer/trainer-sidebar/trainer-sidebar.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {

  constructor(public trainerSidebarService: TrainerSidebarService) { }

  getSideBarState() {
    return this.trainerSidebarService.getSidebarState();
  }

  ngOnInit() {
  }

}
