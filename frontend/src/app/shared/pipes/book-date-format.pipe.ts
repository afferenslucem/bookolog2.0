import { Pipe, PipeTransform } from '@angular/core';
import { ReadDate } from '../../domain/book';

@Pipe({
    name: 'bookDateFormat',
    standalone: true,
})
export class BookDateFormatPipe implements PipeTransform {
    public transform(value: ReadDate | nil, ...args: unknown[]): string {
        const rdMonth = (value?.month ?? 0) + 1;

        const year = value?.year.toString();
        const month = rdMonth.toString().padStart(2, '0') ?? '01';
        const day = value?.day?.toString().padStart(2, '0') ?? '01';

        return value ? `${year}.${month}.${day}` : '...';
    }
}
