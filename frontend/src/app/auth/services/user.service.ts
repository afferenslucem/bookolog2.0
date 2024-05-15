import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { User } from '../../domain/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {
    }

    public isSignedIn(): Observable<boolean> {
        return this.http.get<User>('/auth/me').pipe(
            map(() => true),
        );
    }
}