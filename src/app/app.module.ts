import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { FullscreenModule } from './layouts/fullscreen/fullscreen.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultComponent } from './layouts/default/default.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainerComponent } from './layouts/trainer/trainer.component';
import { TrainerModule } from './layouts/trainer/trainer.module';
import { MemberComponent } from './layouts/member/member.component';
import { MemberModule } from './layouts/member/member.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginService } from './modules/user_module/login/login/login.service';
import { AuthGuard } from './classes/auth/auth.guard';
import { AuthInterceptor } from './classes/auth/auth.interceptor';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    // DefaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    FullscreenModule,
    TrainerModule,
    MemberModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownListModule
  ],
  providers: [LoginService, AuthGuard,
    {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
