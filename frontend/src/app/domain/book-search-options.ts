import { Book, BookStatus } from './book';
import { Order } from './order';

export class BookSearchOptions {
    public pattern?: string | null;
    public tag?: string;
    public author?: string;
    public series?: string;
    public genre?: string;
    public status?: BookStatus;
    public year?: number;

    public order?: Order<Book>
}