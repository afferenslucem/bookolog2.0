import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[pagePadding]',
    standalone: true,
})
export class PagePadding {
    @Input()
    @HostBinding('style.padding')
    public padding: string = '1rem';

    constructor() {
    }
}
