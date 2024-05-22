import { TuiDay } from '@taiga-ui/cdk';
import { TransformFnParams } from 'class-transformer';
import { ReadDate } from '../../domain/book';

export function defaultValue<T>($default: T | nil): any {
    return (param: TransformFnParams) => param.value ?? $default;
}

export function toReadDate(param: TransformFnParams): ReadDate | null {
    const value = param.value;

    if (!value) return null;

    const native = new Date(value);

    return TuiDay.fromLocalNativeDate(native);
}

export function toNativeDate(param: TransformFnParams): Date | null {
    const value = param.value as ReadDate;

    if (!value) return null;

    return new Date(value.year, value.month ?? 0, value.day ?? 1);
}

export function filterEmptyItems<T>(param: TransformFnParams): T[] {
    const value = param.value as T[];

    return value.filter(item => Boolean(item));
}

export function excludeNull<T>(param: TransformFnParams): T | undefined {
    const value = param.value as T;

    return value ?? undefined;
}

export function excludeEmptyString(param: TransformFnParams): string | undefined {
    const value = param.value as string;

    if (!value?.trim()) return undefined;

    return value;
}

export function wordTitleCase(param: TransformFnParams): string[] | string | nil {
    const value = param.value as string[] | string;

    if (!value) {
        return value;
    }

    if (Array.isArray(value)) {
        return value.filter(Boolean).map(everyWordTitleCase);
    } else {
        return everyWordTitleCase(value);
    }
}

export function titleCase(param: TransformFnParams): string[] | string | nil {
    const value = param.value as string[] | string;

    if (!value) {
        return value;
    }

    if (Array.isArray(value)) {
        return value.filter(Boolean).map(toTitleCase);
    } else {
        return toTitleCase(value);
    }
}

function everyWordTitleCase(string: string): string {
    return string.trim().split(' ')
        .map(word => toTitleCase(word))
        .join(' ');
}

function toTitleCase(string: string): string {
    return string[0].toUpperCase() + string.slice(1)
}