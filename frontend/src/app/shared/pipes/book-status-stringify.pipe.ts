import { Pipe, PipeTransform } from '@angular/core';
import { BookStatus } from '../../domain/book';

@Pipe({
    name: 'bookStatusStringify',
    standalone: true,
})
export class BookStatusStringifyPipe implements PipeTransform {

    transform(status: BookStatus): unknown {
        switch (status) {
            case BookStatus.TO_READ: {
                return 'К прочтению';
            }
            case BookStatus.DONE: {
                return 'Прочтена';
            }
            case BookStatus.IN_PROGRESS: {
                return 'Читаю';
            }
        }
    }

}
