import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiSheetDialogModule } from '@taiga-ui/addon-mobile';
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { LayoutModule } from './layout/layout.module';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiSheetDialogModule, LayoutModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
    title = 'bookolog';
}
