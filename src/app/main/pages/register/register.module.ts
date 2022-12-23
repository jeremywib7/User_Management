import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from "./register.component";
import {RegisterRoutingModule} from "./register-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MessagesModule} from "primeng/messages";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {MessageService} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {FormService} from "../../service/form.service";
import {RxFormBuilder} from "@rxweb/reactive-form-validators";

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ReactiveFormsModule,
        MessagesModule,
        ButtonModule,
        PasswordModule,
        InputTextModule,
        RippleModule
    ],
    providers:[
        MessageService,
        FormService,
    ]
})
export class RegisterModule {
}
