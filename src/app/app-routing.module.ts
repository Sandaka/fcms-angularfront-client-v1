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

const routes: Routes = [
  {
    path: 'admin', component: DefaultComponent, canActivate: [AuthGuard], data: { roles: ['1'] },
    children: [{
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
    },{
      path: 'view_trainers', component: ViewTrainersComponent
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
      path: 'add_bodyimprovements', component: AddImprovementsComponent
    }]
  },
  {
    path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard]
  }
  // {
  //   path: 'member', component: MemberComponent,
  //   children: [{
  //     path: 'login', component: LoginComponent
  //   }]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
