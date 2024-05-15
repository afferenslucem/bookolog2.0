import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { LoginData } from '../domain/login-data';
import { RegistrationData } from '../domain/registration-data';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private httpClient: HttpClient) {
    }

    public isLoginExists(login: string): Observable<boolean> {
        return this.httpClient.get<boolean>(`/auth/isLoginExists/${login}`);
    }

    public isEmailExists(email: string): Observable<boolean> {
        return this.httpClient.get<boolean>(`/auth/isEmailExists/${email}`);
    }

    public register(registrationData: RegistrationData): Observable<void> {
        const data = classToPlain(Object.assign(new RegistrationData(), registrationData));

        return this.httpClient.post(`/Auth/Register`, data).pipe(map(() => undefined));
    }

    public signIn(loginData: LoginData): Observable<void> {
        return this.httpClient.post(`/Auth/SignIn`, loginData).pipe(map(() => undefined));
    }

    public signOut(): Observable<void> {
        return this.httpClient.get<void>('/auth/logout');
    }
}
