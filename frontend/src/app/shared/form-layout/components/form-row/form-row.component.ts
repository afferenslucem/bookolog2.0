import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'form-row',
  templateUrl: './form-row.component.html',
  styleUrl: './form-row.component.scss'
})
export class FormRowComponent {
  @HostBinding('class.flex')
  @Input('flex')
  public flex: string | boolean | nil = null!;
}
