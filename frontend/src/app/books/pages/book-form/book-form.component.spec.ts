import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { TuiDay } from '@taiga-ui/cdk';
import { Subject } from 'rxjs';
import { BookStatus } from '../../../domain/book';
import BookFormComponent from './book-form.component';

describe('BookFormComponent', () => {
    let component: BookFormComponent;
    let fixture: ComponentFixture<BookFormComponent>;
    let el: HTMLElement;

    let params$ = new Subject<Params>();

    let activatedRoute: ActivatedRoute;

    beforeEach(async () => {
        activatedRoute = {
            params: params$,
        } as any;

        await TestBed.configureTestingModule({
            imports: [BookFormComponent, HttpClientTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: activatedRoute,
                },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(BookFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        el = fixture.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('renders start date row for in progress status value', () => {
        component.form.controls.status.setValue(BookStatus.IN_PROGRESS);

        fixture.detectChanges();

        const row = el.querySelector('[data-testid="start-date-row"]')

        expect(row).toBeTruthy();
    });

    it('renders start date row for done status value', () => {
        component.form.controls.status.setValue(BookStatus.DONE);

        fixture.detectChanges();

        const row = el.querySelector('[data-testid="start-date-row"]')

        expect(row).toBeTruthy();
    });

    it('hides start date row for to read status value', () => {
        component.form.controls.status.setValue(BookStatus.TO_READ);

        fixture.detectChanges();

        const row = el.querySelector('[data-testid="start-date-row"]')

        expect(row).toBeFalsy();
    });

    it('hides end date row for in progress status value', () => {
        component.form.controls.status.setValue(BookStatus.IN_PROGRESS);

        fixture.detectChanges();

        const row = el.querySelector('[data-testid="end-date-row"]')

        expect(row).toBeFalsy();
    });

    it('renders end date row for done status value', () => {
        component.form.controls.status.setValue(BookStatus.DONE);

        fixture.detectChanges();

        const row = el.querySelector('[data-testid="end-date-row"]')

        expect(row).toBeTruthy();
    });

    it('hides end date row for to read status value', () => {
        component.form.controls.status.setValue(BookStatus.TO_READ);

        fixture.detectChanges();

        const row = el.querySelector('[data-testid="end-date-row"]')

        expect(row).toBeFalsy();
    });

    it('renders series row for enabled series', () => {
        component.form.controls.seriesEnabled.setValue(true);

        fixture.detectChanges();

        const row = el.querySelector('[data-testid="series-row"]')

        expect(row).toBeTruthy();
    });

    it('hides series row for enabled series', () => {
        component.form.controls.seriesEnabled.setValue(false);

        fixture.detectChanges();

        const row = el.querySelector('[data-testid="series-row"]')

        expect(row).toBeFalsy();
    });

    it('presets start date for in progress status', () => {
        component.form.controls.status.setValue(BookStatus.IN_PROGRESS);

        expect(component.form.controls.startDate.value).toEqual(TuiDay.fromLocalNativeDate(new Date(Date.now())));
    });

    it('presets finish date for in progress status', () => {
        component.form.controls.status.setValue(BookStatus.DONE);

        expect(component.form.controls.finishDate.value).toEqual(TuiDay.fromLocalNativeDate(new Date(Date.now())));
    });
});
