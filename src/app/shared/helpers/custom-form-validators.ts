import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

export class CustomValidators extends Validators {

    static confirmPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const password = control.get('password').value;
        const confirmPassword = control.get('confirmPassword').value;
        if (password == null || confirmPassword == null) {
            return null;
        }

        return password === confirmPassword ? null : {invalidConfirm: true};
    };

    static dateValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
        if (control.value) {
            return new Date(control.value).toString() == null ? {invalidDate: true} : null;
        }
    };

}
