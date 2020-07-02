import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerComponent } from './trainer.component';
import { AddImprovementsComponent } from 'src/app/modules/body_improvement_module/add-improvements/add-improvements.component';
import { ImprovementReportComponent } from 'src/app/modules/body_improvement_module/improvement-report/improvement-report.component';
import { AddWorkoutComponent } from 'src/app/modules/workout_module/add-workout/add-workout.component';
import { CreateScheduleComponent } from 'src/app/modules/workout_module/create-schedule/create-schedule.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TrainerModulesModule } from 'src/app/modules/trainer-modules.module';

@NgModule({
  declarations: [
    TrainerComponent,
    // AddImprovementsComponent,
    // ImprovementReportComponent,
    // AddWorkoutComponent,
    // CreateScheduleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    TrainerModulesModule
  ]
})
export class TrainerModule { }
