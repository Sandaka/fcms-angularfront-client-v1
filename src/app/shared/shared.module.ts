import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './admin/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TrainerSidebarComponent } from './trainer/trainer-sidebar/trainer-sidebar.component';
import { MemberSidebarComponent } from './member/member-sidebar/member-sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    TrainerSidebarComponent,
    MemberSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    TrainerSidebarComponent,
    MemberSidebarComponent,
  ]
})
export class SharedModule { }
