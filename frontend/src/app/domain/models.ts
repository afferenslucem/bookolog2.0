/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AuthenticationModel {
  /** @minLength 1 */
  login: string;
  /** @minLength 1 */
  password: string;
}

export interface Book {
  /** @format int64 */
  id?: number;
  /** @minLength 1 */
  name: string;
  authors?: string[] | null;
  tags?: string[] | null;
  /** @minLength 1 */
  genre: string;
  series?: string | null;
  /** @format int32 */
  seriesNumber?: number | null;
  /** @format date-time */
  startDate?: string | null;
  /** @format date-time */
  finishDate?: string | null;
  /** @format date-time */
  modifyDate?: string;
  note?: string | null;
  type: BookType;
  status: BookStatus;
  /** @format int32 */
  userId?: number;
}

/** @format int32 */
export enum BookStatus {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
}

/** @format int32 */
export enum BookType {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
}

export interface RegistrationModel {
  /** @minLength 1 */
  login: string;
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  password: string;
}

export interface SearchBookOptions {
  tag?: string | null;
  author?: string | null;
  /** @format int32 */
  year?: number | null;
  pattern?: string | null;
  status?: BookStatus;
}
