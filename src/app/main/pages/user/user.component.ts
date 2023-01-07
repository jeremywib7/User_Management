import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {StringDropdown} from "../../model/string-dropdown";
import {BooleanDropdown} from "../../model/boolean-dropdown";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../../service/authentication.service";
import {UserService} from "../../service/user.service";
import {Title} from "@angular/platform-browser";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {firstValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {DataService} from "../../service/data.service";
import {FormService} from "../../service/form.service";
import {MessageHelperService} from "../../service/message-helper.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    public selectedUsers: User[] = [];
    public selectedUser: User = new User();
    public roles: StringDropdown[] = this.dataService.roles;
    private currentUsername: string;
    public users: User[];
    public actives: BooleanDropdown[] = this.dataService.actives;
    public userForm: FormGroup;
    public isRefreshUsers: boolean = false;
    public showFormDialog: boolean = false;
    public showInfoDialog: boolean = false;
    public appName = environment.appname;
    public profileImage: File;
    public editMode: boolean = false;

    constructor(
        private authenticationService: AuthenticationService,
        private formService: FormService,
        private messageHelperService: MessageHelperService,
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
            active: ['', RxwebValidators.required()],
        });
    }

    async ngOnInit(): Promise<void> {
        try {
            this.users = await this.getUsers(false);
        } catch (error) {
            this.messageHelperService.showToast('error', 'Error', error.error.message);
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
                this.messageHelperService.showToast('error', 'Error',
                    `${user.length} user(s) loaded successfully.`);
                this.isRefreshUsers = false;
            }
            return user;
        } catch (error) {
            this.messageHelperService.showToast('error', 'Error',
                error.error.message);
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

    public onOpenFormAdd(): void {
        this.editMode = false;
        this.userForm.reset();
        this.showFormDialog = true;
    }

    public async onSubmitFormUser(): Promise<void> {
        if (this.userForm.invalid) {
            return this.formService.validateFormFields(this.userForm);
        }
        this.isRefreshUsers = true;
        let action;
        try {
            if (this.editMode) {
                const formData = this.userService.createUserFormDate(this.currentUsername,
                    this.userForm.value, this.profileImage);
                await firstValueFrom(this.userService.updateUser(formData));
                action = 'updated';
            } else {
                const formData = this.userService.createUserFormDate( null,
                    this.userForm.value, this.profileImage)
                await firstValueFrom(this.userService.addUser(formData));
                action = 'created';
            }

            await this.getUsers(false);
            this.profileImage = null;
            this.userForm.reset();
            this.showFormDialog = false;
            this.messageHelperService.showToast('success', 'Success', `User ${{action}} successfully`);
        } catch (error) {
            this.messageHelperService.showToast('error', 'Error', error.error.message);
            this.isRefreshUsers = false;
            this.profileImage = null;
        }
    }

    public onOpenFormEdit(user: User): void {
        this.userForm.reset();
        this.currentUsername = user.username;
        this.editMode = true;
        this.userForm.patchValue(user);
        this.showFormDialog = true;
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
