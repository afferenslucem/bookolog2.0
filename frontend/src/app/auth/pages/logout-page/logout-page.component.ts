import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PagePadding, ViewContainer } from '../../../shared';

@Component({
    selector: 'logout-page',
    standalone: true,
    imports: [],
    templateUrl: './logout-page.component.html',
    styleUrl: './logout-page.component.scss',
    hostDirectives: [PagePadding, ViewContainer],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LogoutPageComponent implements OnInit {
    public constructor(private authService: AuthService, private router: Router) {
    }

    public ngOnInit(): void {
        this.authService.signOut().subscribe(() => this.router.navigate(['/login']),)
    }
}
