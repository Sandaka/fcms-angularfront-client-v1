import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AddMemberComponent } from './modules/member_module/add-member/add-member.component';
import { AddTrainerComponent } from './modules/trainer_module/add-trainer/add-trainer.component';
import { AddImprovementsComponent } from './modules/body_improvement_module/add-improvements/add-improvements.component';
import { ImprovementReportComponent } from './modules/body_improvement_module/improvement-report/improvement-report.component';
import { AddWorkoutComponent } from './modules/workout_module/add-workout/add-workout.component';
import { CreateScheduleComponent } from './modules/workout_module/create-schedule/create-schedule.component';
import { FullscreenComponent } from './layouts/fullscreen/fullscreen.component';
import { LoginComponent } from './modules/user_module/login/login/login.component';
import { CreateUserComponent } from './modules/user_module/create-user/create-user.component';
import { TrainerComponent } from './layouts/trainer/trainer.component';
import { MemberComponent } from './layouts/member/member.component';
// import { UserAccessGuard } from './classes/UserAccessGuard';
import { Role } from './classes/role';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './classes/auth/auth.guard';
import { AddPaymentComponent } from './modules/payment_module/add-payment/add-payment.component';
import { DaterangeReportComponent } from './modules/profit_reports_module/daterange-report/daterange-report.component';
import { AdminViewScheduleComponent } from './modules/workout_module/admin-view-schedule/admin-view-schedule.component';
import { ViewTrainersComponent } from './modules/trainer_module/view-trainers/view-trainers.component';
import { AdminUpdateUserComponent } from './modules/user_module/admin-update-user/admin-update-user.component';
import { AddGuidelineComponent } from './modules/guidelines_module/add-guideline/add-guideline.component';
import { ApproveGuidelineComponent } from './modules/guidelines_module/approve-guideline/approve-guideline.component';
import { DailyReportComponent } from './modules/profit_reports_module/daily-report/daily-report.component';
import { AnnualReportComponent } from './modules/profit_reports_module/annual-report/annual-report.component';
import { MonthlyReportComponent } from './modules/profit_reports_module/monthly-report/monthly-report.component';
import { MemberBodyImprovementsComponent } from './modules/body_improvement_module/member-body-improvements/member-body-improvements.component';
import { MemberViewScheduleComponent } from './modules/workout_module/member-view-schedule/member-view-schedule.component';
import { MemberUpdateProfileComponent } from './modules/member_module/member-update-profile/member-update-profile.component';
import { ViewOnlyGuidelineComponent } from './modules/guidelines_module/view-only-guideline/view-only-guideline.component';
import { MemberViewPaymentsComponent } from './modules/payment_module/member-view-payments/member-view-payments.component';
import { TrainerUpdateProfileComponent } from './modules/trainer_module/trainer-update-profile/trainer-update-profile.component';
import { TrainerBodyImprovementsComponent } from './modules/body_improvement_module/trainer-body-improvements/trainer-body-improvements.component';
import { TrainerDashboardComponent } from './modules/dashboard_module/trainer-dashboard/trainer-dashboard.component';
import { AdminDashboardComponent } from './modules/dashboard_module/admin-dashboard/admin-dashboard.component';
import { MemberDashboardComponent } from './modules/dashboard_module/member-dashboard/member-dashboard.component';
import { ChangePasswordComponent } from './modules/user_module/change-password/change-password.component';
import { AddExpenseComponent } from './modules/payment_module/add-expense/add-expense.component';
import { ChangeCourseComponent } from './modules/member_module/change-course/change-course.component';

const routes: Routes = [
  {
    path: 'admin', component: DefaultComponent, canActivate: [AuthGuard], data: { roles: ['1'] },
    children: [{
      path: '', component: AdminDashboardComponent
    },
    {
      path: 'add_member', component: AddMemberComponent
    }, {
      path: 'add_trainer', component: AddTrainerComponent
    }, {
      path: 'add_bodyimprovements', component: AddImprovementsComponent
    }, {
      path: 'body_improvement_report', component: ImprovementReportComponent
    }, {
      path: 'add_workout', component: AddWorkoutComponent
    }, {
      path: 'create_schedule', component: CreateScheduleComponent
    }, {
      path: 'create_user', component: CreateUserComponent
    }, {
      path: 'add_payment', component: AddPaymentComponent
    }, {
      path: 'selected_period', component: DaterangeReportComponent
    }, {
      path: 'view_schedule', component: AdminViewScheduleComponent
    }, {
      path: 'view_trainers', component: ViewTrainersComponent
    }, {
      path: 'update_user', component: AdminUpdateUserComponent
    }, {
      path: 'add_guideline', component: AddGuidelineComponent
    }, {
      path: 'approve_guideline', component: ApproveGuidelineComponent
    }, {
      path: 'daily_report', component: DailyReportComponent
    }, {
      path: 'annual_report', component: AnnualReportComponent
    }, {
      path: 'monthly_report', component: MonthlyReportComponent
    }, {
      path: 'change_password', component: ChangePasswordComponent
    }, {
      path: 'add_expense', component: AddExpenseComponent
    }, {
      path: 'change_course', component: ChangeCourseComponent
    }
    ]
  },
  {
    path: '', component: FullscreenComponent,
    children: [{
      path: 'login', component: LoginComponent
    }, {
      path: '', component: LoginComponent
    }]
  },
  {
    path: 'trainer', component: TrainerComponent, canActivate: [AuthGuard], data: { roles: ['2'] },
    children: [{
      path: '', component: TrainerDashboardComponent
    },
    {
      path: 'add_bodyimprovements', component: AddImprovementsComponent
    }, {
      path: 'add_guideline', component: AddGuidelineComponent
    }, {
      path: 'create_schedule', component: CreateScheduleComponent
    }, {
      path: 'trainer_view_schedule', component: AdminViewScheduleComponent
    }, {
      path: 'trainer_update_profile', component: TrainerUpdateProfileComponent
    }, {
      path: 'trainer_body_improvement_report', component: TrainerBodyImprovementsComponent
    }, {
      path: 'change_password', component: ChangePasswordComponent
    }
    ]
  },
  {
    path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard]
  },
  {
    path: 'member', component: MemberComponent, canActivate: [AuthGuard], data: { roles: ['3'] },
    children: [{
      path: '', component: MemberDashboardComponent
    },
    {
      path: 'member_body_improvement_report', component: MemberBodyImprovementsComponent
    }, {
      path: 'member_view_schedule', component: MemberViewScheduleComponent
    }, {
      path: 'member_update_profile', component: MemberUpdateProfileComponent
    }, {
      path: 'member_view_guideline', component: ViewOnlyGuidelineComponent
    }, {
      path: 'member_view_attendance', component: ViewOnlyGuidelineComponent
    }, {
      path: 'member_fee_settlement', component: MemberViewPaymentsComponent
    }, {
      path: 'change_password', component: ChangePasswordComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
