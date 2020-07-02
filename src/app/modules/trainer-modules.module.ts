import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddImprovementsComponent } from './body_improvement_module/add-improvements/add-improvements.component';
import { ReactiveFormsModule } from '@angular/forms';

// import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AddImprovementsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // ChartsModule
  ],
  exports:[AddImprovementsComponent]
})
export class TrainerModulesModule { }
