import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookStatus } from '../../domain/book';
import { BookListProvider } from '../../shared/services/book-list-provider.service';
import { BookService } from '../../services/book.service';

@Injectable({
  providedIn: 'root'
})
export class DoneBooksListProvider extends BookListProvider {

  public constructor(private bookService: BookService) {
    super();
  }

  public override getBooks(): Observable<Book[]> {
    return this.bookService.searchBooks({ status: BookStatus.DONE });
  }
}
