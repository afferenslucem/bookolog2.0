import { Transform } from 'class-transformer';
import { defaultValue, wordTitleCase } from '../../shared/utils/transformations';

export class StatisticItem {
    @Transform(defaultValue(''))
    public name: string = null!;

    public count: number = null!;
}
export class AuthorStatisticItem {
    @Transform(defaultValue(''))
    @Transform(wordTitleCase)
    public name: string = null!;

    public count: number = null!;
}