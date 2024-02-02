export enum BookStatus {
    TO_READ,
    IN_PROGRESS,
    DONE
}

export interface ReadDate {
    year: number;
    month: number | nil;
    day: number | nil;
}

export class Book {
    public id: number = null!;
    public name: string = null!;
    public description: string | nil;
    public authors: string[] = [];
    public tags: string[] = [];
    public status: BookStatus = null!;
    public isDraft: boolean = null!;
    public startDate: ReadDate | nil;
    public finishDate: ReadDate | nil;
}