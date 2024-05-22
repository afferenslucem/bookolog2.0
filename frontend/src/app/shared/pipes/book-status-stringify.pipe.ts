import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BookStatus } from '../../domain/book';

@Pipe({
    name: 'bookStatusStringify',
    standalone: true,
})
export class BookStatusStringifyPipe implements PipeTransform {
    public constructor(private translateService: TranslateService) {
    }

    transform(status: BookStatus): string {
        const key = Object.entries(BookStatus).find(pair => pair[1] === status)?.[0];

        return this.translateService.instant(`ENUMS.BOOK_STATUS.${key}`);
    }
}
