import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TuiButtonModule, TuiErrorModule, TuiLinkModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
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
        TuiLinkModule,
        RouterLink,
    ],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    hostDirectives: [PagePadding, ViewContainer],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPageComponent {
    public form = new FormGroup<LoginForm>({
        login: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
        password: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    });

    public unauthorized = signal(false);

    public constructor(private authService: AuthService, private router: Router) {
    }

    public submit(): void {
        this.unauthorized.set(false);

        this.authService.signIn(this.form.getRawValue()).subscribe({
            next: () => {
                this.router.navigate(['books']);
            },
            error: (err: HttpErrorResponse) => this.unauthorized.set(err.status === 401)
        });
    }
}
