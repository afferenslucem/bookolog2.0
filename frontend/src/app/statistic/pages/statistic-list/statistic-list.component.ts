import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { EmptyListComponent } from '../../../shared/components/empty-list-icon/empty-list.component';
import { FirstLetterUpPipe } from '../../../shared/pipes/first-letter-up.pipe';
import { StatisticItem } from '../../domain/statistic-item';
import { StatisticProvider } from '../../services/providers/statistic-providers/statistic-provider.service';

@Component({
    selector: 'app-statistic-list',
    standalone: true,
    imports: [
        TuiButtonModule,
        RouterLink,
        TuiLoaderModule,
        TitleCasePipe,
        EmptyListComponent,
        FirstLetterUpPipe,
    ],
    templateUrl: './statistic-list.component.html',
    styleUrl: './statistic-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StatisticListComponent {
    public items = signal<StatisticItem[] | null>(null);

    public constructor(private statisticProvider: StatisticProvider) {
        this.statisticProvider.load().subscribe(items => this.items.set(items));
    }
}
