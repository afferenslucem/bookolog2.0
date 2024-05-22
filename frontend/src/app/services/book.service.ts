import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { Book, BookStatus } from '../domain/book';
import { BookSearchOptions } from '../domain/book-search-options';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    constructor(private httpClient: HttpClient) {
    }

    public searchBooks(options: BookSearchOptions): Observable<Book[]> {
        return this.httpClient.post<Book[]>('/book/search', options).pipe(
            map(books => plainToInstance(Book, books)),
        );
    }

    public loadBook(id: number): Observable<Book> {
        return this.httpClient.get<Book>(`/book/${id}`).pipe(
            map(book => plainToInstance(Book, book)),
        );
    }

    public deleteBook(id: number): Observable<void> {
        return this.httpClient.delete<void>(`/book/${id}`);
    }

    public saveBook(book: Book): Observable<Book> {
        const data = instanceToPlain(book) as Book;

        const request$ = data.id ? this.sendUpdateBook(data) : this.sendCreateBook(data)

        return request$.pipe(
            map(response => plainToInstance(Book, response))
        )
    }

    public loadBooksForStatus(status: BookStatus): Observable<Book[]> {
        return this.httpClient.get<Book[]>('/book').pipe(map(books => books.filter(book => book.status === status)));
    }

    public loadBooksForAuthor(author: string): Observable<Book[]> {
        return this.loadBooksForStatus(BookStatus.DONE).pipe(
            map(books => books.filter(item => item.authors?.includes(author))),
        );
    }

    public loadBooksForYear(year: number): Observable<Book[]> {
        return this.loadBooksForStatus(BookStatus.DONE).pipe(
            map(books => books.filter(item => item.finishDate?.year === year)),
        );
    }

    public loadBooksForSeries(series: string): Observable<Book[]> {
        return this.searchBooks({}).pipe(
            map(books => books.filter(item => item.series === series)),
        );
    }

    private sendCreateBook(book: Book): Observable<Book> {
        return this.httpClient.post<Book>('/book', book);
    }

    private sendUpdateBook(book: Book): Observable<Book> {
        return this.httpClient.put<Book>(`/book/${book.id}`, book);
    }
}
