import { Pipe, PipeTransform } from '@angular/core';
import { BookStatus } from '../../domain/book';

@Pipe({
    name: 'firstLetterUp',
    standalone: true,
})
export class FirstLetterUpPipe implements PipeTransform {
    transform(line: string): string | nil {
        if (!line) {
            return line;
        }

        return  line[0].toUpperCase() + line.slice(1)
    }
}
