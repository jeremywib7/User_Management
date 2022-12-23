import {Component, OnInit} from '@angular/core';
import {Message} from "primeng/api";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {firstValueFrom} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {HeaderType} from "../../enum/header-type.enum";
import {LayoutService} from "../../../layout/service/app.layout.service";
import {FormService} from "../../service/form.service";
import {User} from "../../model/user";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {

    valCheck: string[] = ['remember'];

    password!: string;

    public isLoadingSignIn: boolean = false;
    public authMessage: Message[];
    public loginForm: FormGroup;

    constructor(
        public authenticationService: AuthenticationService,
        public layoutService: LayoutService,
        private formService: FormService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.loginForm = this.fb.group({
            username: ['', [RxwebValidators.required()]],
            password: ['', [RxwebValidators.required()]]
        });
    }

    ngOnInit(): void {
        if (this.authenticationService.isLoggedIn()) {
            this.router.navigateByUrl('/pages/user/management');
        }
    }

    public async onLogin(): Promise<void> {
        if (this.loginForm.invalid) {
            return this.formService.validateFormFields(this.loginForm);
        }

        this.isLoadingSignIn = true;
        try {
            const login : HttpResponse<User>  = await firstValueFrom(this.authenticationService.login(this.loginForm.value));
            const token = login.headers.get(HeaderType.JWT_TOKEN);
            this.authenticationService.saveToken(token);
            this.authenticationService.addUserToLocalCache(login.body);
            this.isLoadingSignIn = false;
            await this.router.navigateByUrl('/pages/user/management');
        } catch (error) {
            this.authMessage = [{severity: 'error', detail: error.error.message}];
            this.isLoadingSignIn = false;
        }
    }
}
