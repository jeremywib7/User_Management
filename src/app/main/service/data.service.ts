import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../model/user";
import {StringDropdown} from "../model/string-dropdown";
import {BooleanDropdown} from "../model/boolean-dropdown";

@Injectable()
export class DataService {

    public dummyUsers: User[];
    public roles: StringDropdown[];
    public actives: BooleanDropdown[];

    constructor(private http: HttpClient) {
        this.dummyUsers = [
            {
                id: 1,
                userId: null,
                firstName: 'John',
                lastName: 'Doe',
                username: 'john',
                password: '123456',
                email: 'john@gmail.com',
                role: 'ROLE_SUPER_USER',
                profileImageUrl: 'john/john.jpg',
                lastLoginDateDisplay: new Date((new Date()).getTime() - 24 * 60 * 60 * 1000),
                authorities: ['user:create','user:read','user:update','user:delete'],
                active: true,
                joinDate: new Date((new Date()).getTime() - 24 * 60 * 60 * 1000),
                notLocked: true
            },
            {
                id: 2,
                userId: null,
                firstName: 'Maria',
                lastName: 'Hill',
                username: 'maria',
                password: '123456',
                email: 'maria@gmail.com',
                role: 'USER',
                profileImageUrl: 'maria',
                lastLoginDateDisplay: new Date((new Date()).getTime() - 24 * 60 * 60 * 1000),
                authorities: ['user:read'],
                active: false,
                joinDate: new Date((new Date()).getTime() - 24 * 60 * 60 * 1000),
                notLocked: true
            },
        ];

        this.roles = [
            {
                name: 'USER',
                value: 'ROLE_USER'
            },
            {
                name: 'HR',
                value: 'ROLE_HR'
            },
            {
                name: 'MANAGER',
                value: 'ROLE_MANAGER'
            },
            {
                name: 'ADMIN',
                value: 'ROLE_ADMIN'
            },
            {
                name: 'SUPER ADMIN',
                value: 'ROLE_SUPER_ADMIN'
            }
        ];

        this.actives = [
            {label: 'ACTIVE', value: true},
            {label: 'INACTIVE', value: false},
        ];
    }


    public getCountries(): Observable<any[]> {
        return this.http.get<any>('assets/data/countries.json');
    }

    public getStatus(): Observable<any[]> {
        return this.http.get<any>('assets/data/active-status.json');
    }
}
