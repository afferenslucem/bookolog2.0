import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { map, Observable, take } from 'rxjs';
import { RegistrationData } from '../../../domain/registration-data';
import { AuthService } from '../../../services/auth.service';
import { FormHelper, PagePadding, ViewContainer } from '../../../shared';
import { FormLayoutModule } from '../../../shared/form-layout/form-layout.module';

interface RegistrationForm {
    login: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    passwordConfirmation: FormControl<string>;
}

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [
        TuiInputModule,
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiTextfieldControllerModule,
        TuiInputPasswordModule,
        FormLayoutModule,
        TuiButtonModule,
        TranslateModule,
    ],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss',
    hostDirectives: [PagePadding, ViewContainer],
})
export default class RegistrationComponent {
    public registrationForm = new FormGroup<RegistrationForm>({
        login: new FormControl<string>('', {
            validators: Validators.required,
            nonNullable: true,
            asyncValidators: control => this.isLoginExistsValidator(control),
        }),
        email: new FormControl<string>('', {
            validators: [Validators.required, Validators.email],
            nonNullable: true,
            asyncValidators: control => this.isEmailExistsValidator(control),
        }),
        password: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
        passwordConfirmation: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    }, { validators: this.passwordsShouldMatch });

    public constructor(private authService: AuthService, private router: Router) {
    }

    public register(): void {
        if (this.registrationForm.valid) {
            this.authService.register(this.registrationForm.value as RegistrationData).subscribe(() => this.router.navigate(['login']));
        }
    }

    private isLoginExistsValidator(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.authService.isLoginExists(control.value).pipe(
            map(result => result ? { loginExists: true } : null),
            take(1),
        );
    }

    private isEmailExistsValidator(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.authService.isEmailExists(control.value).pipe(
            map(result => result ? { emailExists: true } : null),
            take(1),
        );
    }

    private passwordsShouldMatch(group: AbstractControl): ValidationErrors | null {
        const typed = group as FormGroup<RegistrationForm>;

        if (typed.controls.password?.value === typed.controls.passwordConfirmation?.value) {
            FormHelper.removeError(typed.controls.passwordConfirmation, 'passwordDoesNotMatch');
        } else {
            FormHelper.addCustomError(typed.controls.passwordConfirmation, { 'passwordDoesNotMatch': true });
        }

        return null;
    }
}
