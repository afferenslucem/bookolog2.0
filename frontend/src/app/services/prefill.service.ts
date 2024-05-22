import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PrefillService {
    constructor(private httpClient: HttpClient) {
    }

    public getAuthors(): Observable<string[]> {
        return this.httpClient.get<string[]>(`/prefill/authors`);
    }

    public getTags(): Observable<string[]> {
        return this.httpClient.get<string[]>(`/prefill/tags`);
    }

    public getGenres(): Observable<string[]> {
        return this.httpClient.get<string[]>(`/prefill/genres`);
    }

    public getSeries(): Observable<string[]> {
        return this.httpClient.get<string[]>(`/prefill/series`);
    }
}
