import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TuiDay } from '@taiga-ui/cdk';
import { of, Subject } from 'rxjs';
import { BookStatus, BookType } from '../../../domain/book';
import BookFormComponent from './book-form.component';

describe('BookFormComponent', () => {
    let sut: BookFormComponent;
    let fixture: ComponentFixture<BookFormComponent>;
    let el: HTMLElement;

    let http: HttpClient;
    let router: Router;

    let params$ = new Subject<Params>();

    let activatedRoute: ActivatedRoute;

    beforeEach(async () => {
        activatedRoute = {
            params: params$,
        } as any;

        await TestBed.configureTestingModule({
            imports: [BookFormComponent, HttpClientTestingModule, RouterTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: activatedRoute,
                },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(BookFormComponent);

        sut = fixture.componentInstance;
        fixture.detectChanges();

        http = TestBed.inject(HttpClient);
        router = TestBed.inject(Router);

        el = fixture.nativeElement;
    });

    it('should create', () => {
        expect(sut).toBeTruthy();
    });

    describe('start date', () => {
        it('renders start date row for in progress status value', () => {
            sut.form.controls.status.setValue(BookStatus.IN_PROGRESS);

            fixture.detectChanges();

            const row = el.querySelector('[data-testid="start-date-row"]');

            expect(row).toBeTruthy();
        });

        it('renders start date row for done status value', () => {
            sut.form.controls.status.setValue(BookStatus.DONE);

            fixture.detectChanges();

            const row = el.querySelector('[data-testid="start-date-row"]');

            expect(row).toBeTruthy();
        });

        it('hides start date row for to read status value', () => {
            sut.form.controls.status.setValue(BookStatus.TO_READ);

            fixture.detectChanges();

            const row = el.querySelector('[data-testid="start-date-row"]');

            expect(row).toBeFalsy();
        });

        it('presets start date for in progress status', () => {
            sut.form.controls.status.setValue(BookStatus.IN_PROGRESS);

            expect(sut.form.controls.startDate.value).toEqual(TuiDay.fromLocalNativeDate(new Date(Date.now())));
        });
    });

    describe('end date', () => {
        it('hides end date row for in progress status value', () => {
            sut.form.controls.status.setValue(BookStatus.IN_PROGRESS);

            fixture.detectChanges();

            const row = el.querySelector('[data-testid="end-date-row"]');

            expect(row).toBeFalsy();
        });

        it('renders end date row for done status value', () => {
            sut.form.controls.status.setValue(BookStatus.DONE);

            fixture.detectChanges();

            const row = el.querySelector('[data-testid="end-date-row"]');

            expect(row).toBeTruthy();
        });

        it('hides end date row for to read status value', () => {
            sut.form.controls.status.setValue(BookStatus.TO_READ);

            fixture.detectChanges();

            const row = el.querySelector('[data-testid="end-date-row"]');

            expect(row).toBeFalsy();
        });

        it('presets finish date for in progress status', () => {
            sut.form.controls.status.setValue(BookStatus.DONE);

            expect(sut.form.controls.finishDate.value).toEqual(TuiDay.fromLocalNativeDate(new Date(Date.now())));
        });
    });

    describe('integrations', () => {
        it('sends request', () => {
            sut.form.controls.tags.push(new FormControl(), { emitEvent: false });
            sut.form.controls.tags.push(new FormControl(), { emitEvent: false });

            sut.form.controls.authors.push(new FormControl(), { emitEvent: false });
            sut.form.controls.authors.push(new FormControl(), { emitEvent: false });

            sut.form.patchValue({
                name: 'Book name',
                note: 'Book note',
                authors: ['first author', 'second author', ''],
                genre: 'Book genre',
                tags: ['first tag', 'second tag', null!],
                status: BookStatus.IN_PROGRESS,
                series: 'book series',
                seriesNumber: 1,
                type: BookType.PAPER,
                startDate: {
                    year: 2017,
                },
                finishDate: {
                    year: 2018,
                    month: 4,
                },
            }, { onlySelf: true });

            const saveSpy = spyOn(http, 'post').and.returnValue(of({ status: BookStatus.IN_PROGRESS }));
            const navigateSpy = spyOn(router, 'navigate');

            sut.save();

            expect(saveSpy).toHaveBeenCalledWith('/book', {
                id: undefined,
                name: 'Book name',
                authors: ['First Author', 'Second Author'],
                tags: ['First tag', 'Second tag'],
                status: BookStatus.IN_PROGRESS,
                type: BookType.PAPER,
                note: 'Book note',
                genre: 'Book genre',
                series: 'Book series',
                seriesNumber: 1,
                seriesEnabled: false,
                startDate: new Date(2017, 0, 1),
                finishDate: new Date(2018, 4, 1),
            });
        });
    });

    it('renders series row for enabled series', () => {
        sut.form.controls.seriesEnabled.setValue(true);

        fixture.detectChanges();

        const row = el.querySelector('[data-testid="series-row"]');

        expect(row).toBeTruthy();
    });

    it('hides series row for enabled series', () => {
        sut.form.controls.seriesEnabled.setValue(false);

        fixture.detectChanges();

        const row = el.querySelector('[data-testid="series-row"]');

        expect(row).toBeFalsy();
    });

    it('disables button on save', () => {
        sut.form.patchValue({
            name: 'Book name',
            status: BookStatus.DONE,
            type: BookType.PAPER,
        })

        fixture.detectChanges();

        const button = el.querySelector<HTMLButtonElement>('[data-testid="save-button"]')!;
        expect(button.classList.contains('_disabled')).toBeFalsy();

        button.click();
        fixture.detectChanges();

        expect(button.classList.contains('_disabled')).toBeTruthy();
    })

    describe('redirects', () => {
        it('redirects to in-progress', () => {
            sut.form.patchValue({
                name: 'Book name',
                status: BookStatus.IN_PROGRESS,
                type: BookType.PAPER,
            });

            fixture.detectChanges();

            spyOn(http, 'post').and.returnValue(of({ status: BookStatus.IN_PROGRESS }));

            const redirectSpy = spyOn(router, 'navigate')

            el.querySelector<HTMLButtonElement>('[data-testid="save-button"]')!.click();

            expect(redirectSpy).toHaveBeenCalledOnceWith(['/books/in-progress'])
        })

        it('redirects to done', () => {
            sut.form.patchValue({
                name: 'Book name',
                status: BookStatus.DONE,
                type: BookType.PAPER,
            });

            fixture.detectChanges();

            spyOn(http, 'post').and.returnValue(of({ status: BookStatus.DONE }));

            const redirectSpy = spyOn(router, 'navigate')

            el.querySelector<HTMLButtonElement>('[data-testid="save-button"]')!.click();

            expect(redirectSpy).toHaveBeenCalledOnceWith(['/books/done'])
        })

        it('redirects to to-read', () => {
            sut.form.patchValue({
                name: 'Book name',
                status: BookStatus.TO_READ,
                type: BookType.PAPER,
            });

            fixture.detectChanges();

            spyOn(http, 'post').and.returnValue(of({ status: BookStatus.TO_READ }));

            const redirectSpy = spyOn(router, 'navigate')

            el.querySelector<HTMLButtonElement>('[data-testid="save-button"]')!.click();

            expect(redirectSpy).toHaveBeenCalledOnceWith(['/books/to-read'])
        })
    })
});
