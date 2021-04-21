import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MemberModulesModule } from 'src/app/modules/member-modules.module';

@NgModule({
  declarations: [
    MemberComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    MemberModulesModule
  ]
})
export class MemberModule { }
