import { ChangeDetectionStrategy, Component, effect, HostBinding, Signal, signal } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { TuiSheetDialogOptions, TuiSheetDialogService } from '@taiga-ui/addon-mobile';
import { tuiIconMenuLarge } from '@taiga-ui/icons';
import { filter } from 'rxjs';
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

    @HostBinding('style.display')
    public get isHidden(): 'none' | nil {
        return this.title().hidden ? 'none' : null;
    }

    public readonly tuiIconMenuLarge = tuiIconMenuLarge;

    public constructor(private titleService: TitleService, private sheets: TuiSheetDialogService) {
    }
}
