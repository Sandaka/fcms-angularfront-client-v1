import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddImprovementsComponent } from './body_improvement_module/add-improvements/add-improvements.component';
import { TrainerModulesModule } from './trainer-modules.module';
import { AddPaymentComponent } from './payment_module/add-payment/add-payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DaterangeReportComponent } from './profit_reports_module/daterange-report/daterange-report.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AdminViewScheduleComponent } from './workout_module/admin-view-schedule/admin-view-schedule.component';
import { ViewTrainersComponent } from './trainer_module/view-trainers/view-trainers.component';

@NgModule({
  declarations: [
    // AddImprovementsComponent
    AddPaymentComponent,
    DaterangeReportComponent,
    AdminViewScheduleComponent,
    ViewTrainersComponent
  ],
  imports: [
    CommonModule,
    TrainerModulesModule,
    ReactiveFormsModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
  ],
  exports:[TrainerModulesModule]
})
export class AdminModulesModule { }
