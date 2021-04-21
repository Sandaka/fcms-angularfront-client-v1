import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMemberComponent } from 'src/app/modules/member_module/add-member/add-member.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { AddTrainerComponent } from 'src/app/modules/trainer_module/add-trainer/add-trainer.component';
import { AddImprovementsComponent } from 'src/app/modules/body_improvement_module/add-improvements/add-improvements.component';
import { ImprovementReportComponent } from 'src/app/modules/body_improvement_module/improvement-report/improvement-report.component';
import { AddWorkoutComponent } from 'src/app/modules/workout_module/add-workout/add-workout.component';
import { CreateScheduleComponent } from 'src/app/modules/workout_module/create-schedule/create-schedule.component';
import { CreateUserComponent } from 'src/app/modules/user_module/create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModulesModule } from 'src/app/modules/admin-modules.module';

import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddPaymentComponent } from 'src/app/modules/payment_module/add-payment/add-payment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MemberModulesModule } from 'src/app/modules/member-modules.module';

@NgModule({
  declarations: [
    DefaultComponent,
    AddMemberComponent,
    AddTrainerComponent,
    // AddImprovementsComponent,
    ImprovementReportComponent,
    AddWorkoutComponent,
    //CreateScheduleComponent,
    CreateUserComponent,
    // AddPaymentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    AdminModulesModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ]
})
export class DefaultModule { }
