import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppLayoutModule} from './layout/app.layout.module';
import {NotfoundComponent} from './main/components/notfound/notfound.component';
import {RegisterComponent} from "./main/pages/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {ButtonModule} from "primeng/button";
import {AuthenticationGuard} from "./main/guard/authentication.guard";
import {AuthenticationService} from "./main/service/authentication.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./main/interceptor/auth.interceptor";
import {MessageService} from "primeng/api";

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule],
    providers: [
        AuthenticationGuard,
        AuthenticationService,
        MessageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
