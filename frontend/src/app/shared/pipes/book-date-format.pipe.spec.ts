import { BookDateFormatPipe } from './book-date-format.pipe';

describe('BookDateFormatPipe', () => {
    it('create an instance', () => {
        const pipe = new BookDateFormatPipe();
        expect(pipe).toBeTruthy();
    });

    it('formats date', () => {
        const pipe = new BookDateFormatPipe();

        const result = pipe.transform({ year: 2024, month: 4, day: 12 })

        expect(result).toBe('2024.04.12');
    });

    it('formats date without day', () => {
        const pipe = new BookDateFormatPipe();

        const result = pipe.transform({ year: 2024, month: 4 })

        expect(result).toBe('2024.04.01');
    });

    it('formats date without month', () => {
        const pipe = new BookDateFormatPipe();

        const result = pipe.transform({ year: 2024 })

        expect(result).toBe('2024.01.01');
    });

    it('formats empty', () => {
        const pipe = new BookDateFormatPipe();

        const result = pipe.transform(null)

        expect(result).toBe('...');
    });
});
