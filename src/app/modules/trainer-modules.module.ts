import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddImprovementsComponent } from './body_improvement_module/add-improvements/add-improvements.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddGuidelineComponent } from './guidelines_module/add-guideline/add-guideline.component';
import { CreateScheduleComponent } from './workout_module/create-schedule/create-schedule.component';
import { TrainerViewScheduleComponent } from './workout_module/trainer-view-schedule/trainer-view-schedule.component';
import { TrainerBodyImprovementsComponent } from './body_improvement_module/trainer-body-improvements/trainer-body-improvements.component';
import { TrainerUpdateProfileComponent } from './trainer_module/trainer-update-profile/trainer-update-profile.component';
import { TrainerDashboardComponent } from './dashboard_module/trainer-dashboard/trainer-dashboard.component';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';
import { ChangePasswordComponent } from './user_module/change-password/change-password.component';

// import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AddImprovementsComponent,
    AddGuidelineComponent,
    CreateScheduleComponent,
    TrainerViewScheduleComponent,
    TrainerBodyImprovementsComponent,
    TrainerUpdateProfileComponent,
    TrainerDashboardComponent,
    // ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    // ChartsModule
  ],
  exports:[AddImprovementsComponent]
})
export class TrainerModulesModule { }
