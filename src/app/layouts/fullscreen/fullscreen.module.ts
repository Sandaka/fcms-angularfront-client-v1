import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FullscreenComponent } from './fullscreen.component';
import { LoginComponent } from 'src/app/modules/user_module/login/login/login.component';
import { FormsModule } from '@angular/forms';
import { ForbiddenComponent } from 'src/app/forbidden/forbidden.component';

@NgModule({
  declarations: [
    FullscreenComponent,
    LoginComponent,
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ]
})
export class FullscreenModule { }
