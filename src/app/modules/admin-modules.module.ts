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
import { AdminUpdateUserComponent } from './user_module/admin-update-user/admin-update-user.component';
import { AdminUpdateMemberComponent } from './member_module/admin-update-member/admin-update-member.component';
import { ApproveGuidelineComponent } from './guidelines_module/approve-guideline/approve-guideline.component';
import { DailyReportComponent } from './profit_reports_module/daily-report/daily-report.component';
import { AnnualReportComponent } from './profit_reports_module/annual-report/annual-report.component';
import { MonthlyReportComponent } from './profit_reports_module/monthly-report/monthly-report.component';
import { MemberModulesModule } from './member-modules.module';
import { AdminDashboardComponent } from './dashboard_module/admin-dashboard/admin-dashboard.component';
import { AddExpenseComponent } from './payment_module/add-expense/add-expense.component';
import { ChangeCourseComponent } from './member_module/change-course/change-course.component';

@NgModule({
  declarations: [
    // AddImprovementsComponent
    AddPaymentComponent,
    DaterangeReportComponent,
    AdminViewScheduleComponent,
    ViewTrainersComponent,
    AdminUpdateUserComponent,
    AdminUpdateMemberComponent,
    ApproveGuidelineComponent,
    DailyReportComponent,
    AnnualReportComponent,
    MonthlyReportComponent,
    AdminDashboardComponent,
    AddExpenseComponent,
    ChangeCourseComponent
  ],
  imports: [
    CommonModule,
    TrainerModulesModule,
    MemberModulesModule,
    ReactiveFormsModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
  ],
  exports: [TrainerModulesModule, MemberModulesModule]
})
export class AdminModulesModule { }
