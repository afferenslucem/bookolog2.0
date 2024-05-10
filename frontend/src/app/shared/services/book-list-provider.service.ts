import { Observable } from 'rxjs';
import { Book } from '../../domain/book';

export abstract class BookListProvider {
    constructor() {
    }

    public abstract getBooks(): Observable<Book[]>;
}
