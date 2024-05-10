import { TransformFnParams } from 'class-transformer';
import { ReadDate } from '../../domain/book';
import { titleCase, toNativeDate, toReadDate } from './transformations';

describe('transformations', () => {
    describe('toReadDate', () => {
        it('returns null', () => {
            const result = toReadDate({ value: null } as TransformFnParams);

            expect(result).toBe(null);
        })

        it('returns date from string', () => {
            const result = toReadDate({ value: '2024-03-07' } as TransformFnParams);

            expect(result).toEqual(jasmine.objectContaining({
                year: 2024,
                month: 2,
                day: 7
            } as ReadDate));
        })
    })

    describe('toNativeDate', () => {
        it('returns null', () => {
            const result = toNativeDate({ value: null } as TransformFnParams);

            expect(result).toBe(null);
        })

        it('returns date from only year', () => {
            const result = toNativeDate({ value: { year: 2024 } as ReadDate } as TransformFnParams);

            expect(result!.getFullYear()).toEqual(2024);
            expect(result!.getMonth()).toEqual(1);
            expect(result!.getDate()).toEqual(1);
        })

        it('returns date without day', () => {
            const result = toNativeDate({ value: { year: 2024, month: 5 } as ReadDate } as TransformFnParams);

            expect(result!.getFullYear()).toEqual(2024);
            expect(result!.getMonth()).toEqual(5);
            expect(result!.getDate()).toEqual(1);
        })

        it('returns date', () => {
            const result = toNativeDate({ value: { year: 2024, month: 5, day: 7 } as ReadDate } as TransformFnParams);

            expect(result!.getFullYear()).toEqual(2024);
            expect(result!.getMonth()).toEqual(5);
            expect(result!.getDate()).toEqual(7);
        })
    })

    describe('titleCase', () => {
        it('returns titlecase sentense', () => {
            const result = titleCase({ value: 'эрих фром ' } as TransformFnParams);

            expect(result).toBe('Эрих Фром')
        })

        it('returns titlecase sentense array', () => {
            const result = titleCase({ value: ['эрих фром', 'карл маркс'] } as TransformFnParams);

            expect(result).toEqual(['Эрих Фром', 'Карл Маркс'])
        })

        it('returns null', () => {
            const result = titleCase({ value: null } as TransformFnParams);

            expect(result).toBeNull()
        })
    })
});