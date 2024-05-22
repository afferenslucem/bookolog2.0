import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'statusDescription',
    standalone: true,
})
export class StatusDescriptionPipe implements PipeTransform {
    public constructor(private translateService: TranslateService) {
    }

    public transform(value: string): string {
        return this.translateService.instant(`ERROR_PAGES.${value}.DESCRIPTION`);
    }
}
