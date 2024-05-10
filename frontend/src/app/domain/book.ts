import { Transform } from 'class-transformer';
import {
    defaultValue,
    excludeNull,
    filterEmptyItems,
    titleCase,
    toNativeDate,
    toReadDate,
} from '../shared/utils/transformations';

export enum BookStatus {
    TO_READ,
    IN_PROGRESS,
    DONE
}

export enum BookType {
    AUDIO,
    PAPER,
    ELECTRONIC
}

export interface ReadDate {
    year: number;
    month?: number | nil;
    day?: number | nil;
}

export class Book {
    @Transform(excludeNull, { toPlainOnly: true })
    public id: number = null!;
    public name: string = null!;
    public note?: string | null;

    @Transform(titleCase, { toPlainOnly: true })
    public series?: string | null;
    public seriesNumber?: number | null;

    @Transform(defaultValue([]))
    @Transform(filterEmptyItems, { toPlainOnly: true })
    @Transform(titleCase, { toPlainOnly: true })
    public authors: string[] = null!;

    @Transform(defaultValue([]))
    @Transform(filterEmptyItems, { toPlainOnly: true })
    @Transform(titleCase, { toPlainOnly: true })
    public tags: string[] = [];

    @Transform(titleCase, { toPlainOnly: true })
    public genre?: string | null;

    public status: BookStatus = null!;

    public type: BookType = null!;

    @Transform(toReadDate, { toClassOnly: true })
    @Transform(toNativeDate, { toPlainOnly: true })
    public startDate?: ReadDate | null;

    @Transform(toReadDate, { toClassOnly: true })
    @Transform(toNativeDate, { toPlainOnly: true })
    public finishDate?: ReadDate | null;
}