import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { UserComponent } from './user/user.component';
import {DialogModule} from "primeng/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {FileUploadModule} from "primeng/fileupload";
import {DropdownModule} from "primeng/dropdown";
import {TagModule} from "primeng/tag";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";

@NgModule({
    declarations: [
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
    ],
    providers: [
    ]
})
export class PagesModule { }
