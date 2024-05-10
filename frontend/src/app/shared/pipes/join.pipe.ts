import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join',
    standalone: true,
})
export class JoinPipe implements PipeTransform {
    public transform(value: any[] | nil, separator = ', '): string | nil {
        if (!value) {
          return null;
        }

        return value.map(item => item.toString()).join(separator);
    }
}
