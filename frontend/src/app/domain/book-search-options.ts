import { BookStatus } from './book';

export class BookSearchOptions {
    public pattern?: string;
    public tag?: string;
    public author?: string;
    public series?: string;
    public genre?: string;
    public status?: BookStatus;
    public year?: number;
}