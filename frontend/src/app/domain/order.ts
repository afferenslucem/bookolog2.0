import { Book } from './book';

export class Order<T> {
    public fieldName: keyof T = null!;
    public direction: 'asc' | 'desc' = null!;
}