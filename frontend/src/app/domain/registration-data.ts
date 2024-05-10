import { Exclude } from 'class-transformer';

export class RegistrationData {
    public login: string = null!;

    public email: string = null!;

    public password: string = null!;

    @Exclude()
    public passwordConfirmation: string = null!;
}