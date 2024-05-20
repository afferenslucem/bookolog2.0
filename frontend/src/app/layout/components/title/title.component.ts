import { ChangeDetectionStrategy, Component, HostBinding, Signal, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiSheetDialogOptions } from '@taiga-ui/addon-mobile';
import { tuiIconMenuLarge, tuiIconSearch } from '@taiga-ui/icons';
import { SearchService } from '../../services/search.service';
import { TitleService } from '../../services/title.service';

export interface TitleNode {
    name?: string;
    hidden?: boolean;
}

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrl: './title.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
    public open = false;

    public readonly options: Partial<TuiSheetDialogOptions> = {
        label: 'Bookolog',
        closeable: true,
    };

    public get title(): Signal<TitleNode> {
        return this.titleService.title;
    }

    public get searchEnabled(): Signal<boolean> {
        return this.titleService.searchEnabled;
    }

    public searchOpened = signal<boolean>(false);

    public searchControl = new FormControl<string>('');

    public get searchHasContent(): boolean {
        return !!this.searchControl.value;
    }

    @HostBinding('style.display')
    public get isHidden(): 'none' | nil {
        return this.title().hidden ? 'none' : null;
    }

    public readonly tuiIconMenuLarge = tuiIconMenuLarge;

    public constructor(private titleService: TitleService, private searchService: SearchService) {
        this.searchControl.valueChanges.subscribe(value => this.searchService.setValue(value));
    }

    public closeSearch(): void {
        this.searchOpened.set(false);
    }

    public toggleSearch(): void {
        this.searchOpened.set(!this.searchOpened());
    }

    protected readonly tuiIconSearch = tuiIconSearch;
}
