import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BookType } from '../../domain/book';

@Pipe({
    name: 'bookTypeStringify',
    standalone: true,
})
export class BookTypeStringifyPipe implements PipeTransform {
    public constructor(private translateService: TranslateService) {
    }


    transform(status: BookType): unknown {
        const key = Object.entries(BookType).find(pair => pair[1] === status)?.[0];

        return this.translateService.instant(`ENUMS.BOOK_TYPE.${key}`);
    }

}
