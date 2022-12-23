import {Component, OnInit} from '@angular/core';
import {Message, MessageService} from "primeng/api";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {AuthenticationService} from "../../service/authentication.service";
import {RxFormBuilder, RxwebValidators} from "@rxweb/reactive-form-validators";
import {FormService} from "../../service/form.service";
import {User} from "../../model/user";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public isLoadingRegister: boolean = false;
    public authMessage: Message[];
    public registerForm: FormGroup;
    public registerCo: any;

    constructor(
        public authenticationService: AuthenticationService,
        private messageService: MessageService,
        private formService: FormService,
        private router: Router,
        private fb: FormBuilder
    ) {
        if (this.authenticationService.isLoggedIn()) {
            this.router.navigateByUrl('/user/management');
        }
        this.registerForm = this.fb.group({
            firstName: ['', [RxwebValidators.required()]],
            lastName: ['', [RxwebValidators.required()]],
            username: ['', [RxwebValidators.required()]],
            email: ['', [RxwebValidators.required()]],
        });
        this.registerCo = this.registerForm.controls;
    }

    ngOnInit(): void {
    }

    async onRegister(): Promise<void> {
        if (this.registerForm.invalid) {
            return this.formService.validateFormFields(this.registerForm);
        }

        this.isLoadingRegister = true;
        try {
            const login: HttpResponse<User> = await firstValueFrom(this.authenticationService.register(this.registerForm.value));
            this.messageService.add({
                severity: 'success',
                summary: 'Account Created',
                detail: 'Please check your email for password to login'
            });
            await this.router.navigateByUrl('/pages/user/management');
            this.isLoadingRegister = false;
        } catch (error) {
            this.authMessage = [{severity: 'error', detail: error.error.message}];
            this.isLoadingRegister = false;
        }
    }

}
