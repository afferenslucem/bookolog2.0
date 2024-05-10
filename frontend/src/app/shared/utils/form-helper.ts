import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

declare type ErrorName = 'required' | 'shouldBeEven';
declare type ValidationError = Partial<Record<ErrorName, any>>;
declare type ValidationErrorMap = Record<ErrorName, ValidationError>;

const ERROR_MAP: ValidationErrorMap = {
    ['required']: { required: true },
    ['shouldBeEven']: { shouldBeEven: true },
};

export class FormHelper {
    public static addError(control: AbstractControl, errorName: ErrorName): void {
        const patch: ValidationError = ERROR_MAP[errorName];

        control.setErrors(
            {
                ...control.errors,
                ...patch,
            },
            { emitEvent: true },
        );
    }

    public static addCustomError(control: AbstractControl, patch: ValidationErrors): void {
        control.setErrors(
            {
                ...control.errors,
                ...patch,
            },
            { emitEvent: true },
        );
    }

    public static removeError(control: AbstractControl, errorName: ErrorName | string): void {
        const errors = {
            ...control.errors,
        };

        delete errors[errorName];

        control.setErrors(FormHelper.isErrorsEmpty(errors) ? null : errors, { emitEvent: true });
    }

    public static isErrorsEmpty(errors: ValidationErrors): boolean {
        return !Object.keys(errors).length;
    }

    public static triggerFakeValueChanges(form: FormGroup): void {
        for (const control of Object.values(form.controls)) {
            control.updateValueAndValidity({ onlySelf: true });
        }

        form.markAllAsTouched();
    }
}
