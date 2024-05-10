import { JoinPipe } from './join.pipe';

describe('JoinPipe', () => {
    it('create an instance', () => {
        const pipe = new JoinPipe();
        expect(pipe).toBeTruthy();
    });

    it('returns nil', () => {
        const pipe = new JoinPipe();
        expect(pipe.transform(null)).toBe(null);
    });

    it('returns joined', () => {
        const pipe = new JoinPipe();
        expect(pipe.transform(['one', 'two', 'three'])).toBe('one, two, three');
    });
});
