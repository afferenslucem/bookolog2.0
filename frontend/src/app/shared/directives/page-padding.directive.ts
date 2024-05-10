import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[pagePadding]',
    standalone: true,
})
export class PagePadding {
    @Input()
    @HostBinding('style.padding-left')
    public paddingLeft: string = '1rem';

    @HostBinding('style.padding-right')
    public paddingRight: string = '1rem';

    constructor() {
    }
}
