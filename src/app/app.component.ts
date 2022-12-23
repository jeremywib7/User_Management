import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {Route, Router} from "@angular/router";
import {ReactiveFormConfig} from "@rxweb/reactive-form-validators";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private router: Router) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

}
