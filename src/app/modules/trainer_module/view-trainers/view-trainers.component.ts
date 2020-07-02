import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from 'src/app/classes/trainer';
import { ViewTrainersService } from './view-trainers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-trainers',
  templateUrl: './view-trainers.component.html',
  styleUrls: ['./view-trainers.component.scss']
})
export class ViewTrainersComponent implements OnInit {

  trainerList: Observable<Trainer[]>;
  updateTrainerForm: FormGroup;

  constructor(private viewTrainerService: ViewTrainersService, private modalService: NgbModal, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadTrainers();
    this.updateTrainerForm = this.formBuilder.group({
      trainername: [null, [Validators.required]],
      trainerid: [null]
    });
  }

  loadTrainers() {
    this.viewTrainerService.getAlltrainers().subscribe(data => {
      this.trainerList = data;
    })
  }

  inactivateTrainer(trainer: Trainer) {
    console.log("trainer Id : " + trainer.trainerid)
  }

  // for delete modal
  openConfirmModal(targetModal, id, name) {
    console.log("inactive : " + name);
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.updateTrainerForm.patchValue({
      trainerName: name,
      trainerId: id
    });
  }

  get trainername() {
    return this.updateTrainerForm.get("trainername");
  }

  get trainerid() {
    return this.updateTrainerForm.get("trainerid");
  }
}
