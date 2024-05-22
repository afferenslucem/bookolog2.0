import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TuiSheetDialogModule } from '@taiga-ui/addon-mobile';
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { environment } from '../environments/environment';
import { LayoutModule } from './layout/layout.module';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiSheetDialogModule, LayoutModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent implements OnInit {
    title = 'bookolog';

    constructor(private translateService: TranslateService) {
    }

    public ngOnInit(): void {
        this.translateService.use(environment.defaultLocale);
    }
}
