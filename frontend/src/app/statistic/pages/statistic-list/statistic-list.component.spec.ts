import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TuiLoaderModule } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { FirstLetterUpPipe } from '../../../shared/pipes/first-letter-up.pipe';
import { StatisticItem } from '../../domain/statistic-item';
import { StatisticProvider } from '../../services/providers/statistic-providers/statistic-provider.service';
import StatisticListComponent from './statistic-list.component';

describe('StatisticListComponent', () => {
    let sut: StatisticListComponent;
    let fixture: ComponentFixture<StatisticListComponent>;
    let el: HTMLElement;

    const load$ = new Subject<StatisticItem[]>();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StatisticListComponent, RouterTestingModule, TuiLoaderModule, FirstLetterUpPipe],
            providers: [
                {
                    provide: StatisticProvider,
                    useValue: {
                        loading: jasmine.createSpy().and.returnValue(false),
                        load: jasmine.createSpy().and.returnValue(load$),
                    },
                },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(StatisticListComponent);

        sut = fixture.componentInstance;
        fixture.detectChanges();

        el = fixture.nativeElement;
    });

    it('should create', () => {
        expect(sut).toBeTruthy();
    });

    it('renders list', () => {
        load$.next([
            {
                name: 'first',
                count: 10
            },
            {
                name: 'second',
                count: 9
            },
            {
                name: '',
                count: 8
            }
        ])

        fixture.detectChanges();

        const items = el.querySelectorAll('a');
        expect(items.length).toBe(3);

        const firstLinkText = items.item(0).textContent;
        expect(firstLinkText!.trim()).toBe('First  10');

        const thirdLinkText = items.item(2).textContent;
        expect(thirdLinkText!.trim()).toBe('Не указано  8');
    });

    it('does not render placeholder', () => {
        fixture.detectChanges();

        const items = el.querySelectorAll('a');
        expect(items.length).toBe(0);

        const placeholder = el.querySelector('[data-testid="empty-list-placeholder"]');
        expect(placeholder).toBeFalsy();
    });

    it('renders placeholder', () => {
        load$.next([]);
        fixture.detectChanges();

        const items = el.querySelectorAll('a');
        expect(items.length).toBe(0);

        const placeholder = el.querySelector('[data-testid="empty-list-placeholder"]');
        expect(placeholder).toBeTruthy();
    });
});
