import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[viewContainer]',
  standalone: true
})
export class ViewContainer {
  @HostBinding('style.display')
  public display: string = 'block';

  @HostBinding('style.height')
  public height: string = '100%';

  @HostBinding('style.width')
  public width: string = '100%';

  @HostBinding('style.overflow-y')
  public overflowY: string = 'auto';

  constructor() { }
}
