import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './admin/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TrainerSidebarComponent } from './trainer/trainer-sidebar/trainer-sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    TrainerSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    TrainerSidebarComponent
  ]
})
export class SharedModule { }
