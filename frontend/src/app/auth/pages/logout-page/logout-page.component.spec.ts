import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';

import LogoutPageComponent from './logout-page.component';

describe('LoginPageComponent', () => {
    let component: LogoutPageComponent;
    let fixture: ComponentFixture<LogoutPageComponent>;
    let el: HTMLElement;

    let params$ = new Subject<Params>();

    let activatedRoute: ActivatedRoute;

    beforeEach(async () => {
        activatedRoute = {
            params: params$,
        } as any;

        await TestBed.configureTestingModule({
            imports: [LogoutPageComponent, HttpClientModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: activatedRoute
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LogoutPageComponent);
        component = fixture.componentInstance;
        el = fixture.nativeElement;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('disables button for invalid form', () => {
        component.form.patchValue({});

        fixture.detectChanges();

        const loginButton = el.querySelector('[data-testid="login-button"]')!;

        expect(loginButton.hasAttribute('disabled')).toBe(true);
    });

    it('enables button for invalid form', () => {
        component.form.patchValue({
            login: 'hrodvitnir',
            password: 'password',
        });

        fixture.detectChanges();

        const loginButton = el.querySelector('[data-testid="login-button"]')!;

        expect(loginButton.hasAttribute('disabled')).toBe(false);
    });
});
