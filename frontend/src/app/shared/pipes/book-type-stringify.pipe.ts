import { Pipe, PipeTransform } from '@angular/core';
import { BookType } from '../../domain/book';

@Pipe({
    name: 'bookTypeStringify',
    standalone: true,
})
export class BookTypeStringifyPipe implements PipeTransform {

    transform(status: BookType): unknown {
        switch (status) {
            case BookType.AUDIO: {
                return 'Аудиокнига';
            }
            case BookType.PAPER: {
                return 'Бумажная книга';
            }
            case BookType.ELECTRONIC: {
                return 'Электронная книга';
            }
        }
    }

}
