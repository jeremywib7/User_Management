import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {StringDropdown} from "../../model/string-dropdown";
import {BooleanDropdown} from "../../model/boolean-dropdown";
import {FormBuilder, FormGroup} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../../service/authentication.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../service/user.service";
import {Title} from "@angular/platform-browser";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {firstValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {DataService} from "../../service/data.service";
import {FormService} from "../../service/form.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    public selectedUsers: User[];
    public selectedUser: User;
    public roles: StringDropdown[];
    public users: User[];
    public actives: BooleanDropdown[] = this.dataService.actives;
    public userForm: FormGroup;
    public isRefreshUsers: boolean;
    public showFormDialog: boolean
    public showInfoDialog: boolean;
    public appName = environment.appname;
    public profileImage: File;

    constructor(
        private authenticationService: AuthenticationService,
        private messageService: MessageService,
        private formService: FormService,
        private userService: UserService,
        private dataService: DataService,
        private router: Router,
        private fb: FormBuilder,
        private title: Title
    ) {
        if (!this.authenticationService.isLoggedIn()) {
            this.router.navigateByUrl('/login');
        }
        this.title.setTitle("User | " + this.appName);
        this.userForm = this.fb.group({
            firstName: ['', RxwebValidators.required()],
            lastName: ['', RxwebValidators.required()],
            username: ['', RxwebValidators.required()],
            email: ['', RxwebValidators.required()],
            role: ['', RxwebValidators.required()],
            isActive: ['', RxwebValidators.required()],
        });
    }

    async ngOnInit(): Promise<void> {
        try {
            this.users = await this.getUsers(false);
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.error.message
            });
        }
    }

    public onProfileImageChange(file: File): void {
        this.profileImage = file;
    }

    public async getUsers(showNotification: boolean): Promise<User[]> {
        this.isRefreshUsers = true;
        try {
            const user: User[] = await firstValueFrom(this.userService.getUsers());
            this.userService.addUserToLocalCache(user);
            this.users = user;
            this.isRefreshUsers = false;
            if (showNotification) {
                this.messageService.add({
                    severity: 'success',
                    detail: `${user.length} user(s) loaded successfully.`
                });
                this.isRefreshUsers = false;
            }
            return user;
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.error.message
            });
            return null;
        }
    }

    public onSelectUser(selectedUser: User): void {
        this.selectedUser = selectedUser;
        this.showInfoDialog = true;
    }

    public setSelectedDropdownStatus(status: boolean, badge: boolean): string {
        if (badge) {
            if (status === true) {
                return 'user-badge status-active';
            } else {
                return 'user-badge status-inactive';
            }
        } else {
            if (status === true) {
                return 'Active';
            } else {
                return 'Inactive';
            }
        }
    }

    deleteSelectedProducts() {

    }

    public async onAddNewUser(): Promise<void> {
        if (this.userForm.invalid) {
            return this.formService.validateFormFields(this.userForm, null);
        }

        this.isRefreshUsers = true;
        const formData = this.userService.createUserFormDate(null, this.userForm.value, this.profileImage);
        try {
            const res = await firstValueFrom(this.userService.addUser(formData));
            await this.getUsers(false);
            this.profileImage = null;
            this.userForm.reset();
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'User added successfully'
            });
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.error.message
            });
            this.isRefreshUsers = false;
            this.profileImage = null;
        }
    }

    public searchUsers(searchTerm: string): void {
        const results: User[] = [];
        for (const user of this.userService.getUsersFromLocalCache()) {
            if (user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
                user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
                user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
                user.userId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
            ) {
                results.push(user);
            }
        }

        this.users = results;
        if (results.length === 0 || !searchTerm) {
            this.users = this.userService.getUsersFromLocalCache();
        }
    }
}
