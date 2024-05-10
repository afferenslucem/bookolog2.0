import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import LoginPageComponent from './login-page.component';

describe('LoginPageComponent', () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;
    let el: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginPageComponent, HttpClientModule],
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoginPageComponent);
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
