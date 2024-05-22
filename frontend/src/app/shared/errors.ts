import { TranslateService } from '@ngx-translate/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

function errorsFactory(translator: TranslateService): Record<string, string> {
    return {
        required: translator.instant('ERRORS.REQUIRED'),
        emailExists: translator.instant('ERRORS.EMAIL_EXISTS'),
        loginExists: translator.instant('ERRORS.LOGIN_EXISTS'),
        passwordDoesNotMatch: translator.instant('ERRORS.PASSWORD_DOES_NOT_MATCH'),
    };
}

export const FIELD_ERROR_PROVIDER = {
    provide: TUI_VALIDATION_ERRORS,
    useFactory: errorsFactory,
    deps: [TranslateService],
}