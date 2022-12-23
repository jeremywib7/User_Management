import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from "./user.component";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {UserRoutingModule} from "./user-routing.module";
import {MessageService} from "primeng/api";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {DataService} from "../../service/data.service";
import {AutoFocusModule} from "primeng/autofocus";
import {FormService} from "../../service/form.service";
import {UserService} from "../../service/user.service";

@NgModule({
  declarations: [UserComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        ToolbarModule,
        TableModule,
        TagModule,
        DialogModule,
        FileUploadModule,
        ReactiveFormsModule,
        DropdownModule,
        RippleModule,
        InputTextModule,
        AutoFocusModule
    ],
    providers: [
        MessageService,
        UserService,
        FormService,
        DataService
    ]
})
export class UserModule { }

