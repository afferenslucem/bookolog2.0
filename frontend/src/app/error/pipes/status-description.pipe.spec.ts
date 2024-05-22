import { StatusDescriptionPipe } from './status-description.pipe';

describe('StatusDescriptionPipe', () => {
    it('create an instance', () => {
        const pipe = new StatusDescriptionPipe();
        expect(pipe).toBeTruthy();
    });
});
