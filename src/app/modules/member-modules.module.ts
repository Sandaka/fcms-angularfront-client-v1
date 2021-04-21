import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MemberUpdateProfileComponent } from "./member_module/member-update-profile/member-update-profile.component";
import { MemberViewPaymentsComponent } from "./payment_module/member-view-payments/member-view-payments.component";
import { ViewOnlyGuidelineComponent } from "./guidelines_module/view-only-guideline/view-only-guideline.component";
import { MemberBodyImprovementsComponent } from "./body_improvement_module/member-body-improvements/member-body-improvements.component";
import { MemberViewScheduleComponent } from "./workout_module/member-view-schedule/member-view-schedule.component";
import { MemberDashboardComponent } from "./dashboard_module/member-dashboard/member-dashboard.component";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { BrowserModule } from "@angular/platform-browser";
import { ChangePasswordComponent } from "./user_module/change-password/change-password.component";

@NgModule({
    declarations: [
        MemberUpdateProfileComponent,
        MemberViewPaymentsComponent,
        ViewOnlyGuidelineComponent,
        MemberBodyImprovementsComponent,
        MemberViewScheduleComponent,
        MemberDashboardComponent,
        ChangePasswordComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DropDownListModule,
        BrowserModule
    ],
    exports: []
})
export class MemberModulesModule { }