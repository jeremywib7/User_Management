import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from "primeng/ripple";
import {FormService} from "../../service/form.service";
import {MessagesModule} from "primeng/messages";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule, ReactiveFormsModule,
        PasswordModule,
        RippleModule, MessagesModule
    ],
    providers: [
        FormService
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
