import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayoutComponent {
  public get isTitleHidden(): boolean | nil {
    return this.titleService.title().hidden;
  }

  public constructor(private titleService: TitleService) {
  }
}
