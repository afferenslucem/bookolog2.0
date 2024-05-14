import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'empty-list',
  standalone: true,
  imports: [],
  templateUrl: './empty-list.component.html',
  styleUrl: './empty-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyListComponent {
  public get iconUrl(): string {
    const id = (Math.random() * 17) | 0;

    return `assets/images/empty-list-icons/${id}.svg`;
  }
}
