import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class FormService {

    constructor() {
    }

    public validateFormFields(formGroup: FormGroup, specialElement?: string[]): void {
        for (const key of Object.keys(formGroup.controls)) {
            if (formGroup.controls[key].invalid) {
                if(specialElement) {
                    specialElement.forEach((value, index, array) => {
                        if (key === value) {
                            return (document.getElementById(value) as HTMLFormElement).focus();
                        }
                    });
                }
                formGroup.get(key).markAsDirty();
                let invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
                if ((invalidFields).length != 0) {
                    invalidFields[1].focus();
                    break;
                }
            }
        }
    }
}
