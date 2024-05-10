import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

export const FIELD_ERROR_PROVIDER = {
    provide: TUI_VALIDATION_ERRORS,
    useValue: {
        required: 'Обязательное поле',
        emailExists: 'Такой email занят',
        loginExists: 'Такой логин занят',
        passwordDoesNotMatch: 'Пароли не совпадают'
    }
}