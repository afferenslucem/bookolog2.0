import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private _search$ = new Subject<string | null>();
    public search$: Observable<string | null>;

    constructor() {
        this.search$ = this._search$.asObservable();
    }

    public setValue(value: string | null): void {
        this._search$.next(value);
    }
}
