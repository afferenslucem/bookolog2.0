import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusDescriptionPipe } from '../../pipes/status-description.pipe';

@Component({
    selector: 'app-error-page',
    standalone: true,
    imports: [
        StatusDescriptionPipe,
    ],
    templateUrl: './error-page.component.html',
    styleUrl: './error-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ErrorPageComponent {
    public get code(): string {
        return this.activatedRoute.snapshot.params['code'];
    }

    public constructor(private activatedRoute: ActivatedRoute) {
    }
}
