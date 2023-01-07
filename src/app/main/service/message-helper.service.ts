import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class MessageHelperService {

    constructor(
        private messageService: MessageService
    ) {
    }

    public showToast(severity: string, summary: string, detail: string) {
        this.messageService.add({
            severity: severity, //'success'
            summary: summary, //'Success'
            detail: detail //'User updated successfully'
        });
    }

}
