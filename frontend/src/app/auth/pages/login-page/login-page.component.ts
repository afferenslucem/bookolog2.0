import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { AuthService } from '../../../services/auth.service';
import { PagePadding, ViewContainer } from '../../../shared';
import { FormLayoutModule } from '../../../shared/form-layout/form-layout.module';

interface LoginForm {
    login: FormControl<string>;
    password: FormControl<string>;
}

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        AsyncPipe,
        TuiInputPasswordModule,
        TuiButtonModule,
        FormLayoutModule,
    ],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    hostDirectives: [PagePadding, ViewContainer],
})
export default class LoginPageComponent {
    public form = new FormGroup<LoginForm>({
        login: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
        password: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    });

    public constructor(private authService: AuthService, private router: Router) {
    }

    public submit(): void {
        this.authService.signIn(this.form.getRawValue()).subscribe(() => {
            this.router.navigate(['books']);
        });
    }
}
